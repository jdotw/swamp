import { Mock, vi } from "vitest";

global.fetch = vi.fn();

function mockFetchResponse(data: any) {
  (fetch as Mock<any[], any>).mockResolvedValue({
    json: () => new Promise((resolve) => resolve(data)),
  });
}

describe("useCRUD", async () => {
  const path = "/api/categories";
  const { useCRUD } = await import("./CRUD");
  const hook = useCRUD({ path });

  it("should return an object with the correct properties", () => {
    expect(hook).toHaveProperty("getAll");
    expect(hook).toHaveProperty("createItem");
    expect(hook).toHaveProperty("retrieveItem");
    expect(hook).toHaveProperty("updateItem");
    expect(hook).toHaveProperty("deleteItem");
    expect(hook).toHaveProperty("authHeaders");
    expect(hook).toHaveProperty("urlForPath");
  });

  describe("when calling getAll", async () => {
    const items = [
      { id: 1, name: "first" },
      { id: 2, name: "second" },
      { id: 3, name: "third" },
    ];
    const mockResponse = { ...items };
    beforeEach(() => {
      mockFetchResponse(mockResponse);
    });
    it("should call fetch with the correct arguments", async () => {
      await hook.getAll();
      expect(fetch).toHaveBeenCalledWith(hook.urlForPath(`${path}`), {
        headers: {
          ...(await hook.authHeaders()),
        },
      });
    });
    it("should return the item as received from the backend", async () => {
      const result = await hook.getAll();
      expect(result).toEqual(mockResponse);
    });
  });

  describe("when calling retrieveItem", async () => {
    const id = "1";
    const item = { id, name: "first" };
    const mockResponse = { ...item };
    beforeEach(() => {
      mockFetchResponse(mockResponse);
    });
    it("should call fetch with the correct arguments", async () => {
      await hook.retrieveItem(id);
      expect(fetch).toHaveBeenCalledWith(hook.urlForPath(`${path}/${id}`), {
        headers: {
          ...(await hook.authHeaders()),
        },
      });
    });
    it("should return the item as received from the backend", async () => {
      const result = await hook.getAll();
      expect(result).toEqual(mockResponse);
    });
  });

  describe("when calling createItem", async () => {
    const item = { name: "test" };
    const mockResponse = { id: 3, ...item };
    beforeEach(() => {
      mockFetchResponse(mockResponse);
    });
    it("should call fetch with the correct arguments", async () => {
      await hook.createItem(item);
      expect(fetch).toHaveBeenCalledWith(hook.urlForPath(`${path}`), {
        body: JSON.stringify(item),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(await hook.authHeaders()),
        },
      });
    });
    it("should return the item as received from the backend", async () => {
      const result = await hook.createItem(item);
      expect(result).toEqual(mockResponse);
    });
  });

  describe("when calling updateItem", async () => {
    const id = "432";
    const update = { name: "new test name" };
    beforeEach(() => {
      mockFetchResponse({});
    });
    it("should call fetch with the correct arguments", async () => {
      await hook.updateItem(id, update);
      expect(fetch).toHaveBeenCalledWith(hook.urlForPath(`${path}/${id}`), {
        body: JSON.stringify(update),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(await hook.authHeaders()),
        },
      });
    });
  });

  describe("when calling deleteItem", async () => {
    const id = "1";
    beforeEach(() => {
      mockFetchResponse({});
    });
    it("should call fetch with the correct arguments", async () => {
      await hook.deleteItem(id);
      expect(window.fetch).toHaveBeenCalledWith(
        hook.urlForPath(`${path}/${id}`),
        {
          method: "DELETE",
          headers: {
            ...(await hook.authHeaders()),
          },
        }
      );
    });
  });
});
