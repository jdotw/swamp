import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Practice } from "./Practice";
import { MutateUnit, Unit } from "./UnitInterface";

export interface Chapter extends Unit {
  practice_id: string;
  practice?: Practice;
}

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
