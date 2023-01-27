import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Role } from "./Role";

export interface Level {
  id: number;
  index: number;
  external_id: string;
  individual_contributor_title: string;
  manager_title: string;
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateLevel {
  index: number;
  external_id: string;
  individual_contributor_title: string;
  manager_title: string;
  retired_at_date?: string;
}

export interface UseLevelProps extends UseCRUDOptionalProps {}

export function useLevel(props?: UseLevelProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Level, MutateLevel>({
    path: "/api/org/levels",
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
