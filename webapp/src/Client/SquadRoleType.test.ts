import { vi } from "vitest";
import {
  ChapterRoleType,
  MutateChapterRoleType,
  useChapterRoleType,
} from "./ChapterRoleType";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const path = `/api/delivey/squad/roles`;
const defaultProps = { path };

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<ChapterRoleType, MutateChapterRoleType>({
  hookFactory: (props) => useChapterRoleType({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const roleType: ChapterRoleType = {
      id: "1",
      name: "Chapter Role Type Name",
      ...props,
    };
    return roleType;
  },
  mutateItemFactory: (props) => {
    const mutateChapterRoleType: MutateChapterRoleType = {
      name: "Updated Role Type Name",
      ...props,
    };
    return mutateChapterRoleType;
  },
});
