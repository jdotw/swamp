import { useEffect, useState } from "react";
import ChapterHome from "../Capability/Chapters/ChapterHome";
import { useCRUD } from "../CRUD/CRUD";
import { Individual } from "./Individual";
import { PracticeRoleType } from "./PracticeRoleTypes";

export type Practice = {
  id: string;
  name: string;
  chapters: Chapter[];
};

export type NewPractice = {
  name: string;
};

export type Chapter = {
  id: string;
  name: string;
};

export type NewChapter = {
  name: string;
};

export type PracticeRole = {
  id: string;

  individual_id: string;
  individual: Individual;

  practice_role_type_id: string;
  practice_role_type: PracticeRoleType;

  practice_id: string;
  practice: Practice;
};

export type NewPracticeRole = {
  practice_id: string;
  individual_id: string;
  practice_role_type_id: string;
};

interface UsePracticeProps {
  id?: string;
}

export function usePractice({ id }: UsePracticeProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [practice, setPractice] = useState<Practice>();

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(undefined);

  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(undefined);

  const [loadingRoles, setLoadingRoles] = useState(true);
  const [roles, setRoles] = useState<PracticeRole[]>([]);
  const { getAll: getRoles, createItem: addRoleItem } = useCRUD<
    PracticeRole,
    NewPracticeRole
  >({
    path: `/api/capability/practices/${id}/roles`,
  });

  const { createItem } = useCRUD<Chapter, NewChapter>({
    path: `/api/capability/practices/${id}/chapters`,
  });

  const load = async () => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/capability/practices/${id}`;

      const response = await fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      const response_json = await response.json();
      setPractice(response_json);
      setError(undefined);
      setLoading(false);
    } catch (error: any) {
      setPractice(undefined);
      setError(error);
      setLoading(false);
    }
  };

  const update = async (updatedPractice: Practice) => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/people/practices/${id}`;

      setUpdating(true);
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatedPractice),
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${accessToken}`,
        },
      });
      setPractice(updatedPractice);
      setUpdating(false);
      setUpdateError(undefined);
    } catch (error: any) {
      setUpdating(false);
      setUpdateError(error);
    }
  };

  const addChapter = async (chapter: NewChapter) => {
    setAdding(true);
    try {
      const newChapter = await createItem(chapter);
      setPractice({
        ...practice!,
        chapters: [...practice!.chapters, newChapter],
      });
    } catch (error: any) {
      setAddError(error);
    } finally {
      setAdding(false);
    }
  };

  const loadRoles = async () => {
    const roles = await getRoles();
    setRoles(roles);
    setLoadingRoles(false);
  };

  const addRole = async (newRole: NewPracticeRole) => {
    const role = await addRoleItem(newRole);
    console.log("ADD ROLE: ", role);
    setRoles([...roles, role]);
  };

  useEffect(() => {
    if (id) {
      load();
      loadRoles();
    }
  }, [id]);

  return {
    loading,
    practice,
    error,
    update,
    updating,
    updateError,
    addChapter,
    addError,
    adding,
    loadingRoles,
    roles,
    addRole,
  };
}
