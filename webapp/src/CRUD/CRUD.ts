import { useEffect, useState } from "react";
import { useBackend } from "./Backend";

interface UseCRUDProps {
  domain?: string;
  path: string;
}

export function useCRUD<ItemType, NewItemType>({ domain, path }: UseCRUDProps) {
  const { authHeaders, urlForPath } = useBackend({
    domain,
  });

  const url = urlForPath(path);

  const getAll = async (): Promise<ItemType[]> => {
    const response = await fetch(url, {
      headers: {
        ...(await authHeaders()),
      },
    });
    const response_json = (await response.json()) as ItemType[];
    return response_json;
  };

  const createItem = async (childItem: NewItemType) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(childItem),
      headers: {
        "Content-Type": "application/json",
        ...(await authHeaders()),
      },
    });
    const response_json: ItemType = await response.json();
    return response_json;
  };

  const retrieveItem = async (id: string) => {
    const itemUrl = `${url}/${id}`;
    const response = await fetch(itemUrl, {
      headers: {
        ...(await authHeaders()),
      },
    });
    return (await response.json()) as ItemType;
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
  };

  return {
    getAll,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
    urlForPath,
    authHeaders,
  };
}
