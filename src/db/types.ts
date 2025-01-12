import type { txRecords } from "./schema";

export type TxRecord = typeof txRecords.$inferInsert;

export type TxRecordExchangeRateAdjusted = TxRecord & {
  quoteCurrencyValue: number;
};
