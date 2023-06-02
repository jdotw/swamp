import { RouterInputs, RouterOutputs, trpc } from "@/Utils/trpc";
// import { useCRUD, UseCRUDOptionalProps } from "./CRUD/CRUD";

/*
 * TRPC Style
 */

export type DeploymentType = RouterOutputs["deploymentTypes"]["list"][number];
export type DeploymentTypeCreateInput =
  RouterInputs["deploymentTypes"]["create"];
export type DeploymentTypeUpdateInput =
  RouterInputs["deploymentTypes"]["update"]["deploymentType"];

export type MutateDeploymentType =
  | DeploymentTypeCreateInput
  | DeploymentTypeUpdateInput;

interface UseDeploymentTypeProps { }

export function useDeploymentType(props?: UseDeploymentTypeProps) {
  const list = trpc.deploymentTypes.list.useQuery();
  const create = trpc.deploymentTypes.create.useMutation();
  const update = trpc.deploymentTypes.update.useMutation();
  const remove = trpc.deploymentTypes.delete.useMutation();

  const createItem = async (item: DeploymentTypeCreateInput) => {
    await create.mutateAsync(item);
    list.refetch();
  };
  const retrieveItem = async (id: number) => {
    return await trpc.deploymentTypes.list.query({ id }).fetch();
  };
  const updateItem = async (id: number, item: DeploymentTypeUpdateInput) => {
    await update.mutateAsync({
      id,
      deploymentType: item,
    });
    list.refetch();
  };
  const deleteItem = async (id: number) => {
    await remove.mutateAsync(id);
    list.refetch();
  };

  return {
    items: list.data ?? [],
    loading:
      list.isLoading ||
      create.isLoading ||
      update.isLoading ||
      remove.isLoading,
    error: list.error ?? create.error ?? update.error ?? remove.error,
    reload: () => {
      list.refetch();
    },
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  };
}
/*
 * CRUD Style
 */

// interface CRUDDeploymentType {
//   id: number;
//   name: string;
//   parent_id?: number;
//   active_from_date: string;
//   retired_at_date?: string;
// }
//
// interface MutateCRUDDeploymentType {
//   name: string;
//   parent_id?: number;
//   retired_at_date?: string;
// }
//
// interface UseCRUDDeploymentTypeProps extends UseCRUDOptionalProps { }
//
// function useCRUDDeploymentType(props?: UseCRUDDeploymentTypeProps) {
//   const {
//     reload,
//     items,
//     loading,
//     error,
//     createItem,
//     retrieveItem,
//     updateItem,
//     deleteItem,
//   } = useCRUD<CRUDDeploymentType, MutateCRUDDeploymentType>({
//     path: "/api/org/deploymenttypes",
//     ...props,
//   });
//   return {
//     items,
//     loading,
//     error,
//     reload,
//     createItem,
//     retrieveItem,
//     updateItem,
//     deleteItem,
//   };
// }
