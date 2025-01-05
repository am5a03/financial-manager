import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson";

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL!;
};

/// shared begin
let clientQueryClientSingleton: QueryClient | undefined = undefined;
export const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  } else {
    // Browser: use singleton pattern to keep the same query client
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

export const transformer = superjson;

export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        // Since queries are prefetched on the server, we set a stale time so that
        // queries aren't immediately refetched on the client
        staleTime: 1000 * 30,
      },
      dehydrate: {
        // include pending queries in dehydration
        // this allows us to prefetch in RSC and
        // send promises over the RSC boundary
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
        serializeData: transformer.serialize,
      },
      hydrate: {
        deserializeData: transformer.deserialize,
      },
    },
  });

/// shared end
