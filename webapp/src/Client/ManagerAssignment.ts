import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Role } from "./Role";

export interface ManagerAssignment {
  id: number;
  role_id: number;
  role: Role;
  manager_id: number;
  manager: Role;
  start_date: string;
  end_date: string;
}

export interface MutateManagerAssignment {
  role_id: number;
  manager_id: number;
  end_date?: string;
}

export interface UseManagerAssignmentProps extends UseCRUDOptionalProps {
  roleId?: number;
}

export function useManagerAssignment(props?: UseManagerAssignmentProps) {
  const basePath = "/api/org/managerassignments";
  const {
    reload,
    items,
    loading,
    error,
    createItem: crudCreateItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<ManagerAssignment, MutateManagerAssignment>({
    path: props?.roleId ? `${basePath}?role_id=${props.roleId}` : basePath,
    ...props,
  });

  const createItem = async (item: MutateManagerAssignment) => {
    await crudCreateItem(item);
    await reload();
  }

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
