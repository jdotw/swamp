import { z } from "zod";
import prisma from "../libs/prisma";

const db = prisma.person;

export const personSchema = z.object({
  id: z.number(),
  created_at: z.date(),
  updated_at: z
    .date()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),

  external_id: z.string().min(1),
  first_name: z.string().min(1),
  middle_names: z
    .string()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
  last_name: z.string().min(1),

  onboarded_at: z.date(),
  offboarded_at: z
    .date()
    .nullable()
    .transform((val) => val ?? undefined)
    .optional(),
});

export const getAll = async ({
  includeOffboarded = false,
}: {
  includeOffboarded?: boolean;
} = {}) => {
  const persons = await db.findMany({
    where: {
      offboarded_at: includeOffboarded ? undefined : null,
    },
  });
  return z.array(personSchema).parse(persons);
};

export const getById = async (id: number) => {
  const person = await db.findUnique({
    where: {
      id,
    },
  });
  return personSchema.parse(person);
};

export const createSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  middle_names: z.string().optional(),
  external_id: z.string().min(1),
});

export const create = async (person: z.infer<typeof createSchema>) => {
  const createdPerson = await db.create({ data: person });
  return personSchema.parse(createdPerson);
};

export const updateSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  middle_names: z.string().optional(),
});

export const update = async (
  id: number,
  person: z.infer<typeof updateSchema>
) => {
  const updatedPerson = await db.update({
    where: {
      id,
    },
    data: person,
  });
  return personSchema.parse(updatedPerson);
};

export const deleteById = async (id: number) => {
  const deletedPerson = await db.delete({
    where: {
      id,
    },
  });
  return personSchema.parse(deletedPerson);
};
