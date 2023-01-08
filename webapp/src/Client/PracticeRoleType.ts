import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";

export type PracticeRoleType = {
  id: string;
  name: string;
};

export type MutatePracticeRoleType = {
  name: string;
};

export interface UsePracticeRoleTypeProps extends UseCRUDOptionalProps {}

export function usePracticeRoleType(props?: UsePracticeRoleTypeProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<PracticeRoleType, MutatePracticeRoleType>({
    path: "/api/capability/practiceroletypes",
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
