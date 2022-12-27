import { useEffect, useState } from "react";

export type Tribe = {
  id: string;
  name: string;
  lead_full_name: string;
};

export type NewTribe = {
  name: string;
};

interface UseTribeProps {
  id?: string;
}

export function useTribe({ id }: UseTribeProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);
  const [tribe, setTribe] = useState<Tribe>();

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

      const url = `/api/delivery/tribes/${id}`;

      const response = await fetch(url, {
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });

      const response_json = await response.json();
      setTribe(response_json);
      setError(undefined);
      setLoading(false);
    } catch (error: any) {
      setTribe(undefined);
      setError(error);
      setLoading(false);
    }
  };

  const update = async (updatedTribe: Tribe) => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/people/tribes/${id}`;

      setUpdating(true);
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatedTribe),
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${accessToken}`,
        },
      });
      setTribe(updatedTribe);
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

  return { loading, tribe, error, update, updating, updateError };
}
