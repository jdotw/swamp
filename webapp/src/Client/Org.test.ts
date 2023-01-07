import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";
import { e, s } from "vitest/dist/index-761e769b";
import { useCRUD } from "../CRUD/CRUD";
import { MutateOrg, Org, useOrg, UseOrgProps } from "./Org";

interface RenderUseOrgHookProps extends UseOrgProps {
  waitForLoad?: boolean;
}

const renderUseOrgHook = async (
  props: RenderUseOrgHookProps = { loadOnMount: true, waitForLoad: true }
) => {
  const hook = renderHook(() => useOrg(props));
  if (props.loadOnMount && props.waitForLoad) {
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

const mockReload = vi.fn();
const mockCreateItem = vi.fn();
const mockRetrieveItem = vi.fn();
const mockUpdateItem = vi.fn();
const mockDeleteItem = vi.fn();
(useCRUD as Mock<any[], any>).mockReturnValue({
  reload: mockReload,
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
  describe("reload function", () => {
    it("should call useCRUD's reload function", async () => {
      const hook = await renderUseOrgHook();
      act(() => {
        hook.result.current.reload();
      });
      expect(mockReload).toBeCalledTimes(1);
    });
  });
  describe("createItem function", () => {
    it("should call useCRUD's createItem function", async () => {
      const newItem = {
        name: "New Org",
        parent_id: "123",
      } as MutateOrg;
      const hook = await renderUseOrgHook();
      act(() => {
        hook.result.current.createItem(newItem);
      });
      expect(mockCreateItem).toBeCalledWith(newItem);
    });
  });
  describe("retrieveItem function", () => {
    it("should call useCRUD's retrieveItem function", async () => {
      const itemId = Math.floor(Math.random() * 1000).toString();
      const expectedItem = {
        id: itemId,
        name: "New Org",
      };
      const hook = await renderUseOrgHook();
      mockRetrieveItem.mockResolvedValueOnce(expectedItem);
      await act(async () => {
        const result = await hook.result.current.retrieveItem(itemId);
        expect(result).toBe(expectedItem);
      });
      expect(mockRetrieveItem).toBeCalledWith(itemId);
    });
  });
  describe("updateItem function", () => {
    it("should call useCRUD's updateItem function", async () => {
      const itemId = Math.floor(Math.random() * 1000).toString();
      const itemMutation = {
        name: "Updated Org Name",
      };
      const hook = await renderUseOrgHook();
      const expectedResult = true;
      mockUpdateItem.mockResolvedValueOnce(expectedResult);
      await act(async () => {
        const result = await hook.result.current.updateItem(
          itemId,
          itemMutation
        );
        expect(result).toBe(expectedResult);
      });
      expect(mockUpdateItem).toBeCalledWith(itemId, itemMutation);
    });
  });
  describe("deleteItem function", () => {
    it("should call useCRUD's deleteItem function", async () => {
      const itemId = Math.floor(Math.random() * 1000).toString();
      const hook = await renderUseOrgHook();
      const expectedResult = true;
      mockDeleteItem.mockResolvedValueOnce(expectedResult);
      await act(async () => {
        const result = await hook.result.current.deleteItem(itemId);
        expect(result).toBe(expectedResult);
      });
      expect(mockDeleteItem).toBeCalledWith(itemId);
    });
  });
});
