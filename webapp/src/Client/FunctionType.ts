import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export type FunctionType = {
  id: number;
  name: string;
  is_individual_contributor: boolean;
  active_from_date: string;
  retired_at_date?: string;
  // unit_assignments: UnitAssignments[];
};

export type MutateFunctionType = {
  name: string;
  retired_at_date?: string;
  is_individual_contributor: boolean;
};

export interface UseFunctionTypeProps extends UseCRUDOptionalProps {}

export function useFunctionType(props?: UseFunctionTypeProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<FunctionType, MutateFunctionType>({
    path: "/api/org/functiontypes",
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
