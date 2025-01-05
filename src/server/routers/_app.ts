import { submitTransaction } from "@/actions/submitTransaction";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";

export const appRouter = router({
  submitTransaction: publicProcedure.mutation(submitTransaction),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
