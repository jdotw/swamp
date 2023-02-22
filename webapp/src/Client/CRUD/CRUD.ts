import { useEffect, useState } from "react";
import { e } from "vitest/dist/index-761e769b";
import { useBackend } from "./Backend";

export interface UseCRUDOptionalProps {
  id?: number;
  domain?: string;
  loadOnMount?: boolean;
}

export interface UseCRUDProps extends UseCRUDOptionalProps {
  path?: string; // If there's no path, the hook wont load anything
}

export interface TypeWithID {
  id: number;
}

export interface UseCRUDAdoptionInterface<
  ItemType extends TypeWithID,
  NewItemType
> {
  items: ItemType[];
  loading: boolean;
  error: any;
  reload: () => Promise<void>;
  createItem: (item: NewItemType) => Promise<ItemType>;
  retrieveItem: (id: number) => Promise<ItemType>;
  updateItem: (id: number, item: NewItemType) => Promise<boolean>;
  deleteItem: (id: number) => Promise<boolean>;
}

export interface UseCRUDInterface<ItemType extends TypeWithID, NewItemType>
  extends UseCRUDAdoptionInterface<ItemType, NewItemType> {
  urlForPath: (path: string) => string | undefined;
  authHeaders: () => Promise<Record<string, string>>;
}

export function useCRUD<ItemType extends TypeWithID, NewItemType>({
  id: filterById,
  domain,
  path,
  loadOnMount = true,
}: UseCRUDProps): UseCRUDInterface<ItemType, NewItemType> {
  const [items, setItems] = useState<ItemType[]>([]);

  const [loading, setLoading] = useState(loadOnMount);
  const [error, setError] = useState<any>();

  const { authHeaders, urlForPath } = useBackend({
    domain,
  });

  const url = urlForPath(path);

  const reload = async () => {
    if (!url) {
      throw new Error("No URL provided");
    }
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
    if (!url) {
      throw new Error("No URL provided");
    }
    const response = await fetch(url, {
      headers: {
        ...(await authHeaders()),
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      const response_json = (await response.json()) as ItemType[];
      return response_json;
    }
  };

  const createItem = async (newItem: NewItemType) => {
    if (!url) {
      throw new Error("No URL provided");
    }
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

  const retrieveItem = async (id: number) => {
    if (!url) {
      throw new Error("No URL provided");
    }
    const itemUrl = `${url}/${id}`;
    const response = await fetch(itemUrl, {
      headers: {
        ...(await authHeaders()),
      },
    });
    const item = (await response.json()) as ItemType;
    let updatedItems = [...items];
    let index = updatedItems.findIndex((item) => item.id === id);
    if (index >= 0) {
      updatedItems[index] = { ...updatedItems[index], ...item };
    } else {
      updatedItems.push(item);
    }
    setItems(updatedItems);

    return item;
  };

  const updateItem = async (id: number, updatedItem: NewItemType) => {
    if (!url) {
      throw new Error("No URL provided");
    }
    const itemUrl = `${url}/${id}`;
    const response = await fetch(itemUrl, {
      method: "PUT",
      body: JSON.stringify(updatedItem),
      headers: {
        "Content-Type": "application/json",
        ...(await authHeaders()),
      },
    });
    let updatedItems = [...items];
    let index = updatedItems.findIndex((item) => item.id === id);
    if (index >= 0) {
      updatedItems[index] = { ...items[index], ...updatedItem };
      setItems(updatedItems);
    }
    return response.status === 204;
  };

  const deleteItem = async (id: number) => {
    if (!url) {
      throw new Error("No URL provided");
    }
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
    if (loadOnMount && path) {
      (async () => await reload())();
    }
  }, [loadOnMount, path]);

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
