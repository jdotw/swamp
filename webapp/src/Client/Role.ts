import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { RoleType } from "./RoleType";
import { RoleAssignment } from "./RoleAssignment";
import { ManagerAssignment } from "./ManagerAssignment";
import { Title } from "./Title";
import { Capability } from "./Capability";

export interface TitleAssignment {
  id: number;
  title: Title;
  role: Role;
}

export interface Role {
  id: number;

  role_type?: RoleType;

  role_assignments?: RoleAssignment[];
  manager_assignments?: ManagerAssignment[];
  title_assignments: TitleAssignment[];

  start_date: string;
  end_date?: string;

  active_role_assignment?: RoleAssignment;
  active_manager_assignment?: ManagerAssignment;
  active_title_assignment: TitleAssignment;

  capabilities: Capability[];
}

export interface MutateRole {
  role_type_id: number;
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
