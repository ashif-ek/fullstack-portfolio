const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://neondb_owner:npg_k4pJBtbXK1nl@ep-bitter-cell-a1rr32mu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function run() {
  await client.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS core_collaborationrequest (
        id SERIAL PRIMARY KEY,
        "fullName" VARCHAR(100) NOT NULL,
        email VARCHAR(254) NOT NULL,
        company VARCHAR(100),
        role VARCHAR(100),
        "projectType" VARCHAR(50) NOT NULL,
        budget VARCHAR(50),
        timeline VARCHAR(50),
        message TEXT NOT NULL,
        status VARCHAR(20) DEFAULT 'PENDING' NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await client.end();
  }
}

run();
