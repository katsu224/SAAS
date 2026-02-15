const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();
  try {
    const blocks = await client.query("SELECT id, name, admin_schema FROM blocks WHERE name ILIKE '%cuarto%' OR name ILIKE '%room%'");
    console.table(blocks.rows.map(b => ({
        id: b.id,
        name: b.name,
        schema_summary: JSON.stringify(b.admin_schema).substring(0, 100) + '...'
    })));
    
    if (blocks.rows.length > 0) {
        const blockId = blocks.rows[0].id;
        console.log(`Updating schema for block ${blockId} to use Repeater...`);
        
        const newSchema = [
            {
                key: `field_${Date.now()}`,
                label: "Lista de Cuartos",
                type: "repeater",
                subSchema: [
                    { key: "room_name", label: "Nombre del Cuarto", type: "text" },
                    { key: "room_image", label: "Foto del Cuarto", type: "image" },
                    { key: "room_desc", label: "Descripción", type: "textarea" }
                ]
            }
        ];

        await client.query("UPDATE blocks SET admin_schema = $1 WHERE id = $2", [JSON.stringify(newSchema), blockId]);
        console.log("Schema updated successfully!");
    } else {
        console.log("No blocks found matching 'cuarto' or 'room'");
    }

  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}

main();
