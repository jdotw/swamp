import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Chapter } from "./Chapter";
import { MutateUnit, Unit } from "./UnitInterface";

export interface Practice extends Unit {
  chapters?: Chapter[];
}

export interface MutatePractice extends MutateUnit {}

export interface UsePracticeProps extends UseCRUDOptionalProps {}

export function usePractice(props?: UsePracticeProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Practice, MutatePractice>({
    ...props,
    path: `/api/org/practices`,
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
