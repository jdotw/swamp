import { getAll, titleSchema } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "@/title/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created title with null values as undefined", async () => {
    const newTitle = {
      name: "Test Title",
      level_id: 1,
    };
    const id = 1;
    const dbCreatedTitle = {
      ...newTitle,
      id: id,
      active_from: new Date(),
      retired_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      track_id: null,
      level: {
        id: 1,
        index: 1,
        name: "Test Level",
        external_id: "test-level",
        active_from: new Date(),
        retired_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        parent_id: null,
      },
    };
    const createdTitle: z.infer<typeof titleSchema> = {
      ...newTitle,
      id: dbCreatedTitle.id,
      active_from: dbCreatedTitle.active_from,
      retired_at: undefined,
      track_id: undefined,
      level: {
        id: dbCreatedTitle.level.id,
        index: dbCreatedTitle.level.index,
        name: dbCreatedTitle.level.name,
        external_id: dbCreatedTitle.level.external_id,
        active_from: dbCreatedTitle.level.active_from,
        retired_at: undefined,
        parent_id: undefined,
      },
    };
    prisma.title.create.mockResolvedValue(dbCreatedTitle);
    const title = await create(newTitle);
    expect(title).toStrictEqual(createdTitle);
  });
});

describe("getAll", () => {
  describe("when includeRetired is true", () => {
    it("returns all titles", async () => {
      prisma.title.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: true });
      expect(prisma.title.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: undefined,
        },
        include: {
          level: true,
          track: true,
        },
      });
    });
  });
  describe("when includeRetired is false", () => {
    it("returns only non-retired titles", async () => {
      prisma.title.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: false });
      expect(prisma.title.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: null,
        },
        include: {
          level: true,
          track: true,
        },
      });
    });
  });
});
