import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/db/schema/index.ts",
  out: "src/db/migrations",
  dialect: "sqlite",
  casing: "snake_case",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
