import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Mock, vi } from "vitest";
import { useCRUD, UseCRUDProps } from "./CRUD";

global.fetch = vi.fn();

const path = "/just/for/tests";

function mockFetchResponse(data: any, code: number = 200) {
  (fetch as Mock<any[], any>).mockResolvedValueOnce({
    json: () => new Promise((resolve) => resolve(data)),
    status: code,
  });
}

function mockFetchError(errorString: string) {
  (fetch as Mock<any[], any>).mockRejectedValueOnce(new Error(errorString));
}

type TestItemType = {
  id: string;
  name: string;
};

type MutateTestItemType = {
  name: string;
};

interface RenderUseCRUDHookProps extends UseCRUDProps {
  initialLoadItems?: TestItemType[] | TestItemType;
  initialLoadErrorString?: string;
  waitForLoading?: boolean;
}

const renderUseCRUDHook = async (props: RenderUseCRUDHookProps = { path }) => {
  props = {
    loadOnMount: true,
    initialLoadItems: [],
    waitForLoading: false,
    ...props,
  };
  if (props.initialLoadErrorString) {
    mockFetchError(props.initialLoadErrorString);
  } else {
    if (props.loadOnMount) {
      mockFetchResponse(props.initialLoadItems);
    }
  }

  const hook = renderHook(() =>
    useCRUD<TestItemType, MutateTestItemType>(props)
  );
  if (props.loadOnMount) {
    if (props.waitForLoading) {
      await waitFor(() => {
        expect(hook.result.current.loading).toBeFalsy();
        if (props.initialLoadItems) {
          expect(hook.result.current.items).toEqual(props.initialLoadItems);
        }
      });
    }
  }
  return hook;
};

