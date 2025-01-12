import { txRecords } from "@/db/schema";
import type { TxRecord } from "@/db/types";
import type { Action } from "@/server/types";
import { TransactionType } from "@/types";
import { and, gt, inArray, lt } from "drizzle-orm";
import { z } from "zod";

export type GetTransactions = typeof GetTransactions;
export const GetTransactions = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  types: z.nativeEnum(TransactionType).array(),
  sources: z.string().array(),
  categories: z.string().array(),
});

export const getTransactions = async ({
  ctx: { db },
  input: { startDate, endDate, types, sources, categories },
}: Action<GetTransactions>): Promise<TxRecord[]> => {
  return await db
    .select()
    .from(txRecords)
    .where(
      and(
        startDate ? gt(txRecords.timestamp, startDate) : undefined,
        endDate ? lt(txRecords.timestamp, endDate) : undefined,
        types ? inArray(txRecords.type, types) : undefined,
        sources ? inArray(txRecords.source, sources) : undefined,
        categories ? inArray(txRecords.category, categories) : undefined,
      ),
    );
};
