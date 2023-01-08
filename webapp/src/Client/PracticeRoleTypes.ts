import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { NewPractice, Practice } from "./Practice";

export type PracticeRoleType = {
  id: string;
  name: string;
};

export type NewPracticeRoleType = {
  name: string;
};

export function usePracticeRoleTypes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [roleTypes, setRoleTypes] = useState<PracticeRoleType[]>([]);
  const [addError, setAddError] = useState(undefined);
  const [adding, setAdding] = useState(false);

  const { getAll, createItem } = useCRUD<PracticeRoleType, NewPracticeRoleType>(
    {
      path: "/api/capability/practiceroletypes",
    }
  );

  const addPracticeRoleType = async (roleType: NewPracticeRoleType) => {
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

  return { loading, roleTypes, addPracticeRoleType, error, adding, addError };
}
