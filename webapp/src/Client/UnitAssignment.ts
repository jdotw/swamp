import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export interface UnitAssignment {
  id: number;
  function_type_id: number;
  unit_id: number;
  start_date: string;
  end_date?: string;
}

export interface MutateUnitAssignment {
  function_type_id: number;
  unit_id: number;
  start_date: string;
  end_date?: string;
}

export interface UseUnitAssignmentProps extends UseCRUDOptionalProps {
  roleId?: number;
}

const defaultProps: UseUnitAssignmentProps = { loadOnMount: false };

export function useUnitAssignment(props?: UseUnitAssignmentProps) {
  props = { ...defaultProps, ...props };
  const path = `/api/org/roles/${props?.roleId}/unit_assignments`;

  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<UnitAssignment, MutateUnitAssignment>({
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
