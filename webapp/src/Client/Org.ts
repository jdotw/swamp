import { useEffect, useState } from "react";
import { useCRUD } from "../CRUD/CRUD";

export type Org = {
  id: string;
  name: string;
  parent_id?: string;
};

export type MutateOrg = {
  name: string;
  parent_id?: string;
};

export interface UseOrgProps {
  loadOnMount?: boolean;
}

export function useOrg({ loadOnMount = true }: UseOrgProps) {
  console.log("loadOnMount: ", loadOnMount);

  const {
    items,
    loading,
    error,
    reload,
    createItem,
    retrieveItem,
    updateItem,
    deleteItem,
  } = useCRUD<Org, MutateOrg>({
    path: "/api/people/orgs",
    loadOnMount,
  });

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
