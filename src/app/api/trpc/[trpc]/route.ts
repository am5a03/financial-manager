import { appRouter } from "@/server/routers/_app";
import { createContext } from "@/server/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

export const trpcHandler = async (req: Request) => {
  return await fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });
};

export { trpcHandler as GET, trpcHandler as POST };
