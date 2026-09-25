const { Client } = require('pg');

async function main() {
  const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_k4pJBtbXK1nl@ep-bitter-cell-a1rr32mu-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require'
  });

  await client.connect();

  const res = await client.query('SELECT id, title, slug, length(content) as content_length, github FROM core_project');
  
  console.log(JSON.stringify(res.rows, null, 2));

  await client.end();
}

main().catch(console.error);
