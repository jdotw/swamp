import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";

export type ChapterRoleType = {
  id: string;
  name: string;
};

export type MutateChapterRoleType = {
  name: string;
};

export interface UseChapterRoleTypeProps extends UseCRUDOptionalProps {}

export function useChapterRoleType(props?: UseChapterRoleTypeProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<ChapterRoleType, MutateChapterRoleType>({
    ...props,
    path: "/api/capability/chapterroletypes",
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
