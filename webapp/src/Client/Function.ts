import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Practice } from "./Practice";
import { FunctionType } from "./FunctionType";
import { Tribe } from "./Tribe";
import { Squad } from "./Squad";
import { Role } from "./Role";
import { Team } from "./Team";
import { Unit } from "./UnitInterface";

export interface Function {
  id: string;

  function_type_id: string;
  function_type: FunctionType;

  name: string;

  practice_id: string;
  practice: Practice;
  chapter_id: string;
  chapter: Chapter;
  tribe_id: string;
  tribe: Tribe;
  squad_id: string;
  squad: Squad;
  team_id: string;
  team: Team;

  start_date: string;
  end_date: string;

  role_id: string;
  role: Role;
}

export interface MutateFunction {
  practice_id: string;
  person_id: string;
  function_type_id: string;
}

export interface UseFunctionProps extends UseCRUDOptionalProps {
  // roleId and unit are mutually exclusive
  // however one of the two must be specified
  roleId?: string;
  unit?: Unit;
}

export function useFunction(props: UseFunctionProps) {
  const { roleId, unit } = props;
  let path = undefined;
  if (roleId) {
    `/api/org/roles/${roleId}/functions`;
  } else if (unit) {
    switch (unit.type) {
      case "chapter":
        const chapter = unit as Chapter;
        path = `/api/org/practices/${chapter.practice_id}/chapters/${unit.id}/functions`;
        break;
      case "practice":
        path = `/api/org/practices/${unit.id}/functions`;
        break;
      case "squad":
        const squad = unit as Squad;
        path = `/api/org/tribes/${squad.tribe_id}/squads/${unit.id}/functions`;
        break;
      case "team":
        path = `/api/org/teams/${unit.id}/functions`;
        break;
      case "tribe":
        path = `/api/org/tribes/${unit.id}/functions`;
        break;
    }
  }
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Function, MutateFunction>({
    path: path ?? "",
    ...props,
  });

  return {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  };
}
