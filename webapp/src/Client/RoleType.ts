import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export interface RoleType {
  id: number;
  title: string;
  active_from_date: string;
  retired_at_date?: string;
  parent_id?: number;
  parent?: RoleType;
  children?: RoleType[];
}

export interface MutateRoleType {
  title: string;
  retired_at_date?: string;
  parent_id?: number;
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
