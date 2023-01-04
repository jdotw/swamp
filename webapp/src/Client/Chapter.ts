import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { ChapterRoleType } from "./ChapterRoleTypes";
import { Individual } from "./Individual";

export type Chapter = {
  id: string;
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

export type NewChapterRole = {
  practice_id: string;
  chapter_id: string;
  individual_id: string;
  chapter_role_type_id: string;
};

export interface UseChapterProps {
  practiceId?: string;
  id?: string;
}

export function useChapter({ practiceId, id }: UseChapterProps) {
  const [chapter, setChapter] = useState<Chapter>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const [roles, setRoles] = useState<ChapterRole[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingRolesError, setLoadingRolesError] = useState(undefined);

  const { getAll: getAllRoleItems, createItem: createRoleItem } = useCRUD<
    ChapterRole,
    NewChapterRole
  >({
    path: `/api/capability/practices/${practiceId}/chapters/${id}/roles`,
  });

  const { retrieveItem } = useCRUD<Chapter, undefined>({
    path: `/api/capability/practices/${practiceId}/chapters`,
  });

  const loadChapter = async () => {
    setLoading(true);
    try {
      const chapter = await retrieveItem(id!);
      setChapter(chapter);
      setError(undefined);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    setLoadingRoles(true);
    try {
      const roles = await getAllRoleItems();
      setRoles(roles);
      setLoadingRolesError(undefined);
    } catch (error: any) {
      setLoadingRolesError(error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const addRole = async (newRole: NewChapterRole) => {
    const role = await createRoleItem(newRole);
    setRoles([...roles, role]);
  };

  useEffect(() => {
    if (practiceId && id) {
      (async () => {
        await loadChapter();
        await loadRoles();
      })();
    }
  }, [practiceId, id]);

  return {
    chapter,
    loading,
    error,
    roles,
    loadingRoles,
    loadingRolesError,
    addRole,
  };
}
