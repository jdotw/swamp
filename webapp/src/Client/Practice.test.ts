import { vi } from "vitest";
import {
  Practice,
  MutatePractice,
  usePractice,
  UsePracticeProps,
} from "./Practice";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const defaultProps: UsePracticeProps = {};

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<Practice, MutatePractice>({
  hookFactory: (props) => usePractice({ ...defaultProps, ...props }),
  itemFactory: (props) =>
    ({
      id: "1",
      name: "name",
      description: "description",
      formed_date: "2021-01-01",
      disbanded_date: "2021-01-01",
      functions: [],
      chapters: [],
      ...props,
    } as Practice),
  mutateItemFactory: (props) =>
    ({
      name: "new name",
      disbanded_date: "2023-01-01",
      ...props,
    } as MutatePractice),
});
