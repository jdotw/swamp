import { useEffect, useState } from "react";
import ChapterHome from "../Pages/Capability/Chapters/ChapterHome";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Person } from "./Person";
import { Practice } from "./Practice";
import { RoleType } from "./RoleType";
import { FunctionType } from "./FunctionType";

export interface Role {
  id: number;

  role_type_id: number;
  role_type?: RoleType;

  function_type_id: number;
  function_type?: FunctionType;

  level_assignments?: any[];

  start_date: string;
  end_date?: string;
}

export interface MutateRole {
  role_type_id: number;
  function_type_id: number;
  level_id: number;
  start_date?: string;
  end_date?: string;
}

export interface UseRoleProps extends UseCRUDOptionalProps {}

export function useRole(props: UseRoleProps) {
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
    path: `/api/org/roles`,
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
