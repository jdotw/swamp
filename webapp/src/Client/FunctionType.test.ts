import { vi } from "vitest";
import {
  FunctionType,
  MutateFunctionType,
  useFunctionType,
} from "./FunctionType";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const path = `/api/org/functiontypes`;
const defaultProps = { path };

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<FunctionType, MutateFunctionType>({
  hookFactory: (props) => useFunctionType({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const functionType: FunctionType = {
      id: 1,
      name: "Function Type Name",
      active_from_date: Date.now().toString(),
      ...props,
    };
    return functionType;
  },
  mutateItemFactory: (props) => {
    const mutateFunctionType: MutateFunctionType = {
      name: "Updated Function Type Name",
      retired_at_date: Date.now().toString(),
      ...props,
    };
    return mutateFunctionType;
  },
});
