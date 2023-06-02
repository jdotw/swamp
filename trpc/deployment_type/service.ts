import { z } from "zod";
import prisma from "../libs/prisma";
import { deploymentTypeSchema } from "./schema";

const db = prisma.deploymentType;

export const getAll = async ({
  includeRetired = false,
}: {
  includeRetired?: boolean;
} = {}) => {
  const deploymentTypes = await db.findMany({
    where: {
      retired_at: includeRetired ? undefined : null,
    },
  });
  return z.array(deploymentTypeSchema).parse(deploymentTypes);
};

export const getById = async (id: number) => {
  const deploymentType = await db.findUnique({
    where: {
      id,
    },
  });
  return deploymentTypeSchema.parse(deploymentType);
};

export const createSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  role_type_id: z.number().optional(),
  formed_at: z.date().optional(),
  retired_at: z.date().optional(),
});

export const create = async (deploymentType: z.infer<typeof createSchema>) => {
  const createdDeploymentType = await db.create({
    data: deploymentType,
  });
  return deploymentTypeSchema.parse(createdDeploymentType);
};

export const updateSchema = z.object({
  name: z.string().min(1),
  parent_id: z.number().optional(),
  retired_at: z.date().optional(),
});

export const update = async (
  id: number,
  deploymentType: z.infer<typeof updateSchema>
) => {
  const updatedDeploymentType = await db.update({
    where: {
      id,
    },
    data: deploymentType,
  });
  return deploymentTypeSchema.parse(updatedDeploymentType);
};

export const deleteById = async (id: number) => {
  const deletedDeploymentType = await db.delete({
    where: {
      id,
    },
  });
  return deploymentTypeSchema.parse(deletedDeploymentType);
};
