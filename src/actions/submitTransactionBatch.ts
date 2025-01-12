import type { Action } from "@/server/types";
import { z } from "zod";
import { parse } from "csv-parse/sync";
import { txRecords } from "@/db/schema";
import type { TxRecord } from "@/db/types";

export type SubmitTransactionBatch = typeof SubmitTransactionBatch;
export const SubmitTransactionBatch = z.object({
  csv: z.string(),
});

export const submitTransactionBatch = async ({
  ctx: { db },
  input: { csv },
}: Action<SubmitTransactionBatch>): Promise<void> => {
  console.log(csv);
  const base64Data = csv.split(",")[1]; // Remove "data:<mime-type>;base64,"
  const buffer = Buffer.from(base64Data, "base64");
  // Convert buffer to string
  const fileContent = buffer.toString("utf-8");

  const records = parse(fileContent.trim(), {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.header) {
        return value;
      }
      switch (context.index) {
        case 1:
          return new Date(value);
        case 3:
          return Number.parseFloat(value);
        default:
          return value;
      }
    },
  }) as TxRecord[];

  console.log(records);

  await Promise.all(
    records.map((r) =>
      db
        .insert(txRecords)
        .values(r)
        .onConflictDoUpdate({
          target: [
            txRecords.timestamp,
            txRecords.currency,
            txRecords.source,
            txRecords.type,
            txRecords.category,
          ],
          set: { amount: r.amount },
        }),
    ),
  );
};
