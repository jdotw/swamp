import { getAll, capabilitySchema } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "../capability/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created capability with null values as undefined", async () => {
    const newCapability = {
      name: "Test Capability",
    };
    const id = 1;
    const dbCreatedCapability = {
      ...newCapability,
      id: id,
      active_from: new Date(),
      retired_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      parent_id: null,
    };
    const createdCapability: z.infer<typeof capabilitySchema> = {
      ...newCapability,
      id: dbCreatedCapability.id,
      active_from: dbCreatedCapability.active_from,
      retired_at: undefined,
      parent_id: undefined,
    };
    prisma.capability.create.mockResolvedValue(dbCreatedCapability);
    const capability = await create(newCapability);
    expect(capability).toStrictEqual(createdCapability);
  });
});

describe("getAll", () => {
  describe("when includeRetired is true", () => {
    it("returns all capabilitys", async () => {
      prisma.capability.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: true });
      expect(prisma.capability.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: undefined,
        },
      });
    });
  });
  describe("when includeRetired is false", () => {
    it("returns only non-retired capabilitys", async () => {
      prisma.capability.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: false });
      expect(prisma.capability.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: null,
        },
      });
    });
  });
});
