const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_k4pJBtbXK1nl@ep-bitter-cell-a1rr32mu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function run() {
  await client.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS core_resumedownload (
        id SERIAL PRIMARY KEY,
        "ipAddress" VARCHAR(50),
        "userAgent" VARCHAR(500),
        referer VARCHAR(500),
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    console.log('Table core_resumedownload created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await client.end();
  }
}

run();
