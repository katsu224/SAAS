
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' }); // Try .env.local first
dotenv.config(); // Then .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();
  try {
    console.log('Connected to database');
    await client.query('BEGIN');

    // Enable UUID extension
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    console.log('Extension "uuid-ossp" enabled');

    // 1. ADMINS Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "admins" checked/created');
    
    // 2. TENANTS Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS tenants (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(100) NOT NULL,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "tenants" checked/created');

    // 3. WEBSITES Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS websites (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        base_url VARCHAR(255),
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "websites" checked/created');

    // 4. PAGES Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS pages (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        website_id UUID NOT NULL REFERENCES websites(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        is_published BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (website_id, slug)
      );
    `);
    console.log('Table "pages" checked/created');

    // 5. BLOCKS Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blocks (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
        admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
        name VARCHAR(255) NOT NULL,
        order_index INTEGER NOT NULL,
        admin_schema JSONB NOT NULL DEFAULT '[]',
        tenant_content JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Table "blocks" checked/created');

    // Seed Admin
    const email = 'admin@admin.com';
    const password = 'admin'; // Simple password for dev
    
    // Check if admin exists
    const res = await client.query('SELECT id FROM admins WHERE email = $1', [email]);
    if (res.rows.length === 0) {
        const hashedPassword = await bcrypt.hash(password, 10);
        await client.query('INSERT INTO admins (email, password_hash, name) VALUES ($1, $2, $3)', [email, hashedPassword, 'Super Admin']);
        console.log(`✅ Admin created successfully for ${email}`);
        console.log(`🔑 Password: ${password}`);
    } else {
        console.log('ℹ️ Admin already exists, skipping creation.');
    }

    await client.query('COMMIT');
    console.log('✅ Database setup and seeding completed!');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('❌ Error during database setup:', e);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

main();
