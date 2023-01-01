import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { NewPractice, Practice } from "./Practice";

export function usePractices() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [practices, setPractices] = useState<Practice[]>([]);

  const { getAll, createItem } = useCRUD<Practice, NewPractice>({
    domain: "localhost:5173",
    path: "/api/capability/practices",
  });

  const load = async () => {
    try {
      const practices = await getAll();
      console.log("PRACTICES: ", practices);
      setPractices(practices);
    } catch (error: any) {
      console.log("ERROR: ", error);
      setPractices([]);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const add = async (newPractice: NewPractice) => {
    try {
      const practice = await createItem(newPractice);
      console.log("PRACTICE: ", practice);
      setPractices([...practices, practice]);
    } catch (error: any) {
      console.log("ERROR: ", error);
      setError(error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return { loading, practices, error, add };
}
