import { Capability } from "./Capabilities";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Team } from "./Team";

export interface Deployment {
  id: number;
  capability_id: number;
  capability: Capability;
  team_id: number;
  team: Team;
}

export interface MutateDeployment {
  capability_id: number;
  team_id: number;
}

export interface UseDeploymentProps extends UseCRUDOptionalProps {}

export function useDeployment(props?: UseDeploymentProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Deployment, MutateDeployment>({
    path: "/api/org/deployments",
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
