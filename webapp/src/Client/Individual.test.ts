import { render, screen } from "@testing-library/react";
import { beforeEach, vi } from "vitest";

vi.mock("react", async () => {
  const actual: any = await vi.importActual("react");
  return {
    ...actual,
    useState: vi.fn(() => [undefined, vi.fn()]),
    useEffect: vi.fn(() => {}),
  };
});

describe("useIndividual", () => {
  it("should return expected paremeters", async () => {
    const { useIndividual } = await import("./Individual");
    const hook = useIndividual({ id: "1" });
    expect(hook).toHaveProperty("individual");
    expect(hook).toHaveProperty("loading");
    expect(hook).toHaveProperty("error");
    expect(hook).toHaveProperty("update");
    expect(hook).toHaveProperty("updating");
    expect(hook).toHaveProperty("updateError");
    expect(hook).toHaveProperty("getTribeRoles");
    expect(hook).toHaveProperty("tribeRoles");
    expect(hook).toHaveProperty("getSquadRoles");
  });
});

describe("when calling getSquadRoles", () => {
  const mockGetAll = vi.fn();
  vi.doMock("../CRUD/CRUD", () => ({
    useCRUD: vi.fn(() => {
      return {
        getAll: mockGetAll,
        retrieveItem: vi.fn(),
      };
    }),
  }));
  const mockUseStateSetter = vi.fn();
  vi.doMock("react", async () => {
    const actual: any = await vi.importActual("react");
    return {
      ...actual,
      useState: vi.fn(() => [undefined, mockUseStateSetter]),
      useEffect: vi.fn(() => {}),
    };
  });

  it("should call useCRUD with correct path", async () => {
    const { useIndividual } = await import("./Individual");
    const { useCRUD } = await import("../CRUD/CRUD");
    const hook = useIndividual({ id: "1" });
    const mockSquadRoles = [
      {
        id: Math.floor(Math.random() * 100),
        individual_id: Math.floor(Math.random() * 100),
        squad_id: Math.floor(Math.random() * 100),
        role: Math.floor(Math.random() * 100),
      },
    ];
    mockGetAll.mockResolvedValue(mockSquadRoles);
    expect(useCRUD).toBeCalled();
    expect(useCRUD).toHaveBeenCalledWith({
      path: "/api/delivery/individuals/1/squadroles",
    });
    await hook.getSquadRoles();
    expect(mockGetAll).toBeCalledTimes(1);
    expect(mockUseStateSetter).toBeCalledTimes(1);
    expect(mockUseStateSetter).toHaveBeenCalledWith({
      squad_roles: mockSquadRoles,
    });
  });
});
