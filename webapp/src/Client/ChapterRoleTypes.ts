import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";

export type ChapterRoleType = {
  id: number;
  name: string;
};

export type NewChapterRoleType = {
  name: string;
};

export function useChapterRoleTypes() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [roleTypes, setRoleTypes] = useState<ChapterRoleType[]>([]);
  const [addError, setAddError] = useState(undefined);
  const [adding, setAdding] = useState(false);

  const { getAll, createItem } = useCRUD<ChapterRoleType, NewChapterRoleType>({
    path: "/api/capability/chapterroletypes",
  });

  const addChapterRoleType = async (roleType: NewChapterRoleType) => {
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

  return { loading, roleTypes, addChapterRoleType, error, adding, addError };
}
