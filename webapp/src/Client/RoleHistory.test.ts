import { vi } from "vitest";
import {
  RoleHistory,
  useRoleHistory,
  UseRoleHistoryProps,
} from "./RoleHistory";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const defaultProps: UseRoleHistoryProps = { roleId: 1 };

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<RoleHistory, undefined>({
  hookFactory: (props) => useRoleHistory({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const roleHistory: RoleHistory = {
      id: 0,
      type: "opened",
      date: Date.now().toString(),
      ...props,
    };
    return roleHistory;
  },
  mutateItemFactory: (props) => props,
});
