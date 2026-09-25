const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.findMany();
  for (const p of projects) {
    console.log(`\n--- PROJECT: ${p.title} (${p.slug}) ---`);
    console.log(`Content length: ${p.content ? p.content.length : 0} characters`);
    console.log(`Github: ${p.github}`);
    console.log(`Tags: ${p.tags}`);
    if (p.content && p.content.length < 200) {
        console.log(`Content preview: ${p.content}`);
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
