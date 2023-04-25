import { Capability } from "./Capabilities";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Team } from "./Team";

export interface HomeAssignment {
  id: number;
  capability_id: number;
  capability: Capability;
  team_id: number;
  team: Team;
}

export interface MutateHomeAssignment {
  capability_id: number;
  team_id: number;
}

export interface UseHomeAssignmentProps extends UseCRUDOptionalProps { }

export function useHomeAssignment(props?: UseHomeAssignmentProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<HomeAssignment, MutateHomeAssignment>({
    path: "/api/org/homeassignments",
    ...props,
  });
  return {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  };
}
