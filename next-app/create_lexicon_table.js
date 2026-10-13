const { Client } = require('pg');
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL not found");
  process.exit(1);
}

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

async function run() {
  await client.connect();
  try {
    console.log("Creating table core_lexiconword if not exists...");
    await client.query(`
      CREATE TABLE IF NOT EXISTS core_lexiconword (
        id SERIAL PRIMARY KEY,
        word VARCHAR(100) NOT NULL,
        slug VARCHAR(120) UNIQUE NOT NULL,
        "shortMeaning" TEXT,
        "personalNote" TEXT,
        category VARCHAR(100) NOT NULL,
        categories TEXT[] DEFAULT '{}'::TEXT[],
        importance INTEGER DEFAULT 1 NOT NULL,
        "fontSize" VARCHAR(20) DEFAULT 'md' NOT NULL,
        position VARCHAR(50),
        "animationStyle" VARCHAR(50) DEFAULT 'drift-slow' NOT NULL,
        "isPublished" BOOLEAN DEFAULT true NOT NULL,
        "sortOrder" INTEGER DEFAULT 0 NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    await client.query(`CREATE INDEX IF NOT EXISTS core_lexiconword_ispublished_idx ON core_lexiconword ("isPublished");`);
    await client.query(`CREATE INDEX IF NOT EXISTS core_lexiconword_category_idx ON core_lexiconword (category);`);
    await client.query(`CREATE INDEX IF NOT EXISTS core_lexiconword_sortorder_idx ON core_lexiconword ("sortOrder");`);

    console.log("Table core_lexiconword and indexes verified/created successfully.");
  } catch (err) {
    console.error("Error creating table core_lexiconword:", err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
