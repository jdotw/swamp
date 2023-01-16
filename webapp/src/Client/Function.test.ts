import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useCRUD } from "../CRUD/CRUD";
import {
  Function,
  MutateFunction,
  useFunction,
  UseFunctionProps,
} from "./Function";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const roleId = Math.floor(Math.random() * 1000).toString();
const id = Math.floor(Math.random() * 1000).toString();
const path = `/api/org/roles/${roleId}/functions`;
const defaultProps = { roleId, path, id } as UseFunctionProps;

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<Function, MutateFunction>({
  hookFactory: (props) => useFunction({ ...defaultProps, ...props }),
  itemFactory: (props) =>
    ({
      id: "1",
      function_type_id: "1",
      function_type: {
        id: "1",
        name: "name",
        active_from_date: "2021-01-01",
      },
      name: "name",
      practice_id: "1",
      practice: {
        id: "1",
        name: "name",
      },
      start_date: "2021-01-01",
      end_date: "2021-01-01",
      ...props,
    } as Function),
  mutateItemFactory: (props) =>
    ({
      function_type_id: "1",
      name: "updated name",
      end_date: "2021-01-01",
      ...props,
    } as MutateFunction),
});

describe("useFunction hook", () => {
  it("should use the roleId prop in the path provided to useCRUD", () => {
    const roleId = Math.floor(Math.random() * 1000).toString();
    const { result } = renderHook(() => useFunction({ roleId }));
    const path = `/api/org/roles/${roleId}/functions`;
    expect(useCRUD).toHaveBeenCalledWith({ path, roleId: roleId });
  });
});
