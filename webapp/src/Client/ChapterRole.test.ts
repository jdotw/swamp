import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, Mock, vi } from "vitest";
import { useCRUD } from "../CRUD/CRUD";
import { Chapter, MutateChapter, useChapter } from "./Chapter";
import {
  ChapterRole,
  MutateChapterRole,
  useChapterRole,
  UseChapterRoleProps,
} from "./ChapterRole";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const path = `/api/capability/practiceroles`;
const defaultProps = { path };

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<ChapterRole, MutateChapterRole>({
  hookFactory: (props) => useChapterRole({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const chapterRole: ChapterRole = {
      id: "1",
      individual_id: "1",
      start_date: "2021-01-01",
      individual: {
        id: "1",
        first_name: "first_name",
        last_name: "last_name",
        external_id: "2134",
        tribe_roles: [],
        squad_roles: [],
        practice_roles: [],
        chapter_roles: [],
      },
      chapter_id: "1",
      chapter: {
        id: "1",
        name: "name",
      },
      chapter_role_type_id: "1",
      chapter_role_type: {
        id: "1",
        name: "name",
      },
      ...props,
    };
    return chapterRole;
  },
  mutateItemFactory: (props) => {
    const mutateChapterRole: MutateChapterRole = {
      individual_id: "1",
      chapter_id: "1",
      chapter_role_type_id: "1",
      practice_id: "1",
      ...props,
    };
    return mutateChapterRole;
  },
});
