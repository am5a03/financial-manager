import { z } from "zod";
import type { Action } from "@/server/types";
import { txRecords } from "@/db/schema";

export const getTxSources = async ({
  ctx: { db },
}: Action): Promise<string[]> => {
  const result = await db
    .selectDistinct({ source: txRecords.source })
    .from(txRecords);
  const sources = result.map((item) => item.source);
  return sources;
};
