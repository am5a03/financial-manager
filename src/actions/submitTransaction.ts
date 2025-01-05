import { txRecords } from "@/db/schema";
import type { Action } from "@/server/types";
import { TransactionType } from "@/types";
import { z } from "zod";

export type SubmitTransaction = typeof SubmitTransaction;
export const SubmitTransaction = z.object({
  date: z.date(),
  currency: z.string(),
  amount: z.number(),
  type: z.nativeEnum(TransactionType),
});

export const submitTransaction = async ({
  ctx: { db },
  input: { date, currency, amount, type },
}: Action<SubmitTransaction>): Promise<void> => {
  console.log(date, currency, amount, type);
  db.insert(txRecords).values({
    timestamp: date,
    source: "test",
    currency,
    amount,
    type: "spending",
    category: "",
  });
};
