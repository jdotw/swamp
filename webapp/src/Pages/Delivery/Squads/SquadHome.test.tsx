import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";

addTestPolyfills();

describe("SquadHome", () => {
  const mockedUseSquad = vi.fn();
  beforeEach(() => {
    vi.doMock("../../../Client/Squad", () => ({
      useSquad: mockedUseSquad,
    }));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should show the <Loading> element when useSquad loading=true", async () => {
    mockedUseSquad.mockImplementation(() => ({
      loading: true,
      members: [],
    }));
    const { default: SquadHome } = await import("./SquadHome");
    render(<SquadHome />);
    expect(mockedUseSquad).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Loading")).toBeInTheDocument();
  });

  it("should NOT show the <Loading> element when useSquad loading=false", async () => {
    mockedUseSquad.mockImplementation(() => ({
      loading: false,
      members: [],
    }));
    const { default: SquadHome } = await import("./SquadHome");
    render(<SquadHome />);
    expect(mockedUseSquad).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });
});
