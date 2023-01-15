import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { NewTribe, Tribe } from "./Tribe";

export type TribeRoleType = {
  id: string;
  name: string;
};

export type NewTribeRoleType = {
  name: string;
};

export function useTribeRoleTypes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [roleTypes, setRoleTypes] = useState<TribeRoleType[]>([]);
  const [addError, setAddError] = useState(undefined);
  const [adding, setAdding] = useState(false);

  const { getAll, createItem } = useCRUD<TribeRoleType, NewTribeRoleType>({
    path: "/api/delivery/triberoletypes",
  });

  const addTribeRoleType = async (roleType: NewTribeRoleType) => {
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

  return { loading, roleTypes, addTribeRoleType, error, adding, addError };
}
