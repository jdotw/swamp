import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Capability } from "./Capability";
import { Deployment } from "./Deployments";
import { HomeAssignment } from "./HomeAssignment";
import { TitleAssignment } from "./Role";
import { RoleAssignment } from "./RoleAssignment";

export interface RoleHistory {
  id: number; // Actually not used
  type: string;
  date: string;
  title_assignment?: TitleAssignment;
  role_assignment?: RoleAssignment;
  capability?: Capability;
  home_assignment?: HomeAssignment;
  deployment?: Deployment;
}

export interface UseRoleHistoryProps extends UseCRUDOptionalProps {
  id: number;
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
    path: `/api/org/roles/${props.id}/history`,
    ...props,
    id: undefined,
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
