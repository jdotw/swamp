import { vi } from "vitest";
import { MutateTribe, Tribe, useTribe } from "./Tribe";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<Tribe, MutateTribe>({
  hookFactory: (props) => useTribe({ ...props }),
  itemFactory: (props) =>
    ({
      id: "1",
      name: "name",
      description: "description",
      formed_date: "2021-01-01",
      disbanded_date: "2021-01-01",
      functions: [],
      squads: [],
      ...props,
    } as Tribe),
  mutateItemFactory: (props) =>
    ({
      name: "new name",
      disbanded_date: "2023-01-01",
      ...props,
    } as MutateTribe),
});
