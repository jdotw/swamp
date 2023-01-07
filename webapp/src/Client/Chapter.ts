import { filterProps } from "@mantine/core";
import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";

export type Chapter = {
  id: string;
  name: string;
};

export type MutateChapter = {
  name: string;
};

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
