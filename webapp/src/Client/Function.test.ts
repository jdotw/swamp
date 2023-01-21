import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { Chapter } from "./Chapter";
import { useCRUD } from "./CRUD/CRUD";
import {
  Function,
  MutateFunction,
  useFunction,
  UseFunctionProps,
} from "./Function";
import { Practice } from "./Practice";
import { Squad } from "./Squad";
import { Tribe } from "./Tribe";
import { Unit } from "./UnitInterface";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const roleId = Math.floor(Math.random() * 1000);
const id = Math.floor(Math.random() * 1000);
const path = `/api/org/roles/${roleId}/functions`;
const defaultProps = { roleId, path, id } as UseFunctionProps;

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<Function, MutateFunction>({
  hookFactory: (props) => useFunction({ ...defaultProps, ...props }),
  itemFactory: (props) =>
    ({
      id: 1,
      function_type_id: 1,
      function_type: {
        id: 1,
        name: "name",
        active_from_date: "2021-01-01",
      },
      name: "name",
      practice_id: 1,
      practice: {
        id: 1,
        name: "name",
      },
      start_date: "2021-01-01",
      end_date: "2021-01-01",
      ...props,
    } as Function),
  mutateItemFactory: (props) =>
    ({
      function_type_id: 1,
      name: "updated name",
      end_date: "2021-01-01",
      ...props,
    } as MutateFunction),
});

describe("when useFunction is provided a functionId", () => {
  it("should use the functionId prop in the path provided to useCRUD", () => {
    const functionId = Math.floor(Math.random() * 1000);
    const { result } = renderHook(() => useFunction({ id: functionId }));
    const path = `/api/org/roles/${functionId}/functions`;
    expect(useCRUD).toHaveBeenCalledWith({ path, id: functionId });
  });
});

describe("when useFunction is called with a unit", () => {
  const unit: Unit = {
    id: Math.floor(Math.random() * 1000),
    name: "name",
    description: "description",
    formed_date: new Date().toUTCString(),
    type: "",
  };
  const tribe: Tribe = {
    ...unit,
    type: "tribe",
  };
  const squad: Squad = {
    ...unit,
    type: "squad",
    tribe_id: tribe.id,
    tribe: tribe,
  };
  const practice: Practice = {
    ...unit,
    type: "practice",
  };
  const chapter: Chapter = {
    ...unit,
    type: "chapter",
    practice_id: practice.id,
    practice: practice,
  };
  const team: Team = {
    ...unit,
    type: "team",
  };

  describe("when useFunction is called with a tribe", () => {
    it("should provide the tribe path including tribe.id to useCRUD", () => {
      const { result } = renderHook(() => useFunction({ unit: tribe }));
      const path = `/api/org/tribes/${tribe.id}/functions`;
      expect(useCRUD).toHaveBeenCalledWith({ path, unit: tribe });
    });
  });

  describe("when useFunction is called with a squad", () => {
    it("should provide the squad path including squad.id to useCRUD", () => {
      const { result } = renderHook(() => useFunction({ unit: squad }));
      const path = `/api/org/tribes/${tribe.id}/squads/${squad.id}/functions`;
      expect(useCRUD).toHaveBeenCalledWith({ path, unit: squad });
    });
  });

  describe("when useFunction is called with a practice", () => {
    it("should provide the practice path including practice.id to useCRUD", () => {
      const { result } = renderHook(() => useFunction({ unit: practice }));
      const path = `/api/org/practices/${practice.id}/functions`;
      expect(useCRUD).toHaveBeenCalledWith({ path, unit: practice });
    });
  });

  describe("when useFunction is called with a chapter", () => {
    it("should provide the chapter path including chapter.id to useCRUD", () => {
      const { result } = renderHook(() => useFunction({ unit: chapter }));
      const path = `/api/org/practices/${tribe.id}/chapters/${chapter.id}/functions`;
      expect(useCRUD).toHaveBeenCalledWith({ path, unit: chapter });
    });
  });

  describe("when useFunction is called with a team", () => {
    it("should provide the team path including team.id to useCRUD", () => {
      const { result } = renderHook(() => useFunction({ unit: team }));
      const path = `/api/org/teams/${team.id}/functions`;
      expect(useCRUD).toHaveBeenCalledWith({ path, unit: team });
    });
  });
});
