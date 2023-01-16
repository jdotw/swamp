import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";
import { Role } from "./Role";

export interface Person {
  id: string;
  external_id: string;
  first_name: string;
  middle_names?: string;
  last_name: string;
  roles?: Role[];
}

export interface MutatePerson {
  external_id: string;
  first_name: string;
  middle_names?: string;
  last_name: string;
}

export interface UsePersonProps extends UseCRUDOptionalProps {}

export function usePerson(props: UsePersonProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Person, MutatePerson>({
    path: "/api/org/persons",
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
