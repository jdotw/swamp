import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Practice } from "./Practice";
import { FunctionType } from "./FunctionType";
import { Tribe } from "./Tribe";
import { Squad } from "./Squad";
import { Role } from "./Role";
import { Team } from "./Team";

export type Function = {
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
};

export type MutateFunction = {
  practice_id: string;
  person_id: string;
  function_type_id: string;
};

export interface UseFunctionProps extends UseCRUDOptionalProps {
  roleId: string;
  id?: string;
}

export function useFunction(props: UseFunctionProps) {
  const { roleId } = props || {};
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
    path: `/api/org/roles/${roleId}/functions`,
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
