import { vi } from "vitest";
import { MutateTeam, Team, useTeam, UseTeamProps } from "./Team";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

describe("useTeam Hook", () => {
  it("should use useCRUD correctly", () => {
    expectHookAdoptsUseCRUDCorrectly({
      hookFactory: (props) => useTeam({ ...props }),
      itemFactory: (props) =>
        ({
          id: Math.floor(Math.random() * 1000),
          name: "Test Team",
          ...props,
        } as Team),
      mutateItemFactory: (props) =>
        ({
          name: "Mutated Test Team",
          ...props,
        } as MutateTeam),
    });
  });
});
