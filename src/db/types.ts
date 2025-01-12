import type { txRecords } from "./schema";

export type TxRecord = typeof txRecords.$inferInsert;
