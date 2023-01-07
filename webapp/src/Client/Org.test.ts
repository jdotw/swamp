import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";
import { useCRUD } from "../CRUD/CRUD";
import { MutateOrg, Org, useOrg, UseOrgProps } from "./Org";

const renderUseOrgHook = async (props: UseOrgProps = { loadOnMount: true }) => {
  const hook = renderHook(() => useOrg(props));
  if (props.loadOnMount) {
    await waitFor(() => {
      expect(hook.result.current.loading).toBeFalsy();
    });
  }
  return hook;
};

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

const mockGetAll = vi.fn();
const mockCreateItem = vi.fn();
const mockRetrieveItem = vi.fn();
const mockUpdateItem = vi.fn();
const mockDeleteItem = vi.fn();
(useCRUD as Mock<any[], any>).mockReturnValue({
  getAll: mockGetAll,
  retrieveItem: mockRetrieveItem,
  createItem: mockCreateItem,
  updateItem: mockUpdateItem,
  deleteItem: mockDeleteItem,
});

describe("useOrg hook", () => {
  it("should return expected parameters", async () => {
    const hook = await renderUseOrgHook();
    expect(hook.result.current).toHaveProperty("reload");

    expect(hook.result.current).toHaveProperty("items");
    expect(hook.result.current).toHaveProperty("loading");
    expect(hook.result.current).toHaveProperty("error");

    expect(hook.result.current).toHaveProperty("createItem");
    expect(hook.result.current).toHaveProperty("updateItem");
    expect(hook.result.current).toHaveProperty("deleteItem");
  });

  it("should have loading set to true on creation", async () => {
    // Can't use renderUseOrgHook here because
    // it waits for loading to be false
    const hook = renderHook(() => useOrg({}));
    expect(hook.result.current.loading).toBe(true);
    await waitFor(() => {
      expect(hook.result.current.loading).toBeFalsy();
    });
  });

  describe("when loading data for a specific org thats not in the list", () => {
    it("should call useCRUD's retrieveItem", async () => {
      mockGetAll.mockResolvedValueOnce([]);
      const hook = await renderUseOrgHook();
      expect(useCRUD).toHaveBeenCalledWith({
        path: "/api/people/orgs",
      });
      expect(mockGetAll).toHaveBeenCalled();
      expect(hook.result.current.items).toHaveLength(0);
      mockRetrieveItem.mockResolvedValueOnce({
        id: "3424",
        name: "Single Test Org",
      });
      await act(async () => {
        await hook.result.current.retrieveItem("3424");
      });
      expect(mockRetrieveItem).toHaveBeenCalled();
      expect(hook.result.current.items).toHaveLength(1);
    });
  });

  describe("when loading data for a specific org that is already in the list", () => {
    it("should call useCRUD's retrieveItem", async () => {
      mockGetAll.mockResolvedValueOnce([
        {
          id: "3424",
          name: "Existing Test Org",
        },
      ]);
      const hook = await renderUseOrgHook();
      expect(useCRUD).toHaveBeenCalledWith({
        path: "/api/people/orgs",
      });
      expect(mockGetAll).toHaveBeenCalled();
      expect(hook.result.current.items).toHaveLength(1);
      const newerName = "Newer Name from Backend";
      mockRetrieveItem.mockResolvedValueOnce({
        id: "3424",
        name: newerName,
      });
      await act(async () => {
        await hook.result.current.retrieveItem("3424");
      });
      expect(mockRetrieveItem).toHaveBeenCalled();
      expect(hook.result.current.items).toHaveLength(1);
      expect(hook.result.current.items[0].name).toBe(newerName);
    });
  });

  describe("when loading all orgs", () => {
    it("should call useCRUD's getAllItems", async () => {
      await renderUseOrgHook();
      expect(useCRUD).toHaveBeenCalledWith({
        path: "/api/people/orgs",
      });
      expect(mockGetAll).toHaveBeenCalled();
      expect(mockRetrieveItem).not.toHaveBeenCalled();
    });
  });

  describe("when loadOnMount is false", () => {
    it("should not call useCRUD's getAllItems", async () => {
      await renderUseOrgHook({ loadOnMount: false });
      expect(mockGetAll).not.toHaveBeenCalled();
    });
  });

  describe("when an error occurs loading data", () => {
    it("should set the error property", async () => {
      mockGetAll.mockRejectedValueOnce(new Error("Test Error"));
      const hook = await renderUseOrgHook();
      expect(hook.result.current.error).toBeTruthy();
    });
    it("should set the loading state to false", async () => {
      mockGetAll.mockRejectedValueOnce(new Error("Test Error"));
      const hook = await renderUseOrgHook();
      expect(hook.result.current.loading).toBeFalsy();
    });
  });

  describe("when creating a new org", () => {
    it("should call useCRUD's createItem", async () => {
      const hook = await renderUseOrgHook();
      await act(async () =>
        hook.result.current.createItem({
          name: "Test Org",
        } as MutateOrg)
      );
      expect(mockCreateItem).toHaveBeenCalled();
    });
    it("should add the created org to the list of orgs", async () => {
      const hook = await renderUseOrgHook();
      expect(hook.result.current.items).toHaveLength(0);
      await act(async () => {
        await hook.result.current.createItem({
          name: "Test Org",
        } as Org);
      });
      expect(hook.result.current.items).toHaveLength(1);
    });
  });

  describe("when updating an org", () => {
    it("should call useCRUD with the expected path", async () => {
      const { result } = await renderUseOrgHook();
      expect(useCRUD).toHaveBeenCalledWith({
        path: "/api/people/orgs",
      });
    });

    it("should call useCRUD's updateItem", async () => {
      const hook = await renderUseOrgHook();
      await act(async () =>
        hook.result.current.updateItem("1", {
          name: "Updated Org",
        } as MutateOrg)
      );
      expect(mockUpdateItem).toHaveBeenCalled();
    });
    it("should update the org in the list of orgs", async () => {
      mockGetAll.mockResolvedValueOnce([
        {
          id: "1",
          name: "Test Org",
        },
      ]);
      mockUpdateItem.mockResolvedValueOnce(true);
      const hook = await renderUseOrgHook();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(hook.result.current.items).toHaveLength(1);
      const updatedName = "Updated Test Org Name";
      await hook.result.current.updateItem("1", {
        name: updatedName,
      } as MutateOrg);
      expect(hook.result.current.items).toHaveLength(1);
      expect(hook.result.current.items[0].name).toBe(updatedName);
    });
  });

  describe("when deleting an org", () => {
    it("should call useCRUD with the expected path", async () => {
      const { result } = await renderUseOrgHook();
      expect(useCRUD).toHaveBeenCalledWith({
        path: "/api/people/orgs",
      });
    });

    it("should call useCRUD's deleteItem", async () => {
      const hook = await renderUseOrgHook();
      await act(async () => hook.result.current.deleteItem("1"));
      expect(mockDeleteItem).toHaveBeenCalled();
    });
    it("should remove the org in the list of orgs", async () => {
      mockGetAll.mockResolvedValueOnce([
        {
          id: "1",
          name: "Test Org",
        },
      ]);
      mockDeleteItem.mockResolvedValueOnce(true);
      const hook = await renderUseOrgHook();
      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(hook.result.current.items).toHaveLength(1);
      await act(async () => {
        await hook.result.current.deleteItem("1");
      });
      expect(hook.result.current.items).toHaveLength(0);
    });
  });
});
