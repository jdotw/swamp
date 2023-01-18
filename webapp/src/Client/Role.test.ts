import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, Mock, vi } from "vitest";
import { useCRUD } from "./CRUD/CRUD";
import { Chapter, MutateChapter, useChapter } from "./Chapter";
import { Role, MutateRole, useRole, UseRoleProps } from "./Role";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const personId = Math.floor(Math.random() * 1000).toString();
const path = `/api/org/roles`;
const defaultProps = { path, personId };

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<Role, MutateRole>({
  hookFactory: (props) => useRole({ ...defaultProps, ...props }),
  itemFactory: (props) =>
    ({
      id: "1",
      person_id: "1",
      person: {
        id: "1",
        first_name: "first_name",
        last_name: "last_name",
        external_id: "2134",
      },
      role_type_id: "1",
      role_type: {},
      title: "Role Title",
      start_date: "2021-01-01",
      ...props,
    } as Role),
  mutateItemFactory: (props) =>
    ({
      role_type_id: "1",
      title: "Updated Title",
      end_date: "2023-01-17",
      ...props,
    } as MutateRole),
});

describe("useRole", () => {
  it("should use the personId prop in the path provided to useCRUD", () => {
    const personId = "1";
    const { result } = renderHook(() => useRole({ personId }));
    const path = `/api/org/persons/${personId}/roles`;
    expect(useCRUD).toHaveBeenCalledWith({ path, personId: personId });
  });
});
