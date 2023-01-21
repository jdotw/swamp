import { useEffect, useState } from "react";
import ChapterHome from "../Pages/Capability/Chapters/ChapterHome";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Person } from "./Person";
import { Practice } from "./Practice";
import { RoleType } from "./RoleType";

export interface Role {
  id: number;

  person_id: number;
  person: Person;

  role_type_id: number;
  role_type: RoleType;

  title: string;

  start_date: string;
  end_date?: string;

  functions: Function[];
}

export interface MutateRole {
  role_type_id: number;
  title: string;
  end_date?: string;
}

export interface UseRoleProps extends UseCRUDOptionalProps {
  personId: number;
  id?: number;
}

export function useRole(props: UseRoleProps) {
  const { personId } = props;
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
    path: `/api/org/persons/${personId}/roles`,
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
