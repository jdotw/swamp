import { useEffect, useState } from "react";

export type Practice = {
  id: string;
  name: string;
  lead_full_name: string;
};

export type NewPractice = {
  name: string;
};

export type NewChapter = {
  name: string;
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

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  return { loading, practice, error, update, updating, updateError };
}
