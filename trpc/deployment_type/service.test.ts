import { describe, it, expect, vi } from "vitest";
import { create, getAll } from "../deployment_type/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";
import { deploymentTypeSchema } from "./schema";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created deploymentType with null values as undefined", async () => {
    const newDeploymentType = {
      name: "Test DeploymentType",
    };
    const id = 1;
    const dbCreatedDeploymentType = {
      ...newDeploymentType,
      id: id,
      active_from: new Date(),
      retired_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      parent_id: null,
    };
    const createdDeploymentType: z.infer<typeof deploymentTypeSchema> = {
      ...newDeploymentType,
      id: dbCreatedDeploymentType.id,
      active_from: dbCreatedDeploymentType.active_from,
      retired_at: undefined,
      parent_id: undefined,
    };
    prisma.deploymentType.create.mockResolvedValue(dbCreatedDeploymentType);
    const deploymentType = await create(newDeploymentType);
    expect(deploymentType).toStrictEqual(createdDeploymentType);
  });
});

describe("getAll", () => {
  describe("when includeRetired is true", () => {
    it("returns all deploymentTypes", async () => {
      prisma.deploymentType.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: true });
      expect(prisma.deploymentType.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: undefined,
        },
      });
    });
  });
  describe("when includeRetired is false", () => {
    it("returns only non-retired deploymentTypes", async () => {
      prisma.deploymentType.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: false });
      expect(prisma.deploymentType.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: null,
        },
      });
    });
  });
});
