import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export interface Title {
  id: number;
  name: string;
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateTitle {
  name: string;
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
