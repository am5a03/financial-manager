import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const incomeRecordsTable = sqliteTable("income_records", {
  id: int().primaryKey({ autoIncrement: true }),
  timestamp: int("timestamp", { mode: "timestamp" }).notNull(),
  currency: text().notNull(),
  source: text().notNull(),
});

export const currenciesTable = sqliteTable("currencies", {
  currency: text().notNull().unique(),
});

export const exchangeRatesTable = sqliteTable("exchange_rates", {
  baseCurrency: text().notNull(),
  quoteCurrency: text().notNull(),
  rate: real().notNull(),
  timestamp: int("timestamp", { mode: "timestamp" }).notNull(),
});
