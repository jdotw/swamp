import { useEffect, useState } from "react";

interface UseCRUDProps {
  domain?: string;
  path: string;
}

const config = {
  domain: "localhost:8000",
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

  const getAll = async () => {
    try {
      const response = await fetch(url, {
        headers: {
          ...(await authHeaders()),
        },
      });
      const response_json = await response.json();
      return response_json;
    } catch (error: any) {
      return error;
    }
  };

  // const retrieveItem = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(url, {
  //       headers: {
  //         ...(await authHeaders()),
  //       },
  //     });
  //     const response_json = await response.json();
  //     setItem(response_json);
  //     setError(undefined);
  //   } catch (error: any) {
  //     setItem(undefined);
  //     setError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const updateItem = async (updatedItem: ItemType) => {
  //   try {
  //     setUpdating(true);
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       body: JSON.stringify(updatedItem),
  //       headers: {
  //         "Content-Type": "application/json",
  //         ...(await authHeaders()),
  //       },
  //     });
  //     setItem(updatedItem);
  //     setUpdateError(undefined);
  //   } catch (error: any) {
  //     setUpdateError(error);
  //   } finally {
  //     setUpdating(false);
  //   }
  // };

  const createItem = async (childItem: NewItemType) => {
    try {
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
    } catch (error: any) {
      return error;
    }
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
    // retrieveItem,
    // updateItem,
    // deleteItem,
    // item,
    createItem,
  };
}
