import { z } from "zod";
import prisma from "../libs/prisma";
import { levelWithoutReferencesSchema } from "@/level/service";
import { trackSchema } from "@/track/service";

const db = prisma.title;

export const titleSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  level_id: z.number(),
  level: levelWithoutReferencesSchema,
  track_id: z
    .number()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
  track: trackSchema.optional(),
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
  const titles = await db.findMany({
    where: {
      retired_at: includeRetired ? undefined : null,
    },
    include: {
      level: true,
      track: true,
    },
  });
  return z.array(titleSchema).parse(titles);
};

export const getById = async (id: number) => {
  const title = await db.findUnique({
    where: {
      id,
    },
    include: {
      level: true,
      track: true,
    },
  });
  return titleSchema.parse(title);
};

export const createSchema = z.object({
  name: z.string().min(1),
  level_id: z.number(),
  track_id: z.number().optional(),
  formed_at: z.date().optional(),
  retired_at: z.date().optional(),
});

export const create = async (title: z.infer<typeof createSchema>) => {
  const createdTitle = await db.create({
    data: title,
    include: {
      level: true,
      track: true,
    },
  });
  return titleSchema.parse(createdTitle);
};

export const updateSchema = z.object({
  name: z.string().min(1),
  retired_at: z.date().optional(),
});

export const update = async (
  id: number,
  title: z.infer<typeof updateSchema>
) => {
  const updatedTitle = await db.update({
    where: {
      id,
    },
    data: title,
    include: {
      level: true,
      track: true,
    },
  });
  return titleSchema.parse(updatedTitle);
};

export const deleteById = async (id: number) => {
  const deletedTitle = await db.delete({
    where: {
      id,
    },
  });
  return titleSchema.parse(deletedTitle);
};
