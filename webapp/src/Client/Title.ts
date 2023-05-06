import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Level } from "./Level";
import { Track } from "./Track";

export interface Title {
  id: number;
  name: string;
  level_id: number;
  level: Level;
  track_id?: number;
  track?: Track;
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateTitle {
  name: string;
  level_id: number;
  track_id?: number;
  retired_at_date?: string;
}

export interface UseTitleProps extends UseCRUDOptionalProps { }

export function useTitle(props?: UseTitleProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Title, MutateTitle>({
    path: "/api/org/titles",
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
