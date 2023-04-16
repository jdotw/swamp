import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Role } from "./Role";

export interface DeploymentType {
  id: number;
  name: string;
  parent_id?: number;
  active_from_date: string;
  retired_at_date?: string;
}

export interface MutateDeploymentType {
  name: string;
  parent_id?: number;
  retired_at_date?: string;
}

export interface UseDeploymentTypeProps extends UseCRUDOptionalProps {}

export function useDeploymentType(props?: UseDeploymentTypeProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<DeploymentType, MutateDeploymentType>({
    path: "/api/org/deploymenttypes",
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
