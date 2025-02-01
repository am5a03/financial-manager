import type { Action } from "@/server/types";
import { z } from "zod";
import { parse } from "csv-parse/sync";
import { txRecords } from "@/db/schema";
import type { TxRecord } from "@/db/types";
import { parse as parseDate } from "date-fns";

export type SubmitTransactionCustomBatch = typeof SubmitTransactionCustomBatch;
export const SubmitTransactionCustomBatch = z.object({
  csv: z.string(),
});

export const submitTransactionCustomBatch = async ({
  ctx: { db },
  input: { csv },
}: Action<SubmitTransactionCustomBatch>): Promise<void> => {
  console.log(csv);

  const records = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    cast: (value, context) => {
      if (context.header) {
        return value;
      }
      switch (context.index) {
        case 1: {
          // Date column
          // const result = parseDate(value, "d/M/yyyy", new Date());
          return parseDate(value, "d/M/yyyy", new Date());
        }
        case 3: // amount
        case 6: // cost
          return value === "" ? 0 : Number.parseFloat(value);
        default:
          return value;
      }
    },
  }) as TxRecord[];

  // console.log(records);
  //
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
            txRecords.cost,
          ],
          set: { amount: r.amount },
        }),
    ),
  );
};
