import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";
import { useCRUD } from "../CRUD/CRUD";
import { Org, useOrg, UseOrgProps } from "./Org";

const renderUseOrgHook = (props: UseOrgProps = {}) => {
  const hook = renderHook(() => useOrg(props));
  return hook;
};

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

const mockGetAll = vi.fn();
const mockRetrieveItem = vi.fn();
(useCRUD as Mock<any[], any>).mockReturnValue({
  getAll: mockGetAll,
  retrieveItem: mockRetrieveItem,
});

describe("useOrg hook", () => {
  it("should return expected parameters", () => {
    const hook = renderUseOrgHook();
    expect(hook.result.current).toHaveProperty("org");
    expect(hook.result.current).toHaveProperty("loading");
    expect(hook.result.current).toHaveProperty("error");
    expect(hook.result.current).toHaveProperty("create");
    expect(hook.result.current).toHaveProperty("creating");
    expect(hook.result.current).toHaveProperty("creatingError");
    expect(hook.result.current).toHaveProperty("update");
    expect(hook.result.current).toHaveProperty("updating");
    expect(hook.result.current).toHaveProperty("updateError");
    // expect(hook.result.current).toHaveProperty("delete");
    // expect(hook.result.current).toHaveProperty("deleting");
    // expect(hook.result.current).toHaveProperty("deleteError");
  });
});

describe("when loading data for a specific org", () => {
  it("should call useCRUD's retrieveItem", async () => {
    const hook = renderUseOrgHook({ id: "1" });
    expect(useCRUD).toHaveBeenCalledWith({
      path: "/api/people/orgs/1",
    });
    await act(async () => {
      await hook.result.current.load();
    });
    expect(mockRetrieveItem).toHaveBeenCalled();
    expect(mockGetAll).not.toHaveBeenCalled();
  });
});

describe("when loading all orgs", () => {
  it("should call useCRUD's getAllItems", async () => {
    const hook = renderUseOrgHook();
    expect(useCRUD).toHaveBeenCalledWith({
      path: "/api/people/orgs",
    });
    await act(async () => {
      await hook.result.current.load();
    });
    expect(mockGetAll).toHaveBeenCalled();
    expect(mockRetrieveItem).not.toHaveBeenCalled();
  });
});
