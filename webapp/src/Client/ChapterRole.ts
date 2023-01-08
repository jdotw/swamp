import { useEffect, useState } from "react";
import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";
import { ChapterRoleType } from "./ChapterRoleType";
import { Individual } from "./Individual";

export type Chapter = {
  id: string;
  name: string;
};

export type MutateChapter = {
  name: string;
};

export type ChapterRole = {
  id: string;
  individual_id: string;
  individual: Individual;
  chapter_id: string;
  chapter: Chapter;
  chapter_role_type_id: string;
  chapter_role_type: ChapterRoleType;
  start_date: string;
  end_date?: string;
};

export type MutateChapterRole = {
  practice_id: string;
  chapter_id: string;
  individual_id: string;
  chapter_role_type_id: string;
};

export interface UseChapterRoleProps extends UseCRUDOptionalProps {
  id?: string;
}

export function useChapterRole(props: UseChapterRoleProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<ChapterRole, MutateChapterRole>({
    path: `/api/capability/chapterroles`,
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
