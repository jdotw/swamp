import {
  act,
  render,
  renderHook,
  RenderHookResult,
  screen,
  waitFor,
} from "@testing-library/react";
import { beforeEach, Mock, vi } from "vitest";
import {
  TypeWithID,
  useCRUD,
  UseCRUDAdoptionInterface,
  UseCRUDInterface,
  UseCRUDOptionalProps,
} from "./CRUD/CRUD";
import { Chapter, MutateChapter, useChapter } from "./Chapter";

interface ExpectHookAdoptsUseCRUDCorrectlyProps<
  TItem extends TypeWithID,
  TMutateItem
> {
  hookFactory: (
    props: UseCRUDOptionalProps
  ) => UseCRUDAdoptionInterface<TItem, TMutateItem>;
  itemFactory: (props?: Partial<TItem>) => TItem;
  mutateItemFactory: (props?: Partial<TMutateItem>) => TMutateItem;
}

vi.mock("../CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

export function expectHookAdoptsUseCRUDCorrectly<
  TItem extends TypeWithID,
  TMutateItem
>({
  hookFactory,
  itemFactory,
  mutateItemFactory,
}: ExpectHookAdoptsUseCRUDCorrectlyProps<TItem, TMutateItem>) {
  const defaultProps = {};

  const renderHookUnderTest = (props?: UseCRUDOptionalProps) => {
    const hook = renderHook(() => hookFactory({ ...defaultProps, ...props }));
    return hook;
  };

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

  describe("hook that uses useCRUD", () => {
    it("should call useCRUD with expected parameters", async () => {
      await renderHookUnderTest();
      expect(useCRUD).toBeCalled();
      expect(useCRUD).toBeCalledWith(
        expect.objectContaining({
          ...defaultProps,
          path: expect.anything(),
        })
      );
    });
    describe("when loadOnMount=false", () => {
      it("should call useCRUD with loadOnMount=false", async () => {
        await renderHookUnderTest({ loadOnMount: false });
        expect(useCRUD).toBeCalled();
        expect(useCRUD).toBeCalledWith(
          expect.objectContaining({
            loadOnMount: false,
          })
        );
      });
    });

    it("should return expected parameters", async () => {
      const hook = await renderHookUnderTest();
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
        const hook = await renderHookUnderTest({ loadOnMount: false });
        act(() => {
          hook.result.current.reload();
        });
        expect(mockReload).toBeCalledTimes(1);
      });
    });

    describe("createItem function", () => {
      it("should call useCRUD's createItem function", async () => {
        const newItem = mutateItemFactory();
        const expectedItem = itemFactory(newItem as Partial<TItem>);
        const hook = await renderHookUnderTest();
        mockCreateItem.mockResolvedValueOnce(expectedItem);
        const item = await hook.result.current.createItem(newItem);
        expect(item).toBe(expectedItem);
        expect(mockCreateItem).toBeCalledWith(newItem);
      });
    });

    describe("retrieveItem function", () => {
      it("should call useCRUD's retrieveItem function", async () => {
        const expectedItem = itemFactory();
        const hook = await renderHookUnderTest();
        mockRetrieveItem.mockResolvedValueOnce(expectedItem);
        const result = await hook.result.current.retrieveItem(expectedItem.id);
        expect(result).toBe(expectedItem);
        expect(mockRetrieveItem).toBeCalledWith(expectedItem.id);
      });
    });

    describe("updateItem function", () => {
      it("should call useCRUD's updateItem function", async () => {
        const existingItem = itemFactory();
        const itemMutation = mutateItemFactory();
        const hook = await renderHookUnderTest();
        const expectedResult = true;
        mockUpdateItem.mockResolvedValueOnce(expectedResult);
        await act(async () => {
          const result = await hook.result.current.updateItem(
            existingItem.id,
            itemMutation
          );
          expect(result).toBe(expectedResult);
        });
        expect(mockUpdateItem).toBeCalledWith(existingItem.id, itemMutation);
      });
    });

    describe("deleteItem function", () => {
      it("should call useCRUD's deleteItem function", async () => {
        const itemId = Math.floor(Math.random() * 1000).toString();
        const hook = await renderHookUnderTest();
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
}
