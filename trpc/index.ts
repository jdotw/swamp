import dotenv from "dotenv";
import personsRouter from "./persons/transport.trpc";
import teamsRouter from "./team/transport.trpc";
import tracksRouter from "./track/transport.trpc";
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
