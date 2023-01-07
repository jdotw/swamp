import { useEffect, useState } from "react";
import { e } from "vitest/dist/index-761e769b";
import { useCRUD } from "../CRUD/CRUD";
import { ChapterRole } from "./Chapter";
import { PracticeRole } from "./Practice";
import { SquadRole } from "./Squad";
import { TribeRole } from "./Tribe";

export type Individual = {
  id: string;
  external_id: string;
  first_name: string;
  middle_names?: string;
  last_name: string;
  tribe_roles: TribeRole[];
  squad_roles: SquadRole[];
  practice_roles: PracticeRole[];
  chapter_roles: ChapterRole[];
};

export type MutateIndividual = {
  external_id: string;
  first_name: string;
  middle_names?: string;
  last_name: string;
};

export interface UseIndividualProps {
  loadOnMount?: boolean;
  id?: string;
}

export function useIndividual(props?: UseIndividualProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Individual, MutateIndividual>({
    path: "/api/people/individuals",
    loadOnMount: props?.id ? false : props?.loadOnMount,
  });

  const { id } = props || { id: undefined };

  const {
    items: tribeRoles,
    loading: tribeRolesLoading,
    error: tribeRolesError,
    reload: reloadTribeRoles,
  } = useCRUD<TribeRole, undefined>({
    path: `/api/delivery/individuals/${id}/triberoles`,
  });

  const {
    items: squadRoles,
    loading: squadRolesLoading,
    error: squadRolesError,
    reload: reloadSquadRoles,
  } = useCRUD<SquadRole, undefined>({
    path: `/api/delivery/individuals/${id}/squadroles`,
  });

  const {
    items: practiceRoles,
    loading: practiceRolesLoading,
    error: practiceRolesError,
    reload: reloadPracticeRoles,
  } = useCRUD<PracticeRole, undefined>({
    path: `/api/delivery/individuals/${id}/practiceroles`,
  });

  const {
    items: chapterRoles,
    loading: chapterRolesLoading,
    error: chapterRolesError,
    reload: reloadChapterRoles,
  } = useCRUD<ChapterRole, undefined>({
    path: `/api/delivery/individuals/${id}/chapterroles`,
  });

  const reloadRoles = async () => {
    await reloadTribeRoles();
    await reloadSquadRoles();
    await reloadPracticeRoles();
    await reloadChapterRoles();
  };

  useEffect(() => {
    const individualId = id;
    if (individualId) {
      (async () => {
        const result = await retrieveItem(individualId);
        await reloadRoles();
      })();
    }
  }, [id]);

  const [loadingRoles, setLoadingRoles] = useState(false);
  useEffect(() => {
    setLoadingRoles(
      tribeRolesLoading ||
        squadRolesLoading ||
        practiceRolesLoading ||
        chapterRolesLoading
    );
  }, [
    tribeRolesLoading,
    squadRolesLoading,
    practiceRolesLoading,
    chapterRolesLoading,
  ]);

  const [loadingRolesError, setLoadingRolesError] = useState<any>();
  useEffect(() => {
    setLoadingRolesError(
      tribeRolesError ||
        squadRolesError ||
        practiceRolesError ||
        chapterRolesError
    );
  }, [tribeRolesError, squadRolesError, practiceRolesError, chapterRolesError]);

  return {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
    reloadRoles,
    loadingRoles,
    loadingRolesError,
    tribeRoles,
    squadRoles,
    practiceRoles,
    chapterRoles,
  };
}
