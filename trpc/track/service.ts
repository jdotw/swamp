import { z } from "zod";
import prisma from "../libs/prisma";

const db = prisma.track;

export const trackSchema = z.object({
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
  const tracks = await db.findMany({
    where: {
      retired_at: includeRetired ? undefined : null,
    },
  });
  return z.array(trackSchema).parse(tracks);
};

export const getById = async (id: number) => {
  const track = await db.findUnique({
    where: {
      id,
    },
  });
  return trackSchema.parse(track);
};

export const createSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  formed_at: z.date().optional(),
  retired_at: z.date().optional(),
});

export const create = async (track: z.infer<typeof createSchema>) => {
  const createdTrack = await db.create({ data: track });
  return trackSchema.parse(createdTrack);
};

export const updateSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  retired_at: z.date().optional(),
});

export const update = async (
  id: number,
  track: z.infer<typeof updateSchema>
) => {
  const updatedTrack = await db.update({
    where: {
      id,
    },
    data: track,
  });
  return trackSchema.parse(updatedTrack);
};

export const deleteById = async (id: number) => {
  const deletedTrack = await db.delete({
    where: {
      id,
    },
  });
  return trackSchema.parse(deletedTrack);
};
