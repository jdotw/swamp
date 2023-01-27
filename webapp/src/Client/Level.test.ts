import { vi } from "vitest";
import { MutateLevel, Level, useLevel, UseLevelProps } from "./Level";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

const defaultProps: UseLevelProps = {};

expectHookAdoptsUseCRUDCorrectly<Level, MutateLevel>({
  hookFactory: (props) => useLevel({ ...defaultProps, ...props }),
  itemFactory: (props) =>
    ({
      id: 1,
      index: 2,
      external_id: "two",
      individual_contributor_title: "IC Title",
      manager_title: "Manager Title",
      ...props,
    } as Level),
  mutateItemFactory: (props) =>
    ({
      index: 20,
      external_id: "new twenty-high",
      individual_contributor_title: "New IC Title",
      manager_title: "New Manager Title",
      retired_at_date: "2023-01-01",
      ...props,
    } as MutateLevel),
});
