import { publicProcedure, router } from "./../trpc";
import { z } from "zod";
import * as service from "./service";

export default router({
  list: publicProcedure.query(async () => {
    return service.getAll();
  }),
  get: publicProcedure.input(z.string()).query(async (opts) => {
    return service.getById(parseInt(opts.input));
  }),
  create: publicProcedure.input(service.createSchema).mutation(async (opts) => {
    return service.create(opts.input);
  }),
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        person: service.updateSchema,
      })
    )
    .mutation(async (opts) => {
      return service.update(opts.input.id, opts.input.person);
    }),
  delete: publicProcedure.input(z.number()).mutation(async (opts) => {
    return service.deleteById(opts.input);
  }),
});
