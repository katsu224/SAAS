const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function main() {
  const client = await pool.connect();
  try {
    // 1. Get a valid page
    const res = await client.query(`
        SELECT p.slug, p.website_id, w.name as site_name
        FROM pages p
        JOIN websites w ON p.website_id = w.id
        LIMIT 1
    `);

    if (res.rows.length === 0) {
        console.log("No pages found to test.");
        return;
    }

    const { slug, website_id, site_name } = res.rows[0];
    console.log(`Testing API for Site: ${site_name} (${website_id}), Page: ${slug}`);

    // 2. Fetch from API
    const url = `http://localhost:3000/api/v1/delivery/websites/${website_id}/pages/${slug}`;
    console.log(`Fetching: ${url}`);
    
    const apiRes = await fetch(url);
    const data = await apiRes.json();

    console.log("\nAPI Response Status:", apiRes.status);
    console.log("API Response Body:");
    console.dir(data, { depth: null, colors: true });

  } catch (err) {
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}

main();
