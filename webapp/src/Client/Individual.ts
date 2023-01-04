import { useEffect, useState } from "react";
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

interface UseIndividualProps {
  id?: string;
}

export function useIndividual({ id }: UseIndividualProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [individual, setIndividual] = useState<Individual>();

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(undefined);

  const [adding, setAdding] = useState(false);
  const [addingError, setAddingError] = useState(undefined);

  const { retrieveItem, updateItem, createItem } = useCRUD<
    Individual,
    MutateIndividual
  >({
    path: "/api/people/individuals",
  });

  const load = async (id: string) => {
    try {
      setIndividual(await retrieveItem(id));
      setError(undefined);
    } catch (error: any) {
      setIndividual(undefined);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, updatedIndividual: MutateIndividual) => {
    setUpdating(true);
    try {
      const didUpdate = await updateItem(id, updatedIndividual);
      if (didUpdate) {
        setIndividual({
          ...individual!,
          first_name: updatedIndividual.first_name,
          middle_names: updatedIndividual.middle_names,
          last_name: updatedIndividual.last_name,
        });
      }
    } catch (error: any) {
      setUpdateError(error);
    } finally {
      setUpdating(false);
    }
  };

  const { getAll: getTribeRoleItems } = useCRUD<TribeRole, undefined>({
    path: `/api/delivery/individuals/${id}/triberoles`,
  });

  const [tribeRoles, setTribeRoles] = useState<TribeRole[]>([]);

  const getTribeRoles = async () => {
    const result = await getTribeRoleItems();
    setTribeRoles(result);
  };

  const { getAll: getSquadRoleItems } = useCRUD<SquadRole, undefined>({
    path: `/api/delivery/individuals/${id}/squadroles`,
  });

  const [squadRoles, setSquadRoles] = useState<SquadRole[]>([]);

  const getSquadRoles = async () => {
    const result = await getSquadRoleItems();
    setSquadRoles(result);
  };

  const { getAll: getPracticeRoleItems } = useCRUD<PracticeRole, undefined>({
    path: `/api/delivery/individuals/${id}/practiceroles`,
  });

  const [practiceRoles, setPracticeRoles] = useState<PracticeRole[]>([]);

  const getPracticeRoles = async () => {
    const result = await getPracticeRoleItems();
    setPracticeRoles(result);
  };

  const { getAll: getChapterRoleItems } = useCRUD<ChapterRole, undefined>({
    path: `/api/delivery/individuals/${id}/chapterroles`,
  });

  const [chapterRoles, setChapterRoles] = useState<ChapterRole[]>([]);

  const getChapterRoles = async () => {
    const result = await getChapterRoleItems();
    setChapterRoles(result);
  };

  useEffect(() => {
    if (id) {
      load(id);
    }
  }, [id]);

  return {
    loading,
    individual,
    error,
    update,
    updating,
    updateError,
    tribeRoles,
    getTribeRoles,
    squadRoles,
    getSquadRoles,
    practiceRoles,
    getPracticeRoles,
    chapterRoles,
    getChapterRoles,
  };
}
