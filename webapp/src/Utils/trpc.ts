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

export type Person = RouterOutputs["persons"]["list"][number];
export type PersonCreateInput = RouterInputs["persons"]["create"];
export type PersonUpdateInput = RouterInputs["persons"]["update"]["person"];

export type Team = RouterOutputs["teams"]["list"][number];
export type TeamCreateInput = RouterInputs["teams"]["create"];
export type TeamUpdateInput = RouterInputs["teams"]["update"]["team"];

export type Track = RouterOutputs["tracks"]["list"][number];
export type TrackCreateInput = RouterInputs["tracks"]["create"];
export type TrackUpdateInput = RouterInputs["tracks"]["update"]["track"];

export type CapabilityType = RouterOutputs["capabilityTypes"]["list"][number];
export type CapabilityTypeCreateInput =
  RouterInputs["capabilityTypes"]["create"];
export type CapabilityTypeUpdateInput =
  RouterInputs["capabilityTypes"]["update"]["capabilityType"];

export type Title = RouterOutputs["titles"]["list"][number];
export type TitleCreateInput = RouterInputs["titles"]["create"];
export type TitleUpdateInput = RouterInputs["titles"]["update"]["title"];

export type Level = RouterOutputs["levels"]["list"][number];
export type LevelCreateInput = RouterInputs["levels"]["create"];
export type LevelUpdateInput = RouterInputs["levels"]["update"]["level"];

export type RoleType = RouterOutputs["roleTypes"]["list"][number];
export type RoleTypeCreateInput = RouterInputs["roleTypes"]["create"];
export type RoleTypeUpdateInput =
  RouterInputs["roleTypes"]["update"]["roleType"];
