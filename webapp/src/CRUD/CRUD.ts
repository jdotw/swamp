import { useEffect, useState } from "react";

interface UseCRUDProps {
  domain?: string;
  path: string;
}

const config = {
  domain: "localhost:5173",
};

export function useCRUD<ItemType, NewItemType>({
  domain = config.domain,
  path,
}: UseCRUDProps) {
  const url = `http://${domain}${path}`;

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

  const getAll = async (): Promise<ItemType[]> => {
    const response = await fetch(url, {
      headers: {
        ...(await authHeaders()),
      },
    });
    const response_json = (await response.json()) as ItemType[];
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

  const updateItem = async (id: string, updatedItem: ItemType) => {
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

  // const deleteItem = async () => {
  //   try {
  //     setDeleting(true);
  //     const response = await fetch(url, {
  //       method: "DELETE",
  //       headers: {
  //         ...(await authHeaders()),
  //       },
  //     });
  //     await response.json();
  //     setDeleteError(undefined);
  //   } catch (error: any) {
  //     setDeleteError(error);
  //   } finally {
  //     setDeleting(false);
  //   }
  // };

  return {
    getAll,
    // createItem,
    retrieveItem,
    updateItem,
    // deleteItem,
    // item,
    createItem,
  };
}
