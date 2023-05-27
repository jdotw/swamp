import { getAll, trackSchema } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "../track/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created track with null values as undefined", async () => {
    const newTrack = {
      name: "Test Track",
    };
    const id = 1;
    const dbCreatedTrack = {
      ...newTrack,
      id: id,
      active_from: new Date(),
      retired_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      parent_id: null,
    };
    const createdTrack: z.infer<typeof trackSchema> = {
      ...newTrack,
      id: dbCreatedTrack.id,
      active_from: dbCreatedTrack.active_from,
      retired_at: undefined,
      parent_id: undefined,
    };
    prisma.track.create.mockResolvedValue(dbCreatedTrack);
    const track = await create(newTrack);
    expect(track).toStrictEqual(createdTrack);
  });
});

describe("getAll", () => {
  describe("when includeRetired is true", () => {
    it("returns all tracks", async () => {
      prisma.track.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: true });
      expect(prisma.track.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: undefined,
        },
      });
    });
  });
  describe("when includeRetired is false", () => {
    it("returns only non-retired tracks", async () => {
      prisma.track.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: false });
      expect(prisma.track.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: null,
        },
      });
    });
  });
});
