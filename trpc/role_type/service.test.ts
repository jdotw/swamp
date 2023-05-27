import { getAll } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "../role_type/service";
import prisma from "../libs/__mocks__/prisma";
import { z } from "zod";
import { roleTypeSchema } from "./schema";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created roleType with null values as undefined", async () => {
    const newRoleType = {
      name: "Test RoleType",
    };
    const id = 1;
    const dbCreatedRoleType = {
      ...newRoleType,
      id: id,
      active_from: new Date(),
      retired_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      parent_id: null,
    };
    const createdRoleType: z.infer<typeof roleTypeSchema> = {
      ...newRoleType,
      id: dbCreatedRoleType.id,
      active_from: dbCreatedRoleType.active_from,
      retired_at: undefined,
      parent_id: undefined,
    };
    prisma.roleType.create.mockResolvedValue(dbCreatedRoleType);
    const roleType = await create(newRoleType);
    expect(roleType).toStrictEqual(createdRoleType);
  });
});

describe("getAll", () => {
  describe("when includeRetired is true", () => {
    it("returns all roleTypes", async () => {
      prisma.roleType.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: true });
      expect(prisma.roleType.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: undefined,
        },
        include: {
          capability_types: true,
        },
      });
    });
  });
  describe("when includeRetired is false", () => {
    it("returns only non-retired roleTypes", async () => {
      prisma.roleType.findMany.mockResolvedValue([]);
      await getAll({ includeRetired: false });
      expect(prisma.roleType.findMany).toHaveBeenCalledWith({
        where: {
          retired_at: null,
        },
        include: {
          capability_types: true,
        },
      });
    });
  });
});
