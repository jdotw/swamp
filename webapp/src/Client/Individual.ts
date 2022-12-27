import { useEffect, useState } from "react";

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

  const load = async () => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/people/individuals/${id}`;

      const response = await fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      const response_json = await response.json();
      setIndividual(response_json);
      setError(undefined);
    } catch (error: any) {
      setIndividual(undefined);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (updatedIndividual: Individual) => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/people/individuals/${id}`;

      setUpdating(true);
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatedIndividual),
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${accessToken}`,
        },
      });
      setIndividual(updatedIndividual);
      setUpdateError(undefined);
    } catch (error: any) {
      setUpdateError(error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  return { loading, individual, error, update, updating, updateError };
}
