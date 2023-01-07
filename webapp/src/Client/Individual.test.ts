import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, Mock, vi } from "vitest";
import { useCRUD } from "../CRUD/CRUD";
import {
  MutateIndividual,
  useIndividual,
  UseIndividualProps,
} from "./Individual";

interface RenderUseIndividualHookProps extends UseIndividualProps {}

const renderUseIndividualHook = async (
  props?: RenderUseIndividualHookProps
) => {
  const hook = renderHook(() => useIndividual(props));
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

const path = "/api/people/individuals";

describe("useIndividual hook", () => {
  it("should call useCRUD with expected parameters", async () => {
    await renderUseIndividualHook({ loadOnMount: true });
    expect(useCRUD).toBeCalled();
    expect(useCRUD).toBeCalledWith({
      path,
      loadOnMount: true,
    });
  });
  describe("when loadOnMount=false", () => {
    it("should call useCRUD with loadOnMount=false", async () => {
      await renderUseIndividualHook({ loadOnMount: false });
      expect(useCRUD).toBeCalled();
      expect(useCRUD).toBeCalledWith({
        path,
        loadOnMount: false,
      });
    });
  });

  it("should return expected parameters", async () => {
    const hook = await renderUseIndividualHook();
    expect(hook.result.current).toHaveProperty("reload");

    expect(hook.result.current).toHaveProperty("items");
    expect(hook.result.current).toHaveProperty("loading");
    expect(hook.result.current).toHaveProperty("error");

    expect(hook.result.current).toHaveProperty("createItem");
    expect(hook.result.current).toHaveProperty("updateItem");
    expect(hook.result.current).toHaveProperty("deleteItem");

    expect(hook.result.current).toHaveProperty("practiceRoles");
    expect(hook.result.current).toHaveProperty("chapterRoles");
    expect(hook.result.current).toHaveProperty("tribeRoles");
    expect(hook.result.current).toHaveProperty("squadRoles");
  });

  describe("reload function", () => {
    it("should call useCRUD's reload function", async () => {
      const hook = await renderUseIndividualHook();
      act(() => {
        hook.result.current.reload();
      });
      expect(mockReload).toBeCalledTimes(1);
    });
  });

  describe("createItem function", () => {
    it("should call useCRUD's createItem function", async () => {
      const newItem = {
        external_id: "123",
        first_name: "New",
        last_name: "Individual",
      } as MutateIndividual;
      const hook = await renderUseIndividualHook();
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
        external_id: "123",
        first_name: "New",
        last_name: "Individual",
      };
      const hook = await renderUseIndividualHook();
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
        first_name: "Updated",
        last_name: "Name",
      } as MutateIndividual;
      const hook = await renderUseIndividualHook();
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
      const hook = await renderUseIndividualHook();
      const expectedResult = true;
      mockDeleteItem.mockResolvedValueOnce(expectedResult);
      await act(async () => {
        const result = await hook.result.current.deleteItem(itemId);
        expect(result).toBe(expectedResult);
      });
      expect(mockDeleteItem).toBeCalledWith(itemId);
    });
  });

  describe("when an individual id is specified", () => {
    const individualId = Math.floor(Math.random() * 1000).toString();
    const expectedIndividual = {
      id: individualId,
      external_id: "123",
      first_name: "New",
      last_name: "Individual",
    };
    it("should not perform the initial load for all individuals", async () => {
      await renderUseIndividualHook({ id: individualId });
      expect(useCRUD).toHaveBeenNthCalledWith(1, {
        path,
        loadOnMount: false,
      });
    });
    it("should perform the initial load for the role useCRUDs", async () => {
      await renderUseIndividualHook({ id: individualId });
      expect(useCRUD).toHaveBeenCalledWith({
        path: `/api/delivery/individuals/${individualId}/triberoles`,
        loadOnMount: true,
      });
      expect(useCRUD).toHaveBeenCalledWith({
        path: `/api/delivery/individuals/${individualId}/squadroles`,
        loadOnMount: true,
      });
      expect(useCRUD).toHaveBeenCalledWith({
        path: `/api/capability/individuals/${individualId}/practiceroles`,
        loadOnMount: true,
      });
      expect(useCRUD).toHaveBeenCalledWith({
        path: `/api/capability/individuals/${individualId}/chapterroles`,
        loadOnMount: true,
      });
    });
    it("should call retrieveItem with the specified id", async () => {
      mockRetrieveItem.mockResolvedValueOnce(expectedIndividual);
      await renderUseIndividualHook({ id: individualId });
      await waitFor(async () => {
        expect(mockRetrieveItem).toBeCalledTimes(1);
        expect(mockRetrieveItem).toBeCalledWith(individualId);
      });
    });
    it("should call reload on each of the useCRUD hooks for roles", async () => {
      await renderUseIndividualHook({ id: individualId });
      await waitFor(async () => {
        expect(mockReload).toBeCalledTimes(4);
      });
    });
    describe("when the roles are loading", () => {
      it("should set loadingRoles state to true if any role useCRUD is loading", async () => {
        (useCRUD as Mock<any[], any>).mockReturnValue({
          reload: mockReload,
          retrieveItem: mockRetrieveItem,
          loading: true,
        });
        const hook = await renderUseIndividualHook({ id: individualId });
        await waitFor(async () => {
          expect(hook.result.current.loadingRoles).toBe(true);
        });
      });
      it("should set loadingRoles state to false if no role useCRUD is loading", async () => {
        (useCRUD as Mock<any[], any>).mockReturnValue({
          reload: mockReload,
          retrieveItem: mockRetrieveItem,
          loading: false,
        });
        const hook = await renderUseIndividualHook({ id: individualId });
        await waitFor(async () => {
          expect(hook.result.current.loadingRoles).toBe(false);
        });
      });
    });

    describe("when the roles fails to load", () => {
      it("should set loadingRolesError", async () => {
        const error = new Error("Failed to load");
        (useCRUD as Mock<any[], any>).mockReturnValue({
          reload: mockReload,
          retrieveItem: mockRetrieveItem,
          error: error,
        });
        const hook = await renderUseIndividualHook({ id: individualId });
        await waitFor(async () => {
          expect(hook.result.current.loadingRolesError).toBe(error);
        });
      });
    });
  });
});
