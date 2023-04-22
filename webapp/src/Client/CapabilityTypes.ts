import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Role } from "./Role";
import { RoleType } from "./RoleType";

export interface CapabilityType {
  id: number;
  name: string;
  parent_id?: number;
  role_type_id?: number;
  role_type?: RoleType;
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateCapabilityType {
  name: string;
  parent_id?: number;
  role_type_id?: number;
  retired_at_date?: string;
}

export interface UseCapabilityTypeProps extends UseCRUDOptionalProps {}

export function useCapabilityType(props?: UseCapabilityTypeProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<CapabilityType, MutateCapabilityType>({
    path: "/api/org/capabilitytypes",
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
