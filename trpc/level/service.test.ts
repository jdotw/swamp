import { getAll, levelSchema } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "../level/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created level with null values as undefined", async () => {
    const newLevel = {
      index: 1,
      name: "Test Level",
      external_id: "test-level",
    };
    const id = 1;
    const dbCreatedLevel = {
      ...newLevel,
      id: id,
      active_from: new Date(),
      retired_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      parent_id: null,
    };
    const createdLevel: z.infer<typeof levelSchema> = {
      ...newLevel,
      id: dbCreatedLevel.id,
      active_from: dbCreatedLevel.active_from,
      retired_at: undefined,
      parent_id: undefined,
    };
    prisma.level.create.mockResolvedValue(dbCreatedLevel);
    const level = await create(newLevel);
    expect(level).toStrictEqual(createdLevel);
  });
});

describe("getAll", () => {
  describe("when includeRetired is true", () => {
    it("returns all levels", async () => {
      prisma.level.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: true });
      expect(prisma.level.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: undefined,
        },
      });
    });
  });
  describe("when includeRetired is false", () => {
    it("returns only non-retired levels", async () => {
      prisma.level.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: false });
      expect(prisma.level.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: null,
        },
      });
    });
  });
});
