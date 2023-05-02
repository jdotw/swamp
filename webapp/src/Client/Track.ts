import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export interface Track {
  id: number;
  name: string;
  parent_id?: number;
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateTrack {
  name: string;
  parent_id?: number;
  retired_at_date?: string;
}

export interface UseTrackProps extends UseCRUDOptionalProps { }

export function useTrack(props?: UseTrackProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Track, MutateTrack>({
    path: "/api/org/tracks",
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
