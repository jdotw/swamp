import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps, UseCRUDProps } from "./CRUD/CRUD";
import { MutateUnit, Unit } from "./UnitInterface";

export interface Team {
  id: number;
  name: string;
  description?: string;
  type: string;
  formed_date: string;
  disbanded_date?: string;
  parent_id?: number;
  parent?: Team;
  children: Team[];
}

export interface MutateTeam {
  name: string;
  description?: string;
  type: string;
  parent_id?: number;
  formed_date: string;
  disbanded_date?: string;
}

export interface UseTeamProps extends UseCRUDOptionalProps {}

export function useTeam(props?: UseTeamProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Team, MutateTeam>({
    path: "/api/org/teams",
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
