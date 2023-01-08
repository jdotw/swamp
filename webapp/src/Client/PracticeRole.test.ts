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
  PracticeRole,
  MutatePracticeRole,
  usePracticeRole,
  UsePracticeRoleProps,
} from "./PracticeRole";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const practiceId = Math.floor(Math.random() * 1000).toString();
const path = `/api/capability/practices/${practiceId}/practiceroles`;
const defaultProps = { path, practiceId };

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<PracticeRole, MutatePracticeRole>({
  hookFactory: (props) => usePracticeRole({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const practiceRole: PracticeRole = {
      id: "1",
      individual_id: "1",
      start_date: "2021-01-01",
      individual: {
        id: "1",
        first_name: "first_name",
        last_name: "last_name",
        external_id: "2134",
      },
      practice_id: "1",
      practice: {
        id: "1",
        name: "name",
        chapters: [],
      },
      practice_role_type_id: "1",
      practice_role_type: {
        id: "1",
        name: "name",
      },
      ...props,
    };
    return practiceRole;
  },
  mutateItemFactory: (props) => {
    const mutatePracticeRole: MutatePracticeRole = {
      individual_id: "1",
      practice_id: "1",
      practice_role_type_id: "1",
      ...props,
    };
    return mutatePracticeRole;
  },
});

describe("usePracticeRole", () => {
  it("should use the practiceId prop in the path provided to useCRUD", () => {
    const practiceId = "1";
    const { result } = renderHook(() => usePracticeRole({ practiceId }));
    const path = `/api/capability/practices/${practiceId}/roles`;
    expect(useCRUD).toHaveBeenCalledWith({ path, practiceId: practiceId });
  });
});
