import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";
import { Individual } from "./Individual";
import { SquadRoleType } from "./SquadRoleTypes";

export type Squad = {
  id: string;
  name: string;
};

export type SquadRole = {
  id: string;
  individual_id: string;
  individual: Individual;
  squad_id: string;
  squad: Squad;
  squad_role_type_id: string;
  squad_role_type: SquadRoleType;
  start_date: string;
  end_date?: string;
};

export type NewSquadRole = {
  tribe_id: string;
  squad_id: string;
  individual_id: string;
  squad_role_type_id: string;
};

export interface UseSquadProps {
  tribeId?: string;
  id?: string;
}

export function useSquad({ tribeId, id }: UseSquadProps) {
  const [squad, setSquad] = useState<Squad>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const [roles, setRoles] = useState<SquadRole[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [loadingRolesError, setLoadingRolesError] = useState(undefined);

  const { getAll: getAllRoleItems, createItem: createRoleItem } = useCRUD<
    SquadRole,
    NewSquadRole
  >({
    path: `/api/delivery/tribes/${tribeId}/squads/${id}/roles`,
  });

  const { retrieveItem } = useCRUD<Squad, undefined>({
    path: `/api/delivery/tribes/${tribeId}/squads`,
  });

  const load = async () => {
    try {
      const squad = await retrieveItem(id!);
      setSquad(squad);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    setLoadingRoles(true);
    try {
      const roles = await getAllRoleItems();
      setRoles(roles);
      setLoadingRolesError(undefined);
    } catch (error: any) {
      setLoadingRolesError(error);
    } finally {
      setLoadingRoles(false);
    }
  };

  const addRole = async (newRole: NewSquadRole) => {
    const role = await createRoleItem(newRole);
    setRoles([...roles, role]);
  };

  useEffect(() => {
    if (tribeId && id) {
      (async () => {
        await load();
        await loadRoles();
      })();
    }
  }, [tribeId, id]);

  return {
    squad,
    loading,
    error,
    roles,
    loadingRoles,
    loadingRolesError,
    addRole,
  };
}
