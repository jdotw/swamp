import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";
import { Tribe } from "./Tribe";
import { MutateUnit, Unit } from "./UnitInterface";

export interface Squad extends Unit {
  tribe_id: number;
  tribe: Tribe;
}

export interface MutateSquad extends MutateUnit {}

export interface UseSquadProps extends UseCRUDOptionalProps {
  tribeId?: number;
}

export function useSquad(props: UseSquadProps) {
  const { tribeId } = props;
  const {
    loading,
    error,
    items,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Squad, MutateSquad>({
    path: `/api/org/tribes/${tribeId}/squads`,
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
