import { useEffect, useState } from "react";
import { useCRUD, UseCRUDProps } from "../CRUD/CRUD";

export type Org = {
  id: string;
  name: string;
  parent_id?: string;
};

export type MutateOrg = {
  name: string;
  parent_id?: string;
};

export interface UseOrgProps {}

export function useOrg(props?: UseOrgProps) {
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
    ...props,
    path: "/api/people/orgs",
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
