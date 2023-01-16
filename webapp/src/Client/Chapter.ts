import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";
import { MutateUnit, Unit } from "./UnitInterface";

export interface Chapter extends Unit {}

export interface MutateChapter extends MutateUnit {}

export interface UseChapterProps extends UseCRUDOptionalProps {
  practiceId: string;
}

export function useChapter(props: UseChapterProps) {
  const { practiceId } = props;
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Chapter, MutateChapter>({
    ...props,
    path: `/api/capability/practices/${practiceId}/chapters`,
  });

  return {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  };
}
