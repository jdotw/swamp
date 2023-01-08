import { useEffect, useState } from "react";
import ChapterHome from "../Capability/Chapters/ChapterHome";
import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Individual } from "./Individual";
import { PracticeRoleType } from "./PracticeRoleTypes";

export type Practice = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type MutatePractice = {
  name: string;
};

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
    path: `/api/capability/practices`,
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
