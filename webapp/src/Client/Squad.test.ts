import { vi } from "vitest";
import { Squad, MutateSquad, useSquad, UseSquadProps } from "./Squad";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const tribeId = Math.floor(Math.random() * 1000);
const defaultProps: UseSquadProps = { tribeId };

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<Squad, MutateSquad>({
  hookFactory: (props) => useSquad({ ...defaultProps, ...props }),
  itemFactory: (props) =>
    ({
      id: 1,
      name: "name",
      formed_date: "2021-01-01",
      disbanded_date: "2021-01-01",
      functions: [],
      ...props,
    } as Squad),
  mutateItemFactory: (props) =>
    ({
      name: "new name",
      disbanded_date: "2023-01-01",
      ...props,
    } as MutateSquad),
});
