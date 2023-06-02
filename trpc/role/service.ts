import { z } from "zod";
import prisma from "../libs/prisma";

const db = prisma.role;

export const RoleSchema = z.object({
  id: z.number(),
  role_type_id: z.number().optional(),
  open_from: z.date(),
  closed_at: z
    .date()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
});

export const getAll = async ({
  includeClosed = false,
}: {
  includeClosed?: boolean;
} = {}) => {
  const roles = await db.findMany({
    where: {
      closed_at: includeClosed ? undefined : null,
    },
  });
  return z.array(RoleSchema).parse(roles);
};

export const getById = async (id: number) => {
  const role = await db.findUnique({
    where: {
      id,
    },
  });
  return RoleSchema.parse(role);
};

export const createSchema = z.object({
  role_type_id: z.number(),
  title_id: z.number(),
  open_from: z.date().optional(),
});

export const create = async (role: z.infer<typeof createSchema>) => {
  const createdRole = await db.create({
    data: {
      open_from: new Date(),
      ...role,
    },
  });
  return RoleSchema.parse(createdRole);
};

export const updateSchema = z.object({
  closed_at: z.date().optional(),
});

export const update = async (
  id: number,
  role: z.infer<typeof updateSchema>
) => {
  const updatedRole = await db.update({
    where: {
      id,
    },
    data: role,
  });
  return RoleSchema.parse(updatedRole);
};

export const deleteById = async (id: number) => {
  const deletedRole = await db.delete({
    where: {
      id,
    },
  });
  return RoleSchema.parse(deletedRole);
};
