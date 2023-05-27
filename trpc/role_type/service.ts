import { z } from "zod";
import prisma from "../libs/prisma";

const db = prisma.roleType;

export const roleTypeSchema = z.object({
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
});

export const getAll = async ({
  includeRetired = false,
}: {
  includeRetired?: boolean;
} = {}) => {
  const roleTypes = await db.findMany({
    where: {
      retired_at: includeRetired ? undefined : null,
    },
  });
  return z.array(roleTypeSchema).parse(roleTypes);
};

export const getById = async (id: number) => {
  const roleType = await db.findUnique({
    where: {
      id,
    },
  });
  return roleTypeSchema.parse(roleType);
};

export const createSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  formed_at: z.date().optional(),
  retired_at: z.date().optional(),
});

export const create = async (role_type: z.infer<typeof createSchema>) => {
  const createdRoleType = await db.create({ data: role_type });
  return roleTypeSchema.parse(createdRoleType);
};

export const updateSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  retired_at: z.date().optional(),
});

export const update = async (
  id: number,
  role_type: z.infer<typeof updateSchema>
) => {
  const updatedRoleType = await db.update({
    where: {
      id,
    },
    data: role_type,
  });
  return roleTypeSchema.parse(updatedRoleType);
};

export const deleteById = async (id: number) => {
  const deletedRoleType = await db.delete({
    where: {
      id,
    },
  });
  return roleTypeSchema.parse(deletedRoleType);
};
