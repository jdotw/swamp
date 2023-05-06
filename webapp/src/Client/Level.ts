import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Title } from "./Title";

export interface Level {
  id: number;
  index: number;
  name: string;
  external_id: string;
  parent_id?: number;
  titles: Title[];
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateLevel {
  index: number;
  name: string;
  external_id: string;
  parent_id?: number;
  retired_at_date?: string;
}

export interface UseLevelProps extends UseCRUDOptionalProps { }

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
