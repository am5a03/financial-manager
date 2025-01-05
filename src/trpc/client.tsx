"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import type { AppRouter } from "@/server/routers/_app";
import {
  createTRPCClient,
  createTRPCReact,
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  loggerLink,
  splitLink,
  TRPCLink,
} from "@trpc/react-query";
import { useState } from "react";
import { getBaseUrl, getQueryClient, transformer } from "./shared";
import { AnyTRPCRouter } from "@trpc/server";

const createClientLinks = (link: TRPCLink<AnyTRPCRouter>) => [
  loggerLink({
    enabled: (op) => op.direction === "down" && op.result instanceof Error,
  }),
  splitLink({
    condition: (op) => isNonJsonSerializable(op.input),
    true: httpLink({
      transformer: {
        serialize: (object) => object,
        deserialize: transformer.deserialize,
      },
      url: getBaseUrl(),
      // headers: getSessionHeader,
    }),
    false: link,
  }),
];

export const createLinks = ({
  batching = false,
}: { batching?: boolean } = {}) =>
  createClientLinks(
    (batching ? httpBatchLink : httpLink)({
      transformer: transformer,
      url: `${getBaseUrl()}/api/trpc`,
      // headers: getSessionHeader,
    }),
  );

const links = createLinks();
export const trpc = createTRPCReact<AppRouter>();

export const api = createTRPCClient<AppRouter>({ links });

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() => trpc.createClient({ links }));

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {props.children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
