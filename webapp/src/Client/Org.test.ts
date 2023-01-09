import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";
import { useCRUD } from "../CRUD/CRUD";
import { MutateOrg, Org, useOrg, UseOrgProps } from "./Org";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

interface RenderUseOrgHookProps extends UseOrgProps {}

const renderUseOrgHook = async (props?: RenderUseOrgHookProps) => {
  const hook = renderHook(() => useOrg(props));
  return hook;
};

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

describe("useOrg Hook", () => {
  it("should use useCRUD correctly", () => {
    expectHookAdoptsUseCRUDCorrectly({
      hookFactory: () => useOrg(),
      itemFactory: () =>
        ({
          id: Math.floor(Math.random() * 1000).toString(),
          name: "Test Org",
        } as Org),
      mutateItemFactory: () =>
        ({
          name: "Mutated Test Org",
        } as Org),
    });
  });
});
