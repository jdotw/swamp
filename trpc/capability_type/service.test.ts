import { getAll, capabilityTypeSchema } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "../capability_type/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created capabilityType with null values as undefined", async () => {
    const newCapabilityType = {
      name: "Test CapabilityType",
    };
    const id = 1;
    const dbCreatedCapabilityType = {
      ...newCapabilityType,
      id: id,
      active_from: new Date(),
      retired_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      parent_id: null,
      role_type_id: null,
    };
    const createdCapabilityType: z.infer<typeof capabilityTypeSchema> = {
      ...newCapabilityType,
      id: dbCreatedCapabilityType.id,
      active_from: dbCreatedCapabilityType.active_from,
      retired_at: undefined,
      parent_id: undefined,
      role_type_id: undefined,
    };
    prisma.capabilityType.create.mockResolvedValue(dbCreatedCapabilityType);
    const capabilityType = await create(newCapabilityType);
    expect(capabilityType).toStrictEqual(createdCapabilityType);
  });
});

describe("getAll", () => {
  describe("when includeRetired is true", () => {
    it("returns all capabilityTypes", async () => {
      prisma.capabilityType.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: true });
      expect(prisma.capabilityType.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: undefined,
        },
        include: {
          role_type: true,
        },
      });
    });
  });
  describe("when includeRetired is false", () => {
    it("returns only non-retired capabilityTypes", async () => {
      prisma.capabilityType.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: false });
      expect(prisma.capabilityType.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: null,
        },
        include: {
          role_type: true,
        },
      });
    });
  });
});
