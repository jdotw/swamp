import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { RoleType } from "./RoleType";
import { Level } from "./Level";
import { RoleAssignment } from "./RoleAssignment";
import { ManagerAssignment } from "./ManagerAssignment";
import { Title } from "./Title";
import { Capability } from "./Capability";

export interface LevelAssignment {
  id: number;
  level: Level;
}

export interface TitleAssignment {
  id: number;
  title: Title;
  role: Role;
}

export interface Role {
  id: number;

  role_type?: RoleType;

  level_assignments?: LevelAssignment[];
  role_assignments?: RoleAssignment[];
  manager_assignments?: ManagerAssignment[];
  title_assignments?: TitleAssignment[];

  start_date: string;
  end_date?: string;

  active_level_assignment: LevelAssignment;
  active_role_assignment?: RoleAssignment;
  active_manager_assignment?: ManagerAssignment;
  active_title_assignment?: TitleAssignment;

  capabilities: Capability[];
}

export interface MutateRole {
  role_type_id: number;
  level_id: number;
  title_id: number;
  start_date?: string;
  end_date?: string;
}

export interface UseRoleProps extends UseCRUDOptionalProps {
  parentUnitId?: number;
}

export function useRole(props: UseRoleProps = {}) {
  const path = `/api/org/roles`;
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
