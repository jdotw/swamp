import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, Mock, vi } from "vitest";
import { useCRUD } from "../CRUD/CRUD";
import { Chapter, MutateChapter, useChapter, UseChapterProps } from "./Chapter";

interface RenderUseChapterHookProps extends UseChapterProps {}

const practiceId = Math.floor(Math.random() * 1000).toString();
const path = `/api/capability/practices/${practiceId}/chapters`;
const defaultProps = { practiceId, path };

const renderUseChapterHook = async (props?: RenderUseChapterHookProps) => {
  const hook = renderHook(() => useChapter({ ...defaultProps, ...props }));
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

describe("useChapter hook", () => {
  it("should call useCRUD with expected parameters", async () => {
    await renderUseChapterHook({ ...defaultProps, loadOnMount: true });
    expect(useCRUD).toBeCalled();
    expect(useCRUD).toBeCalledWith({
      ...defaultProps,
      loadOnMount: true,
    });
  });
  describe("when loadOnMount=false", () => {
    it("should call useCRUD with loadOnMount=false", async () => {
      await renderUseChapterHook({ ...defaultProps, loadOnMount: false });
      expect(useCRUD).toBeCalled();
      expect(useCRUD).toBeCalledWith({
        ...defaultProps,
        loadOnMount: false,
      });
    });
  });

  it("should return expected parameters", async () => {
    const hook = await renderUseChapterHook();
    expect(hook.result.current).toHaveProperty("reload");

    expect(hook.result.current).toHaveProperty("items");
    expect(hook.result.current).toHaveProperty("loading");
    expect(hook.result.current).toHaveProperty("error");

    expect(hook.result.current).toHaveProperty("createItem");
    expect(hook.result.current).toHaveProperty("retrieveItem");
    expect(hook.result.current).toHaveProperty("updateItem");
    expect(hook.result.current).toHaveProperty("deleteItem");
  });

  describe("reload function", () => {
    it("should call useCRUD's reload function", async () => {
      const hook = await renderUseChapterHook();
      act(() => {
        hook.result.current.reload();
      });
      expect(mockReload).toBeCalledTimes(1);
    });
  });

  describe("createItem function", () => {
    it("should call useCRUD's createItem function", async () => {
      const newItem: MutateChapter = {
        name: "New Chapter",
      };
      const hook = await renderUseChapterHook();
      act(() => {
        hook.result.current.createItem(newItem);
      });
      expect(mockCreateItem).toBeCalledWith(newItem);
    });
  });

  describe("retrieveItem function", () => {
    it("should call useCRUD's retrieveItem function", async () => {
      const itemId = Math.floor(Math.random() * 1000).toString();
      const expectedItem: Chapter = {
        id: itemId,
        name: "Chapter Name",
      };
      const hook = await renderUseChapterHook();
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
      const itemMutation: MutateChapter = {
        name: "New Chapter Name",
      };
      const hook = await renderUseChapterHook();
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
      const hook = await renderUseChapterHook();
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
