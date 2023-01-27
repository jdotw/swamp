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
  end_date?: string;
}

export interface UseRoleAssignmentProps extends UseCRUDOptionalProps {
  personId: number;
}

export function useRoleAssignment(props?: UseRoleAssignmentProps) {
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
    path: `/api/org/persons/${props?.personId}/role_assignments`,
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
