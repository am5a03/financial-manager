import {
  SubmitTransaction,
  submitTransaction,
} from "@/actions/submitTransaction";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";
import { fetchFxRates, FetchFxRates } from "@/actions/fetchFxRates";

export const appRouter = router({
  submitTransaction: publicProcedure
    .input(SubmitTransaction)
    .mutation(submitTransaction),
  fetchFxRates: publicProcedure.input(FetchFxRates).mutation(fetchFxRates),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
