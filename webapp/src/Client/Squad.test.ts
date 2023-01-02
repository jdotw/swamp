import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("react", async () => {
  const actual: any = await vi.importActual("react");
  return {
    ...actual,
    useState: vi.fn(() => [undefined, vi.fn()]),
    useEffect: vi.fn(() => {}),
  };
});

describe("Squad", () => {
  it("should return paremeters", async () => {
    const { useSquad } = await import("./Squad");
    const hook = useSquad({ tribeId: "1", id: "1" });
    expect(hook).toHaveProperty("squad");
    expect(hook).toHaveProperty("loading");
    expect(hook).toHaveProperty("error");
    expect(hook).toHaveProperty("roles");
    expect(hook).toHaveProperty("loadingRoles");
    expect(hook).toHaveProperty("loadingRolesError");
    expect(hook).toHaveProperty("addRole");
  });
});
