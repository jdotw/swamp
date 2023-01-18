import { vi } from "vitest";
import {
  RoleType,
  MutateRoleType,
  useRoleType,
  UseRoleTypeProps,
} from "./RoleType";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const defaultProps: UseRoleTypeProps = {};

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<RoleType, MutateRoleType>({
  hookFactory: (props) => useRoleType({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const roleType: RoleType = {
      id: "1",
      title: "Role Title",
      active_from_date: Date.now().toString(),
      ...props,
    };
    return roleType;
  },
  mutateItemFactory: (props) => {
    const mutateRoleType: MutateRoleType = {
      title: "Updated Role Title",
      ...props,
    };
    return mutateRoleType;
  },
});
