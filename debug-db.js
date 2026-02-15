const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();
  try {
    const allWebsites = await client.query('SELECT * FROM websites');
    console.log('\n--- ALL Websites ---');
    console.table(allWebsites.rows);

    const allPages = await client.query('SELECT * FROM pages');
    console.log('\n--- ALL Pages ---');
    console.table(allPages.rows);

    const allBlocks = await client.query('SELECT * FROM blocks');
    console.log('\n--- ALL Blocks ---');
    console.table(allBlocks.rows);

  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}

main();
