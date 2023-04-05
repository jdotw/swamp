import { Mock, vi } from "vitest";
import { useCRUD } from "./CRUD/CRUD";
import {
  RoleHistory,
  useRoleHistory,
  UseRoleHistoryProps,
} from "./RoleHistory";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const defaultProps: UseRoleHistoryProps = { id: 1 };

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

describe("useRoleHistory", () => {
  it("should NOT pass the (role) id to the CRUD hook", () => {
    const id = 1234;
    useRoleHistory({ id });
    expect(useCRUD).toHaveBeenCalledWith({
      path: expect.anything(),
      id: undefined,
    });
  });
  it("should use the correct path prefix", () => {
    const id = 1234;
    useRoleHistory({ id });
    expect(useCRUD).toHaveBeenCalledWith({
      path: `/api/org/roles/${id}/history`,
      id: undefined,
    });
  });
});
