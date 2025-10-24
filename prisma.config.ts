import { defineConfig } from "prisma/config"

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: "postgresql://neondb_owner:npg_smVBf06nxhSv@ep-fancy-darkness-ah5mugtj-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  },
});
