import { useEffect, useState } from "react";
import ChapterHome from "../Pages/Capability/Chapters/ChapterHome";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Person } from "./Person";
import { Practice } from "./Practice";
import { RoleType } from "./RoleType";
import { FunctionType } from "./FunctionType";
import { Level } from "./Level";

export interface UnitAssignment {
  id: number;
  unit_id: number;
  unit_type: "squad" | "chapter" | "practice" | "tribe" | "team";
  unit_name: string;
}

export interface LevelAssignment {
  id: number;
}

export interface RoleAssignment {
  id: number;
}

export interface Role {
  id: number;

  role_type_id: number;
  role_type?: RoleType;

  function_type_id: number;
  function_type?: FunctionType;

  level_assignments?: LevelAssignment[];
  unit_assignments?: UnitAssignment[];
  role_assignments?: RoleAssignment[];

  start_date: string;
  end_date?: string;

  delivery_unit_assignment: UnitAssignment;
  capability_unit_assignment: UnitAssignment;

  assigned_person: Person;
  assigned_level: Level;

  is_vacant: boolean;
}

export interface MutateRole {
  role_type_id: number;
  function_type_id: number;
  level_id: number;
  unit_id: number;
  unit_type: "squad" | "chapter" | "practice" | "tribe" | "team";
  start_date?: string;
  end_date?: string;
}

export interface UseRoleProps extends UseCRUDOptionalProps {
  tribeId?: number;
  squadId?: number;
}

export function useRole(props: UseRoleProps = {}) {
  let path;
  if (props.squadId) {
    path = `/api/org/tribes/${props.tribeId}/squads/${props.squadId}/roles`;
  } else if (props.tribeId) {
    path = `/api/org/tribes/${props.tribeId}/roles`;
  } else {
    path = `/api/org/roles`;
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
  } = useCRUD<Role, MutateRole>({
    path,
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
