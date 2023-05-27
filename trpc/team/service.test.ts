import { getAll, teamSchema } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "../team/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created team with null values as undefined", async () => {
    const newTeam = {
      name: "Test Team",
      type: "delivery",
    };
    const id = 1;
    const dbCreatedTeam = {
      ...newTeam,
      id: id,
      description: null,
      formed_at: new Date(),
      disbanded_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      parent_id: null,
    };
    const createdTeam: z.infer<typeof teamSchema> = {
      ...newTeam,
      id: dbCreatedTeam.id,
      description: undefined,
      formed_at: dbCreatedTeam.formed_at,
      disbanded_at: undefined,
      parent_id: undefined,
    };
    prisma.team.create.mockResolvedValue(dbCreatedTeam);
    const team = await create(newTeam);
    expect(team).toStrictEqual(createdTeam);
  });
});

describe("getAll", () => {
  describe("when includeDisbanded is true", () => {
    it("returns all teams", async () => {
      prisma.team.findMany.mockResolvedValue([]);
      await getAll({ includeDisbanded: true });
      expect(prisma.team.findMany).toHaveBeenCalledWith({
        where: {
          disbanded_at: undefined,
        },
      });
    });
  });
  describe("when includeDisbanded is false", () => {
    it("returns only non-disbanded teams", async () => {
      prisma.team.findMany.mockResolvedValue([]);
      await getAll({ includeDisbanded: false });
      expect(prisma.team.findMany).toHaveBeenCalledWith({
        where: {
          disbanded_at: null,
        },
      });
    });
  });
});
