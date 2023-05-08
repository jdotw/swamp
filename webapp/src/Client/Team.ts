import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

export interface Team {
  id: number;
  name: string;
  description?: string;
  type: string;
  formed_at_date: string;
  disbanded_at_date?: string;
  parent_id?: number;
  parent?: Team;
  children: Team[];
}

export interface MutateTeam {
  name: string;
  description?: string;
  type: string;
  parent_id?: number;
  formed_at_date: string;
  disbanded_at_date?: string;
}

export interface UseTeamProps extends UseCRUDOptionalProps {
  type?: "home" | "delivery";
}

export function useTeam(props?: UseTeamProps) {
  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Team, MutateTeam>({
    path: "/api/org/teams",
    ...props,
  });

  const filteredTeams = props?.type
    ? items.filter((team) => team.type === props?.type)
    : items;

  return {
    items: filteredTeams,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  };
}
