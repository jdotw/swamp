import { useEffect, useState } from "react";
import { Squad } from "./Squad";

export type Tribe = {
  id: string;
  name: string;
  lead_full_name: string;
  squads: Squad[];
};

export type NewSquad = {
  name: string;
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

  const [addingSquad, setAddingSquad] = useState(false);
  const [addSquadError, setAddSquadError] = useState(undefined);

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
    } catch (error: any) {
      setTribe(undefined);
      setError(error);
    } finally {
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
      setUpdateError(undefined);
    } catch (error: any) {
      setUpdateError(error);
    } finally {
      setUpdating(false);
    }
  };

  const addSquad = async (newSquad: NewSquad) => {
    const domain = "localhost:8080";
    try {
      // const accessToken = await getAccessTokenSilently({
      //   audience: `http://${domain}/`,
      //   scope: "read:category",
      // });
      // console.log("TOKEN: ", accessToken);

      const url = `/api/delivery/tribes/${id}/squads`;

      setAddingSquad(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newSquad),
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `Bearer ${accessToken}`,
        },
      });
      const response_json: Squad = await response.json();
      const updatedTribe: Tribe = {
        ...tribe!,
        squads: [...tribe!.squads, response_json],
      };
      setTribe(updatedTribe);
      setAddSquadError(undefined);
    } catch (error: any) {
      setAddingSquad(false);
      setAddSquadError(error);
    } finally {
      setAddingSquad(false);
    }
  };

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  return {
    loading,
    tribe,
    error,
    update,
    updating,
    updateError,
    addSquad,
    addingSquad,
    addSquadError,
  };
}
