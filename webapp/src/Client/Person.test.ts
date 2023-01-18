import { vi } from "vitest";
import { MutatePerson, Person, usePerson, UsePersonProps } from "./Person";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

const defaultProps: UsePersonProps = {};

expectHookAdoptsUseCRUDCorrectly<Person, MutatePerson>({
  hookFactory: (props) => usePerson({ ...defaultProps, ...props }),
  itemFactory: (props) =>
    ({
      id: "1",
      external_id: "213",
      first_name: "first name",
      middle_names: "mid",
      last_name: "last name",
      ...props,
    } as Person),
  mutateItemFactory: (props) =>
    ({
      name: "new name",
      disbanded_date: "2023-01-01",
      ...props,
    } as MutatePerson),
});
