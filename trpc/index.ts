import dotenv from "dotenv";
import personsRouter from "./person/transport.trpc";
import teamsRouter from "./team/transport.trpc";
import tracksRouter from "./track/transport.trpc";
import capabilityTypesRouter from "./capability_type/transport.trpc";
import deploymentTypesRouter from "./deployment_type/transport.trpc";
import roleTypesRouter from "./role_type/transport.trpc";
import titlesRouter from "./title/transport.trpc";
import levelsRouter from "./level/transport.trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { t, createContext } from "./trpc";

dotenv.config();
const port = process.env.PORT ?? "3000";

const appRouter = t.router({
  persons: personsRouter,
  teams: teamsRouter,
  tracks: tracksRouter,
  levels: levelsRouter,
  titles: titlesRouter,
  roleTypes: roleTypesRouter,
  capabilityTypes: capabilityTypesRouter,
  deploymentTypes: deploymentTypesRouter,
});

const app = express();

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port);

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
