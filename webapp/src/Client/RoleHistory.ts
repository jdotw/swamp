import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { LevelAssignment, UnitAssignment } from "./Role";
import { RoleAssignment } from "./RoleAssignment";

export interface RoleHistory {
  id: number; // Actually not used
  type: string;
  date: string;
  level_assignment?: LevelAssignment;
  role_assignment?: RoleAssignment;
  unit_assignment?: UnitAssignment;
}

export interface UseRoleHistoryProps extends UseCRUDOptionalProps {
  roleId: number;
}

export function useRoleHistory(props: UseRoleHistoryProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<RoleHistory, undefined>({
    path: `/api/org/role/${props.roleId}/history`,
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
