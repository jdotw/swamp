import { useState } from "react";
import { useCRUD } from "../CRUD/CRUD";

export type Org = {
  id: string;
  name: string;
  parent_id: string;
};

export type MutateOrg = {
  name: string;
  parent_id: string;
};

export interface UseOrgProps {
  id?: string;
}

export function useOrg({ id }: UseOrgProps) {
  const [org, setOrg] = useState<Org>(); // If id is specified, this will be loaded
  const [allOrgs, setAllOrgs] = useState<Org[]>([]); // If id is not specified, this will be loaded
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(undefined);
  const [creating, setCreating] = useState(false);
  const [creatingError, setCreatingError] = useState(undefined);
  const [deleting, setDeleting] = useState(false);
  const [deletingError, setDeletingError] = useState(undefined);

  const { getAll, retrieveItem, updateItem, createItem } = useCRUD<
    Org,
    MutateOrg
  >({
    path: id ? `/api/people/orgs/${id}` : "/api/people/orgs",
  });

  const load = async () => {
    console.log("Loading orgs");
    try {
      id ? setOrg(await retrieveItem(id)) : setAllOrgs(await getAll());
      setError(undefined);
    } catch (error: any) {
      setOrg(undefined);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, updatedOrg: MutateOrg) => {
    setUpdating(true);
    try {
      const didUpdate = await updateItem(id, updatedOrg);
      if (didUpdate) {
        setOrg({
          ...org!,
          name: updatedOrg.name,
          external_id: updatedOrg.external_id,
        });
      }
    } catch (error: any) {
      setUpdateError(error);
    } finally {
      setUpdating(false);
    }
  };

  const create = async (newOrg: MutateOrg) => {
    setCreating(true);
    try {
      const newOrg = await createItem(newOrg);
      setOrg(newOrg);
    } catch (error: any) {
      setCreatingError(error);
    } finally {
      setCreating(false);
    }
  };

  return {
    org,
    allOrgs,
    load,
    loading,
    error,
    update,
    updating,
    updateError,
    create,
    creating,
    creatingError,
  };
}
