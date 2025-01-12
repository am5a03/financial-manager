import { int, real, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";

export const txRecords = sqliteTable(
  "tx_records",
  {
    id: int().primaryKey({ autoIncrement: true }),
    timestamp: int("timestamp", { mode: "timestamp" }).notNull(),
    currency: text().notNull(),
    source: text().notNull(),
    amount: real().notNull(),
    type: text({ enum: ["spending", "income"] }).notNull(),
    category: text(),
  },
  (t) => [unique().on(t.timestamp, t.currency, t.source, t.type, t.category)],
);

export const currencies = sqliteTable("currencies", {
  currency: text().notNull().unique(),
});

export const fxRates = sqliteTable(
  "fx_rates",
  {
    baseCurrency: text().notNull(),
    quoteCurrency: text().notNull(),
    rate: real().notNull(),
    timestamp: int("timestamp", { mode: "timestamp" }).notNull(),
  },
  (t) => [unique().on(t.baseCurrency, t.quoteCurrency, t.timestamp)],
);
