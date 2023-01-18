import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export interface RoleType {
  id: string;
  title: string;
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateRoleType {
  title: string;
}

export interface UseRoleTypeProps extends UseCRUDOptionalProps {}

export function useRoleType(props?: UseRoleTypeProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<RoleType, MutateRoleType>({
    path: "/api/org/roletypes",
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
