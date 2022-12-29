import { useEffect, useState } from "react";

interface UseCRUDProps {
  domain: string;
  path: string;
}

const config = {
  domain: "localhost:8000",
};

export function useCRUD<ItemType, ChildItemType>({
  domain,
  path,
}: UseCRUDProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const [item, setItem] = useState<ItemType>();

  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(undefined);

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(undefined);

  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState(undefined);

  const url = `http://${domain}/${path}`;

  const authHeaders = async () => {
    // const accessToken = await getAccessTokenSilently({
    //   audience: `http://${domain}/`,
    //   scope: "read:category",
    // });
    // console.log("TOKEN: ", accessToken);
    const accessToken = `TOKEN-${domain}`;
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  };

  const retrieveItem = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          ...(await authHeaders()),
        },
      });
      const response_json = await response.json();
      setItem(response_json);
      setError(undefined);
    } catch (error: any) {
      setItem(undefined);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (updatedItem: ItemType) => {
    try {
      setUpdating(true);
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(updatedItem),
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders()),
        },
      });
      setItem(updatedItem);
      setUpdateError(undefined);
    } catch (error: any) {
      setUpdateError(error);
    } finally {
      setUpdating(false);
    }
  };

  const createItem = async (childItem: ChildItemType) => {
    try {
      setCreating(true);
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(childItem),
        headers: {
          "Content-Type": "application/json",
          ...(await authHeaders()),
        },
      });
      const response_json: ChildItemType = await response.json();
      const updatedItem: Item = {
        ...item!,
        squads: [...item!.squads, response_json],
      };
      setItem(updatedItem);
      setCreateError(undefined);
    } catch (error: any) {
      setCreateError(error);
    } finally {
      setCreating(false);
    }
  };

  const deleteItem = async () => {
    try {
      setDeleting(true);
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          ...(await authHeaders()),
        },
      });
      await response.json();
      setDeleteError(undefined);
    } catch (error: any) {
      setDeleteError(error);
    } finally {
      setDeleting(false);
    }
  };

  return {
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
    loading,
    item,
    error,
    updating,
    updateError,
    creating,
    createError,
  };
}
