import {
  SubmitTransaction,
  submitTransaction,
} from "@/actions/submitTransaction";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import { fetchFxRates, FetchFxRates } from "@/actions/fetchFxRates";
import {
  submitTransactionBatch,
  SubmitTransactionBatch,
} from "@/actions/submitTransactionBatch";
import { getTransactions, GetTransactions } from "@/actions/getTransactions";
import {
  submitTransactionCustomBatch,
  SubmitTransactionCustomBatch,
} from "@/actions/submitTransactionCustomBatch";

export const appRouter = router({
  submitTransaction: publicProcedure
    .input(SubmitTransaction)
    .mutation(submitTransaction),
  fetchFxRates: publicProcedure.input(FetchFxRates).mutation(fetchFxRates),
  submitTransactionBatch: publicProcedure
    .input(SubmitTransactionBatch)
    .mutation(submitTransactionBatch),
  submitTransactionCustomBatch: publicProcedure
    .input(SubmitTransactionCustomBatch)
    .mutation(submitTransactionCustomBatch),
  getTransactions: publicProcedure
    .input(GetTransactions)
    .query(getTransactions),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
