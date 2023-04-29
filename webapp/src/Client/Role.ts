import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { RoleType } from "./RoleType";
import { Level } from "./Level";
import { RoleAssignment } from "./RoleAssignment";
import { Capability } from "./Capabilities";
import { ManagerAssignment } from "./ManagerAssignment";

export interface LevelAssignment {
  id: number;
  level: Level;
}

export interface Role {
  id: number;

  role_type?: RoleType;

  level_assignments?: LevelAssignment[];
  role_assignments?: RoleAssignment[];
  manager_assignments?: ManagerAssignment[];

  start_date: string;
  end_date?: string;

  active_level_assignment: LevelAssignment;
  active_role_assignment?: RoleAssignment;
  active_manager_assignment?: ManagerAssignment

  capabilities: Capability[];
}

export interface MutateRole {
  role_type_id: number;
  level_id: number;
  start_date?: string;
  end_date?: string;
}

export interface UseRoleProps extends UseCRUDOptionalProps {
  parentUnitId?: number;
}

export function useRole(props: UseRoleProps = {}) {
  let path = `/api/org/roles`;
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
    path,
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
