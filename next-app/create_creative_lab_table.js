const { Client } = require('pg');
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_k4pJBtbXK1nl@ep-bitter-cell-a1rr32mu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new Client({
  connectionString
});

async function run() {
  await client.connect();
  try {
    // Create ENUM types if they don't exist
    await client.query(`
      DO $$ BEGIN
          CREATE TYPE "CreativeLabMediaType" AS ENUM ('VIDEO', 'IMAGE', 'GIF', 'INTERACTIVE');
      EXCEPTION
          WHEN duplicate_object THEN null;
      END $$;
    `);
    await client.query(`
      DO $$ BEGIN
          CREATE TYPE "CreativeLabCategory" AS ENUM ('AI_VIDEO', 'AI_VISUAL', 'CREATIVE_CODE', 'ANIMATION', 'EXPERIMENT', 'OTHER');
      EXCEPTION
          WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create table
    await client.query(`
      CREATE TABLE IF NOT EXISTS core_creativelabitem (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL,
        "mediaType" "CreativeLabMediaType" NOT NULL,
        "mediaUrl" VARCHAR(500) NOT NULL,
        "thumbnailUrl" VARCHAR(500),
        "cloudinaryPublicId" VARCHAR(255),
        "cloudinaryResourceType" VARCHAR(50),
        category "CreativeLabCategory" NOT NULL,
        tools TEXT[],
        duration VARCHAR(50),
        featured BOOLEAN DEFAULT false NOT NULL,
        published BOOLEAN DEFAULT false NOT NULL,
        "sortOrder" INTEGER DEFAULT 0 NOT NULL,
        "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `);
    
    // Create indexes as requested by the user
    await client.query(`CREATE INDEX IF NOT EXISTS core_creativelabitem_published_idx ON core_creativelabitem (published);`);
    await client.query(`CREATE INDEX IF NOT EXISTS core_creativelabitem_featured_idx ON core_creativelabitem (featured);`);
    await client.query(`CREATE INDEX IF NOT EXISTS core_creativelabitem_category_idx ON core_creativelabitem (category);`);
    await client.query(`CREATE INDEX IF NOT EXISTS core_creativelabitem_sortorder_idx ON core_creativelabitem ("sortOrder");`);

    console.log('Table core_creativelabitem and enums created successfully');
  } catch (err) {
    console.error('Error creating table:', err);
  } finally {
    await client.end();
  }
}

run();
