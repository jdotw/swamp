import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const getAll = async (_: Request, res: Response) => {
  const persons = await prisma.person.findMany({
    where: {
      offboarded_at: null,
    },
  });
  res.send(JSON.stringify(persons));
};

export const create = async (req: Request, res: Response) => {
  const schema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    middle_names: z.string().optional(),
    external_id: z.string().min(1),
  });
  const data = schema.safeParse(req.body);
  if (data.success) {
    const person = await prisma.person.create({
      data: {
        ...data.data,
      },
    });
    res.status(201).send(JSON.stringify(person));
  }

  res.status(400).send();
};

export const getById = async (req: Request, res: Response) => {
  const person = await prisma.person.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });

  res.send(JSON.stringify(person));
};

export const updateById = async (req: Request, res: Response) => {
  const schema = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    middle_names: z.string().optional(),
  });
  const data = schema.safeParse(req.body);
  if (data.success) {
    const person = await prisma.person.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...data.data,
      },
    });
    res.status(201).send(JSON.stringify(person));
  }

  res.status(400).send();
};

export const deleteById = async (req: Request, res: Response) => {
  const person = await prisma.person.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
  });
  if (person) {
    const updatedPerson = await prisma.person.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        ...person,
        offboarded_at: new Date(),
      },
    });
    res.status(201).send(JSON.stringify(updatedPerson));
  }

  res.status(404).send();
};
