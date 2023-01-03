import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { Individual } from "./Individual";
import { Squad } from "./Squad";
import { TribeRoleType } from "./TribeRoleTypes";

export type Tribe = {
  id: string;
  name: string;
  squads: Squad[];
  roles: TribeRole[];
};

export type TribeRole = {
  id: string;
  individual_id: string;
  tribe_role_type: TribeRoleType;
  tribe_id: string;
  individual: Individual;
};

export type NewSquad = {
  name: string;
};

export type NewTribe = {
  name: string;
};

export type NewTribeRole = {
  tribe_id: string;
  individual_id: string;
  tribe_role_type_id: string;
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

  const [roles, setRoles] = useState<TribeRole[]>([]);
  const { getAll: getRoles, createItem: addRoleItem } = useCRUD<
    TribeRole,
    NewTribeRole
  >({
    path: `/api/delivery/tribes/${id}/roles`,
  });

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

  const loadRoles = async () => {
    const roles = await getRoles();
    setRoles(roles);
  };

  const addRole = async (newRole: NewTribeRole) => {
    const role = await addRoleItem(newRole);
    setRoles([...roles, role]);
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
      loadRoles();
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
    roles,
    addRole,
  };
}
