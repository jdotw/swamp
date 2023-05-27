import { z } from "zod";
import prisma from "../libs/prisma";

const db = prisma.team;

export const teamSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  description: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
  type: z.string().min(1),
  parent_id: z
    .number()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
  formed_at: z.date(),
  disbanded_at: z
    .date()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
});

export const getAll = async ({
  includeDisbanded = false,
}: {
  includeDisbanded?: boolean;
} = {}) => {
  const teams = await db.findMany({
    where: {
      disbanded_at: includeDisbanded ? undefined : null,
    },
  });
  return z.array(teamSchema).parse(teams);
};

export const getById = async (id: number) => {
  const team = await db.findUnique({
    where: {
      id,
    },
  });
  return teamSchema.parse(team);
};

export const createSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  type: z.string().min(1),
  parent_id: z.number().optional(),
  formed_at: z.date().optional(),
  disbanded_at: z.date().optional(),
});

export const create = async (team: z.infer<typeof createSchema>) => {
  const createdTeam = await db.create({
    data: { ...team, formed_at: team.formed_at ?? new Date() },
  });
  return teamSchema.parse(createdTeam);
};

export const updateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  parent_id: z.number().optional(),
  disbanded_at: z.date().optional(),
});

export const update = async (
  id: number,
  team: z.infer<typeof updateSchema>
) => {
  const updatedTeam = await db.update({
    where: {
      id,
    },
    data: team,
  });
  return teamSchema.parse(updatedTeam);
};

export const deleteById = async (id: number) => {
  const deletedTeam = await db.delete({
    where: {
      id,
    },
  });
  return teamSchema.parse(deletedTeam);
};
