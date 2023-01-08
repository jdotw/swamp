import { useEffect, useState } from "react";
import { e } from "vitest/dist/index-761e769b";
import { useBackend } from "./Backend";

export interface UseCRUDOptionalProps {
  id?: string;
  domain?: string;
  loadOnMount?: boolean;
}

export interface UseCRUDProps extends UseCRUDOptionalProps {
  path: string;
}

interface TypeWithID {
  id: string;
}

export function useCRUD<ItemType extends TypeWithID, NewItemType>({
  id: filterById,
  domain,
  path,
  loadOnMount = true,
}: UseCRUDProps) {
  const [items, setItems] = useState<ItemType[]>([]);

  const [loading, setLoading] = useState(loadOnMount);
  const [error, setError] = useState<any>();

  const { authHeaders, urlForPath } = useBackend({
    domain,
  });
  const url = urlForPath(path);

  const reload = async () => {
    setLoading(true);
    try {
      const result = filterById
        ? [await retrieveItem(filterById)]
        : await getAll();
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

  const getAll = async (): Promise<ItemType[]> => {
    const response = await fetch(url, {
      headers: {
        ...(await authHeaders()),
      },
    });
    const response_json = (await response.json()) as ItemType[];
    return response_json;
  };

  const createItem = async (newItem: NewItemType) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json",
        ...(await authHeaders()),
      },
    });
    const createdItem = (await response.json()) as ItemType;
    setItems([...items, createdItem]);
    return createdItem;
  };

  const retrieveItem = async (id: string) => {
    const itemUrl = `${url}/${id}`;
    const response = await fetch(itemUrl, {
      headers: {
        ...(await authHeaders()),
      },
    });
    const item = (await response.json()) as ItemType;
    let index = items.findIndex((item) => item.id === id);
    if (index >= 0) {
      items[index] = { ...items[index], ...item };
    } else {
      setItems([...items, item]);
    }
    return item;
  };

  const updateItem = async (id: string, updatedItem: NewItemType) => {
    const itemUrl = `${url}/${id}`;
    const response = await fetch(itemUrl, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
      headers: {
        "Content-Type": "application/json",
        ...(await authHeaders()),
      },
    });
    let index = items.findIndex((item) => item.id === id);
    if (index >= 0) {
      items[index] = { ...items[index], ...updatedItem };
    }
    return response.status === 204;
  };

  const deleteItem = async (id: string) => {
    const itemUrl = `${url}/${id}`;
    const response = await fetch(itemUrl, {
      method: "DELETE",
      headers: {
        ...(await authHeaders()),
      },
    });
    setItems(items.filter((item) => item.id !== id));
    return response.status === 204;
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
    urlForPath,
    authHeaders,
  };
}
