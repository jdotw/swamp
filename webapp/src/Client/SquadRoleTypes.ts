import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";

export type SquadRoleType = {
  id: number;
  name: string;
};

export type NewSquadRoleType = {
  name: string;
};

export function useSquadRoleTypes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [roleTypes, setRoleTypes] = useState<SquadRoleType[]>([]);
  const [addError, setAddError] = useState(undefined);
  const [adding, setAdding] = useState(false);

  const { getAll, createItem } = useCRUD<SquadRoleType, NewSquadRoleType>({
    path: "/api/delivery/squadroletypes",
  });

  const addSquadRoleType = async (roleType: NewSquadRoleType) => {
    setAdding(true);
    try {
      const newRoleType = await createItem(roleType);
      setRoleTypes([...roleTypes, newRoleType]);
    } catch (error: any) {
      setAddError(error);
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const roleTypes = await getAll();
        setRoleTypes(roleTypes);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { loading, roleTypes, addSquadRoleType, error, adding, addError };
}
