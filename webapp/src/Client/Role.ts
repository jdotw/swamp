import { useEffect, useState } from "react";
import ChapterHome from "../Capability/Chapters/ChapterHome";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Person } from "./Person";
import { Practice } from "./Practice";
import { RoleType } from "./RoleType";

export interface Role {
  id: string;

  person_id: string;
  person: Person;

  role_type_id: string;
  role_type: RoleType;

  title: string;

  start_date: string;
  end_date?: string;

  functions: Function[];
}

export interface MutateRole {
  role_type_id: string;
  title: string;
  end_date?: string;
}

export interface UseRoleProps extends UseCRUDOptionalProps {
  personId: string;
  id?: string;
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
