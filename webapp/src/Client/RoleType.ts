import { CapabilityType } from "./CapabilityTypes";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export interface RoleType {
  id: number;
  name: string;
  active_from_date: string;
  retired_at_date?: string;
  parent_id?: number;
  parent?: RoleType;
  children: RoleType[];
  capability_types: CapabilityType[];
}

export interface MutateRoleType {
  name: string;
  retired_at_date?: string;
  parent_id?: number;
}

export interface UseRoleTypeProps extends UseCRUDOptionalProps { }

export function useRoleType(props?: UseRoleTypeProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<RoleType, MutateRoleType>({
    path: "/api/org/roletypes",
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
