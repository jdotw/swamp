import { CapabilityType } from "./CapabilityTypes";
import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Deployment } from "./Deployments";
import { HomeAssignment } from "./HomeAssignment";
import { RoleType } from "./RoleType";

export interface Capability {
  id: number;
  role_id: number;
  role: RoleType;
  capability_type_id: number;
  capability_type: CapabilityType;
  active_from_date: string;
  retired_at_date?: string;
  active_home_assignment?: HomeAssignment;
  active_deployment?: Deployment;
}

export interface MutateCapability {
  role_id: number;
  capability_type_id: number;
  active_from_date?: string;
  retired_at_date?: string;
}

export interface UseCapabilityProps extends UseCRUDOptionalProps {
  roleId?: number;
}

export function useCapability(props?: UseCapabilityProps) {
  const {
    reload,
    items,
    loading,
    error,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Capability, MutateCapability>({
    path: props?.roleId
      ? `/api/org/roles/${props!.roleId}/capabilities`
      : "/api/org/capabilities",
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
