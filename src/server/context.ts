import { getDbClient } from "@/db";
import { headers } from "next/headers";
import { AsyncLocalStorage } from "node:async_hooks";

// @ts-expect-error
export const getHeaders = () => Object.fromEntries(new Headers(headers()));

/// begin generic
export const getGenericContext = async () => {
  return {
    headers: getHeaders(),
  };
};

export type GenericContext = Awaited<ReturnType<typeof getGenericContext>>;
/// end

/// begin
export type Context = Awaited<ReturnType<typeof createContext>>;
export const createContext = async () => {
  return {
    db: getDbClient(),
    ...(await getGenericContext()),
  };
};
export const contextALS = new AsyncLocalStorage<Context>();
/// end
