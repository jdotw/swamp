import { getAll } from "./service";
import { describe, it, expect, vi } from "vitest";
import { create } from "../persons/service";
import prisma from "../libs/__mocks__/prisma";

vi.mock("../libs/prisma");

describe("create", () => {
  it("should return the created user with null values as undefined", async () => {
    const newPerson = {
      first_name: "John",
      last_name: "Doe",
      external_id: "2",
    };
    const id = 1;
    const dbCreatedPerson = {
      ...newPerson,
      id: id,
      middle_names: null,
      offboarded_at: null,
      created_at: new Date(),
      updated_at: new Date(),
      onboarded_at: new Date(),
    };
    const createdPerson = {
      ...newPerson,
      id: id,
      middle_names: undefined,
      offboarded_at: undefined,
      created_at: new Date(),
      updated_at: new Date(),
      onboarded_at: new Date(),
    };
    prisma.person.create.mockResolvedValue(dbCreatedPerson);
    const user = await create(newPerson);
    expect(user).toStrictEqual(createdPerson);
  });
});

describe("getAll", () => {
  describe("when includeOffboarded is true", () => {
    it("returns all persons", async () => {
      prisma.person.findMany.mockResolvedValue([]);
      await getAll({ includeOffboarded: true });
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: {
          offboarded_at: undefined,
        },
      });
    });
  });
  describe("when includeOffboarded is false", () => {
    it("returns only non-offboarded persons", async () => {
      prisma.person.findMany.mockResolvedValue([]);
      await getAll({ includeOffboarded: false });
      expect(prisma.person.findMany).toHaveBeenCalledWith({
        where: {
          offboarded_at: null,
        },
      });
    });
  });
});
