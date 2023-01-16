import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps, UseCRUDProps } from "../CRUD/CRUD";
import { MutateUnit, Unit } from "./UnitInterface";

export interface Team extends Unit {}

export interface MutateTeam extends MutateUnit {}

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
    ...props,
    path: "/api/org/teams",
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