describe("useCRUD", () => {
  it("should return an object with the correct properties", async () => {
    const hook = await renderUseCRUDHook();
    expect(hook.result.current).toHaveProperty("reload");
    expect(hook.result.current).toHaveProperty("items");
    expect(hook.result.current).toHaveProperty("loading");
    expect(hook.result.current).toHaveProperty("error");
    expect(hook.result.current).toHaveProperty("createItem");
    expect(hook.result.current).toHaveProperty("updateItem");
    expect(hook.result.current).toHaveProperty("deleteItem");
    expect(hook.result.current).toHaveProperty("authHeaders");
    expect(hook.result.current).toHaveProperty("urlForPath");
  });

  it("should have loading set to true on creation by default", async () => {
    const hook = await renderUseCRUDHook({ path, waitForLoading: false });
    await act(async () => {
      expect(hook.result.current.loading).toBeTruthy();
    });
  });

  it("should perform an initial load on mount by default", async () => {
    const hook = await renderUseCRUDHook({ path, waitForLoading: false });
    expect(hook.result.current.loading).toBe(true);
    await waitFor(() => {
      expect(hook.result.current.loading).toBeFalsy();
    });
  });

  describe("when loadOnMount is false", () => {
    it("should have loading set to false on creation", async () => {
      const hook = await renderUseCRUDHook({ path, loadOnMount: false });
      expect(hook.result.current.loading).toBeFalsy();
    });

    it("should not call fetch", async () => {
      await renderUseCRUDHook({ loadOnMount: false, path });
      expect(fetch).not.toHaveBeenCalled();
    });
  });

  describe("when an id is specified", () => {
    const mockItem: TestItemType = {
      id: "123",
      name: "Test Item",
    };
    it("should call retrieveItem on mount", async () => {
      const hook = await renderUseCRUDHook({
        path,
        id: "123",
        initialLoadItems: mockItem,
      });
      await act(async () => {
        expect(fetch).toHaveBeenCalledWith(
          hook.result.current.urlForPath(`${path}/${mockItem.id}`),
          expect.anything()
        );
      });
    });
    it("it should not call reload on mount", async () => {
      const hook = await renderUseCRUDHook({
        path,
        id: "123",
        initialLoadItems: mockItem,
      });
      await act(async () => {
        expect(fetch).not.toHaveBeenCalledWith(
          hook.result.current.urlForPath(path),
          expect.anything()
        );
      });
    });
  });

  describe("when a path is not provided", () => {
    it("should not call reload on mount", async () => {
      const hook = await renderUseCRUDHook({
        path: undefined,
      });
      await act(async () => {
        expect(fetch).not.toHaveBeenCalledWith(
          hook.result.current.urlForPath(path),
          expect.anything()
        );
      });
    });

  /*
   * Get All Items (reload)
   */

  describe("reload function", () => {
    it("should call fetch with the correct path and headers", async () => {
      const hook = await renderUseCRUDHook({ path, loadOnMount: false });
      mockFetchResponse([]);
      await act(async () => {
        await hook.result.current.reload();
      });
      expect(fetch).toHaveBeenCalledWith(
        hook.result.current.urlForPath(`${path}`),
        {
          headers: {
            ...(await hook.result.current.authHeaders()),
          },
        }
      );
    });

    describe("when an error occurs loading data", () => {
      const renderHookWithError = async () =>
        await renderUseCRUDHook({
          path,
          waitForLoading: false,
          initialLoadErrorString: "Error loading data",
        });
      it("should set the error property", async () => {
        const hook = await renderHookWithError();
        expect(hook.result.current.loading).toBeTruthy();
        await waitFor(async () => {
          expect(hook.result.current.error).toBeTruthy();
        });
      });
      it("should set the loading state to false", async () => {
        const hook = await renderHookWithError();
        expect(hook.result.current.loading).toBeTruthy();
        await waitFor(() => {
          expect(hook.result.current.loading).toBeFalsy();
        });
      });
    });
  });

  /*
   * Retrieve Items
   */

  describe("retrieveItem function", () => {
    it("should call fetch with the correct path and headers", async () => {
      const hook = await renderUseCRUDHook({ path, loadOnMount: false });
      const itemId = Math.floor(Math.random() * 10000).toString();
      mockFetchResponse({ id: itemId, name: "test" });
      await act(() => hook.result.current.retrieveItem(itemId));
      expect(fetch).toHaveBeenCalledWith(
        hook.result.current.urlForPath(`${path}/${itemId}`),
        {
          headers: {
            ...(await hook.result.current.authHeaders()),
          },
        }
      );
    });

    describe("when an item is NOT in the list", () => {
      it("should add the item to the items list", async () => {
        const hook = await renderUseCRUDHook();
        expect(hook.result.current.items).toHaveLength(0);
        mockFetchResponse({
          id: "3424",
          name: "Single Test Item",
        });
        await act(async () => {
          await hook.result.current.retrieveItem("3424");
        });
        expect(fetch).toHaveBeenCalled();
        expect(hook.result.current.items).toHaveLength(1);
      });
    });

    describe("when an item is already in the list", () => {
      it("should update the existing item", async () => {
        const itemId = Math.floor(Math.random() * 10000).toString();
        const existingItem = {
          id: itemId,
          name: "Existing Test Item",
        };
        const hook = await renderUseCRUDHook({
          path,
          initialLoadItems: [existingItem],
          waitForLoading: true,
        });
        expect(hook.result.current.items).toHaveLength(1);
        expect(hook.result.current.items[0].name).toBe(existingItem.name);
        const newerName = "Newer Name from Backend";
        mockFetchResponse({
          id: itemId,
          name: newerName,
        });
        await act(async () => {
          await hook.result.current.retrieveItem(itemId);
        });
        expect(fetch).toHaveBeenCalled();
        expect(hook.result.current.items).toHaveLength(1);
        expect(hook.result.current.items[0].name).toBe(newerName);
      });
    });
  });

  /*
   * Create Items
   */

  describe("createItem function", () => {
    it("should call fetch with the correct path and headers", async () => {
      const hook = await renderUseCRUDHook({ path, loadOnMount: false });
      const itemId = Math.floor(Math.random() * 10000).toString();
      const itemToCreate = {
        id: itemId,
        name: "item to be created",
      };
      mockFetchResponse({ id: itemId, name: "item to be created" });
      await act(() => hook.result.current.createItem(itemToCreate));
      expect(fetch).toHaveBeenCalledWith(
        hook.result.current.urlForPath(`${path}`),
        {
          body: JSON.stringify(itemToCreate),
          method: "POST",
          headers: {
            ...(await hook.result.current.authHeaders()),
            "Content-Type": "application/json",
          },
        }
      );
    });

    describe("when creating a new item", () => {
      const newItem = {
        name: "Test Item",
      } as MutateTestItemType;
      const createdItem = {
        ...newItem,
        id: "5456563",
      };
      it("should call fetch", async () => {
        const hook = await renderUseCRUDHook();
        mockFetchResponse(createdItem);
        await act(async () => hook.result.current.createItem(newItem));
        expect(fetch).toHaveBeenCalled();
      });
      it("should add the created item to the list of item", async () => {
        const hook = await renderUseCRUDHook();
        expect(hook.result.current.items).toHaveLength(0);
        await act(async () => {
          mockFetchResponse(createdItem);
          await hook.result.current.createItem({
            name: "Test Item",
          } as MutateTestItemType);
        });
        expect(hook.result.current.items).toHaveLength(1);
        expect(hook.result.current.items[0]).toEqual(createdItem);
      });
    });
  });

  /*
   * Update Items
   */

  describe("updateItem function", () => {
    it("should call fetch with the correct path and headers", async () => {
      const hook = await renderUseCRUDHook({ path, loadOnMount: false });
      const itemId = Math.floor(Math.random() * 10000).toString();
      const itemToUpdate = {
        name: "item to be updated",
      };
      mockFetchResponse({}, 204);
      await act(() => hook.result.current.updateItem(itemId, itemToUpdate));
      expect(fetch).toHaveBeenCalledWith(
        hook.result.current.urlForPath(`${path}/${itemId}`),
        {
          body: JSON.stringify(itemToUpdate),
          method: "PUT",
          headers: {
            ...(await hook.result.current.authHeaders()),
            "Content-Type": "application/json",
          },
        }
      );
    });

    describe("when updating an item", () => {
      const itemId = Math.floor(Math.random() * 100).toString();
      const existingItem = {
        id: itemId,
        name: "Test Item",
      } as TestItemType;
      const itemMutation = {
        name: "Updated Test Item",
      } as MutateTestItemType;
      const resultingItem = {
        id: itemId,
        name: "Updated Test Item",
      } as TestItemType;
      const renderHookForUpdate = async () =>
        await renderUseCRUDHook({
          path,
          initialLoadItems: [existingItem],
          waitForLoading: true,
        });
      it("should call fetch", async () => {
        const hook = await renderHookForUpdate();
        mockFetchResponse({}, 204);
        await act(async () =>
          hook.result.current.updateItem(itemId, itemMutation)
        );
        expect(fetch).toHaveBeenCalled();
      });
      it("should update the item in the item list", async () => {
        const hook = await renderHookForUpdate();
        mockFetchResponse({}, 204);
        await act(
          async () => await hook.result.current.updateItem(itemId, itemMutation)
        );
        expect(hook.result.current.items).toHaveLength(1);
        expect(hook.result.current.items[0].name).toBe(itemMutation.name);
      });
    });
  });

  /*
   * Delete Items
   */

  describe("deleteItem function", () => {
    it("should call fetch with the correct path and headers", async () => {
      const hook = await renderUseCRUDHook({ path, loadOnMount: false });
      const itemId = Math.floor(Math.random() * 10000).toString();
      mockFetchResponse({}, 204);
      await act(() => hook.result.current.deleteItem(itemId));
      expect(fetch).toHaveBeenCalledWith(
        hook.result.current.urlForPath(`${path}/${itemId}`),
        {
          method: "DELETE",
          headers: {
            ...(await hook.result.current.authHeaders()),
          },
        }
      );
    });

    describe("when deleting an item", () => {
      const itemId = Math.floor(Math.random() * 100).toString();
      const existingItem = {
        id: itemId,
        name: "Test Item",
      } as TestItemType;
      const renderHookForDelete = async () =>
        await renderUseCRUDHook({
          path,
          initialLoadItems: [existingItem],
          waitForLoading: true,
        });
      it("should call fetch", async () => {
        const hook = await renderHookForDelete();
        mockFetchResponse({}, 204);
        await act(async () => hook.result.current.deleteItem(itemId));
        expect(fetch).toHaveBeenCalled();
      });
      it("should remove the item from the item list", async () => {
        const hook = await renderHookForDelete();
        expect(hook.result.current.items[0].id).toBe(itemId);
        expect(hook.result.current.items).toHaveLength(1);
        mockFetchResponse({}, 204);
        const result = await act(
          async () => await hook.result.current.deleteItem(itemId)
        );
        expect(result).toBeTruthy();
        expect(hook.result.current.items).toHaveLength(0);
      });
    });
  });
});
