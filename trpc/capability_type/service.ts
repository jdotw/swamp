import { z } from "zod";
import prisma from "../libs/prisma";
import { capabilityTypeSchema } from "./schema";

const db = prisma.capabilityType;

export const getAll = async ({
  includeRetired = false,
}: {
  includeRetired?: boolean;
} = {}) => {
  const capabilityTypes = await db.findMany({
    where: {
      retired_at: includeRetired ? undefined : null,
    },
    include: {
      role_type: true,
    },
  });
  return z.array(capabilityTypeSchema).parse(capabilityTypes);
};

export const getById = async (id: number) => {
  const capabilityType = await db.findUnique({
    where: {
      id,
    },
    include: {
      role_type: true,
    },
  });
  return capabilityTypeSchema.parse(capabilityType);
};

export const createSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  role_type_id: z.number().optional(),
  formed_at: z.date().optional(),
  retired_at: z.date().optional(),
});

export const create = async (capabilityType: z.infer<typeof createSchema>) => {
  const createdCapabilityType = await db.create({
    data: capabilityType,
    include: {
      role_type: true,
    },
  });
  return capabilityTypeSchema.parse(createdCapabilityType);
};

export const updateSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  retired_at: z.date().optional(),
});

export const update = async (
  id: number,
  capabilityType: z.infer<typeof updateSchema>
) => {
  const updatedCapabilityType = await db.update({
    where: {
      id,
    },
    data: capabilityType,
    include: {
      role_type: true,
    },
  });
  return capabilityTypeSchema.parse(updatedCapabilityType);
};

export const deleteById = async (id: number) => {
  const deletedCapabilityType = await db.delete({
    where: {
      id,
    },
  });
  return capabilityTypeSchema.parse(deletedCapabilityType);
};
