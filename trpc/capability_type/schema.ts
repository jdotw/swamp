import { roleTypeSchema } from "@/role_type/schema";
import { z } from "zod";

export const capabilityTypeSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  parent_id: z
    .number()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
  active_from: z.date(),
  retired_at: z
    .date()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
  role_type_id: z
    .number()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
  role_type: roleTypeSchema
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
});
