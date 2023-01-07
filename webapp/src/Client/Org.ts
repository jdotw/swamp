import { useEffect, useState } from "react";
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
  loadOnMount: boolean;
}

export function useOrg({ loadOnMount = true }: UseOrgProps) {
  const [items, setItems] = useState<Org[]>([]);

  const [loading, setLoading] = useState(loadOnMount);
  const [error, setError] = useState<Error>();

  const {
    getAll,
    retrieveItem: crudRetrieveItem,
    createItem: crudCreateItem,
    updateItem: crudUpdateItem,
    deleteItem: crudDeleteItem,
  } = useCRUD<Org, MutateOrg>({
    path: "/api/people/orgs",
  });

  const reload = async () => {
    setLoading(true);
    try {
      const result = await getAll();
      if (result) {
        setItems(result);
      }
      setError(undefined);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (newOrg: MutateOrg) => {
    const createdOrg = await crudCreateItem(newOrg);
    setItems([...items, createdOrg]);
  };

  const retrieveItem = async (id: string) => {
    const result = await crudRetrieveItem(id);
    let index = items.findIndex((org) => org.id === id);
    if (index >= 0) {
      items[index] = { ...items[index], ...result };
    } else {
      setItems([...items, result]);
    }
  };

  const updateItem = async (id: string, updatedOrg: MutateOrg) => {
    const didUpdate = await crudUpdateItem(id, updatedOrg);
    if (didUpdate) {
      let index = items.findIndex((org) => org.id === id);
      if (index >= 0) {
        items[index] = { ...items[index], ...updatedOrg };
      }
    }
  };

  const deleteItem = async (id: string) => {
    const didDelete = await crudDeleteItem(id);
    if (didDelete) {
      setItems(items.filter((org) => org.id !== id));
    }
  };

  useEffect(() => {
    (async () => {
      if (loadOnMount) await reload();
    })();
  }, []);

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
