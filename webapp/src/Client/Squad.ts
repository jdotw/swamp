import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { Individual } from "./Individual";

export type Squad = {
  id: string;
  name: string;
  lead_full_name: string;
};

export interface UseSquadProps {
  tribeId?: string;
  id?: string;
}

export function useSquad({ tribeId, id }: UseSquadProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [members, setMembers] = useState<Individual[]>([]);
  // const [addError, setAddError] = useState(undefined);
  // const [adding, setAdding] = useState(false);

  const { getAll: getMembers } = useCRUD<Individual, undefined>({
    path: `/api/delivery/tribes/${tribeId}/squads/${id}/members`,
  });

  // const addSquad = async (roleType: NewSquad) => {
  //   setAdding(true);
  //   try {
  //     const newRoleType = await createItem(roleType);
  //     setMembers([...members, newRoleType]);
  //   } catch (error: any) {
  //     setAddError(error);
  //   } finally {
  //     setAdding(false);
  //   }
  // };

  useEffect(() => {
    if (tribeId && id) {
      (async () => {
        try {
          const members = await getMembers();
          setMembers(members);
        } catch (error: any) {
          setError(error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [tribeId, id]);

  return { loading, members, error };
}
