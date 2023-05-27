import { z } from "zod";
import prisma from "../libs/prisma";

const db = prisma.level;

export const titleSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

export const levelSchema = z.object({
  id: z.number(),
  index: z.number(),
  name: z.string().min(1),
  external_id: z.string().min(1),
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
  titles: z.array(titleSchema).optional(),
});

export const getAll = async ({
  includeRetired = false,
}: {
  includeRetired?: boolean;
} = {}) => {
  const levels = await db.findMany({
    where: {
      retired_at: includeRetired ? undefined : null,
    },
    include: {
      titles: true,
    },
  });
  return z.array(levelSchema).parse(levels);
};

export const getById = async (id: number) => {
  const level = await db.findUnique({
    where: {
      id,
    },
  });
  return levelSchema.parse(level);
};

export const createSchema = z.object({
  index: z.number(),
  name: z.string().min(1),
  external_id: z.string().min(1),
  parent_id: z.number().optional(),
  formed_at: z.date().optional(),
  retired_at: z.date().optional(),
});

export const create = async (level: z.infer<typeof createSchema>) => {
  const createdLevel = await db.create({ data: level });
  return levelSchema.parse(createdLevel);
};

export const updateSchema = z.object({
  index: z.number(),
  name: z.string().min(1),
  parent_id: z.number().optional(),
  retired_at: z.date().optional(),
});

export const update = async (
  id: number,
  level: z.infer<typeof updateSchema>
) => {
  const updatedLevel = await db.update({
    where: {
      id,
    },
    data: level,
  });
  return levelSchema.parse(updatedLevel);
};

export const deleteById = async (id: number) => {
  const deletedLevel = await db.delete({
    where: {
      id,
    },
  });
  return levelSchema.parse(deletedLevel);
};
