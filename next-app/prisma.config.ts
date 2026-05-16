import "dotenv/config";
import { defineConfig } from "prisma/config";

const fallbackDatabaseUrl = "postgresql://postgres:postgres@localhost:5432/postgres";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Allow `prisma generate` during CI/build environments where DATABASE_URL is not set yet.
    url: process.env.DATABASE_URL ?? fallbackDatabaseUrl,
  },
});
