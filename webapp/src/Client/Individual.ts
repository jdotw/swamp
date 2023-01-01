import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";

export type Individual = {
  id: string;
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

  const { retrieveItem, updateItem } = useCRUD<Individual, undefined>({
    path: "/api/people/individuals",
    domain: "localhost:5173",
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

  const update = async (updatedIndividual: Individual) => {
    setUpdating(true);
    try {
      const didUpdate = await updateItem(
        updatedIndividual.id,
        updatedIndividual
      );
      if (didUpdate) {
        setIndividual(updatedIndividual);
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
