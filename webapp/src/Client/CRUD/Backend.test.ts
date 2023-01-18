import { Mock, vi } from "vitest";

global.fetch = vi.fn();

function mockFetchResponse(data: any) {
  (fetch as Mock<any[], any>).mockResolvedValue({
    json: () => new Promise((resolve) => resolve(data)),
  });
}

describe("useBackend", async () => {
  const { useBackend } = await import("./Backend");

  it("should return an object with the correct properties", () => {
    const hook = useBackend({});
    expect(hook).toHaveProperty("defaultDomain");
    expect(hook).toHaveProperty("authHeaders");
    expect(hook).toHaveProperty("urlForPath");
  });

  describe("when calling urlForPath", async () => {
    const path = "/api/categories";
    it("should use the default domain is none is provided", async () => {
      const hook = useBackend({});
      const result = hook.urlForPath(path);
      expect(result).toEqual(`http://${hook.defaultDomain}${path}`);
    });
    it("should use the provided domain if one is provided", async () => {
      const domain = "somewhere.else:9999";
      const hook = useBackend({ domain });
      const result = hook.urlForPath(path);
      expect(result).toEqual(`http://${domain}${path}`);
    });
    it("should return the expected authHeaders", async () => {
      const hook = useBackend({});
      const result = await hook.authHeaders();
      expect(result).toEqual({
        // TODO: This is not a real token
        Authorization: `Bearer TOKEN-${hook.defaultDomain}`,
      });
    });
  });
});
