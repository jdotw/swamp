import { vi } from "vitest";
import {
  PracticeRoleType,
  MutatePracticeRoleType,
  usePracticeRoleType,
} from "./PracticeRoleType";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const path = `/api/capability/practiceroles`;
const defaultProps = { path };

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<PracticeRoleType, MutatePracticeRoleType>({
  hookFactory: (props) => usePracticeRoleType({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const roleType: PracticeRoleType = {
      id: "1",
      name: "Practice Role Type Name",
      ...props,
    };
    return roleType;
  },
  mutateItemFactory: (props) => {
    const mutatePracticeRoleType: MutatePracticeRoleType = {
      name: "Updated Role Type Name",
      ...props,
    };
    return mutatePracticeRoleType;
  },
});
