import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Squad } from "./Squad";
import { MutateUnit, Unit } from "./UnitInterface";

export interface Tribe extends Unit {
  type: "tribe";
  squads: Squad[];
}

export interface MutateTribe extends MutateUnit {}

interface UseTribeProps extends UseCRUDOptionalProps {}

export function useTribe(props: UseTribeProps) {
  const {
    loading,
    error,
    items,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Tribe, MutateTribe>({
    path: `/api/org/tribes`,
    ...props,
  });
  return {
    loading,
    items,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  };
}
