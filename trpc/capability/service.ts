import { z } from "zod";
import prisma from "../libs/prisma";

const db = prisma.capability;

export const capabilitySchema = z.object({
  id: z.number(),
  role_id: z.number(),
  capability_type_id: z.number(),
  active_from: z.date(),
  retired_at: z
    .date()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
});

export const getAll = async ({
  includeRetired = false,
}: {
  includeRetired?: boolean;
} = {}) => {
  const capabilitys = await db.findMany({
    where: {
      retired_at: includeRetired ? undefined : null,
    },
  });
  return z.array(capabilitySchema).parse(capabilitys);
};

export const getById = async (id: number) => {
  const capability = await db.findUnique({
    where: {
      id,
    },
  });
  return capabilitySchema.parse(capability);
};

export const createSchema = z.object({
  role_id: z.number(),
  capability_type_id: z.number(),
  active_from: z.date().optional(),
  retired_at: z.date().optional(),
});

export const create = async (capability: z.infer<typeof createSchema>) => {
  const createdCapability = await db.create({ data: capability });
  return capabilitySchema.parse(createdCapability);
};

export const updateSchema = z.object({
  retired_at: z.date().optional(),
});

export const update = async (
  id: number,
  capability: z.infer<typeof updateSchema>
) => {
  const updatedCapability = await db.update({
    where: {
      id,
    },
    data: capability,
  });
  return capabilitySchema.parse(updatedCapability);
};

export const deleteById = async (id: number) => {
  const deletedCapability = await db.delete({
    where: {
      id,
    },
  });
  return capabilitySchema.parse(deletedCapability);
};
