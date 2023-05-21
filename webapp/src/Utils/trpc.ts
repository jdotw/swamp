import {
  createTRPCReact,
  inferReactQueryProcedureOptions,
} from "@trpc/react-query";
import type { AppRouter } from "../../../trpc";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export const trpc = createTRPCReact<AppRouter>();
