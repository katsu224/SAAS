
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();
  try {
    const email = 'tenant@example.com';
    const password = 'tenant';
    const name = 'Test Tenant';

    // Check if tenant exists
    const res = await client.query('SELECT id FROM tenants WHERE email = $1', [email]);
    if (res.rows.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.query(
            'INSERT INTO tenants (email, password_hash, name, status) VALUES ($1, $2, $3, $4)', 
            [email, hashedPassword, name, 'active']
        );
        console.log(`✅ Tenant created: ${email} / ${password}`);
    } else {
        console.log('ℹ️ Tenant already exists.');
    }
  } catch (e) {
    console.error('Error seeding tenant:', e);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
