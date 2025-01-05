import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

export const getDbClient = () => {
  return drizzle(process.env.DB_FILE_NAME!, {
    schema,
    casing: "snake_case",
  });
};
