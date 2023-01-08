import { useEffect, useState } from "react";
import ChapterHome from "../Capability/Chapters/ChapterHome";
import { useCRUD, UseCRUDOptionalProps } from "../CRUD/CRUD";
import { Chapter } from "./Chapter";
import { Individual } from "./Individual";
import { Practice } from "./Practice";
import { PracticeRoleType } from "./PracticeRoleTypes";

export type PracticeRole = {
  id: string;

  individual_id: string;
  individual: Individual;

  practice_role_type_id: string;
  practice_role_type: PracticeRoleType;

  practice_id: string;
  practice: Practice;

  start_date: string;
  end_date?: string;
};

export type MutatePracticeRole = {
  practice_id: string;
  individual_id: string;
  practice_role_type_id: string;
};

export interface UsePracticeRoleProps extends UseCRUDOptionalProps {
  practiceId: string;
  id?: string;
}

export function usePracticeRole(props: UsePracticeRoleProps) {
  const { practiceId } = props || {};
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<PracticeRole, MutatePracticeRole>({
    path: `/api/capability/practices/${practiceId}/roles`,
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
