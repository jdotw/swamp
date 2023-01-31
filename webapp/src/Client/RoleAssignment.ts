import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Person } from "./Person";
import { Role } from "./Role";

export interface RoleAssignment {
  id: number;
  role_id: number;
  role: Role;
  person_id: number;
  person: Person;
  start_date: string;
  end_date?: string;
}

export interface MutateRoleAssignment {
  role_id: number;
  person_id: number;
  end_date?: string;
}

export interface UseRoleAssignmentProps extends UseCRUDOptionalProps {
  personId?: number;
  roleId?: number;
}

export function useRoleAssignment(props?: UseRoleAssignmentProps) {
  let path;
  if (props?.personId) {
    path = `/api/org/persons/${props?.personId}/role_assignments`;
  } else if (props?.roleId) {
    path = `/api/org/roles/${props?.roleId}/role_assignments`;
  } else {
    path = `/api/org/role_assignments`;
  }

  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<RoleAssignment, MutateRoleAssignment>({
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
