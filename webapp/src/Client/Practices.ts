import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { Practice } from "./Practice";

export function usePractices() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [practices, setPractices] = useState<Practice[]>([]);

  const { getAll } = useCRUD<Practice, undefined>({
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

  useEffect(() => {
    load();
  }, []);

  return { loading, practices, error };
}
