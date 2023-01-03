import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";

export type Individual = {
  id: string;
  external_id: string;
  first_name: string;
  middle_names: string;
  last_name: string;
};

export type MutateIndividual = {
  external_id: string;
  first_name: string;
  middle_names: string;
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

  useEffect(() => {
    if (id) {
      load(id);
    }
  }, [id]);

  return { loading, individual, error, update, updating, updateError };
}
