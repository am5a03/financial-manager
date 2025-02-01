import { fxRates, txRecords } from "@/db/schema";
import type { TxRecord, TxRecordExchangeRateAdjusted } from "@/db/types";
import type { Action } from "@/server/types";
import { TransactionType } from "@/types";
import { and, gt, inArray, lt, sql, eq } from "drizzle-orm";
import { z } from "zod";

export type GetTransactions = typeof GetTransactions;
export const GetTransactions = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  types: z.nativeEnum(TransactionType).array().optional(),
  sources: z.string().array().optional(),
  categories: z.string().array().optional(),
});

export const getTransactions = async ({
  ctx: { db },
  input: { startDate, endDate, types, sources, categories },
}: Action<GetTransactions>): Promise<{
  txs: TxRecordExchangeRateAdjusted[];
}> => {
  const transactionsQuery = db
    .select({
      id: txRecords.id,
      currency: txRecords.currency,
      timestamp: txRecords.timestamp,
      source: txRecords.source,
      amount: txRecords.amount,
      amountInQuoteCurrency: sql`${txRecords.amount} * ${fxRates.rate}`.as(
        "amount_in_quote_currency",
      ),
      type: txRecords.type,
      category: txRecords.category,
      cost: txRecords.cost,
      costInQuoteCurrency: sql`${txRecords.cost} * ${fxRates.rate}`.as(
        "cost_in_quote_currency",
      ),
    })
    .from(txRecords)
    .innerJoin(
      fxRates,
      and(
        eq(txRecords.currency, fxRates.baseCurrency),
        eq(fxRates.quoteCurrency, "CAD"),
        eq(
          fxRates.timestamp,
          sql`strftime('%s', datetime(${txRecords.timestamp}, 'unixepoch', 'start of month'))`,
        ),
      ),
    )
    .$dynamic();
  if (sources && sources.length > 0 && sources[0] !== "") {
    transactionsQuery.where(inArray(txRecords.source, sources));
  }

  const transactions = await transactionsQuery;

  const mappedTx = transactions.map((tx) => ({
    id: tx.id,
    currency: tx.currency,
    timestamp: tx.timestamp,
    source: tx.source,
    amount: tx.amount,
    amountInQuoteCurrency: (tx.amountInQuoteCurrency as number).toFixed(
      2,
    ) as unknown as number,
    type: tx.type,
    category: tx.category,
    cost: tx.cost,
    costInQuoteCurrency: (tx.costInQuoteCurrency as number).toFixed(
      2,
    ) as unknown as number,
  }));

  return {
    txs: mappedTx,
  };
};
