import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import SideNavbar from "./SideNavbar";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("SideNavbar", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SideNavbar hidden={false} onLinkClicked={() => {}} />
      </MemoryRouter>
    );
  });
  it("should render a nav element (navigation)", async () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });
  it("should render a link to People", async () => {
    expect(screen.getByRole("link", { name: "People" })).toHaveAttribute(
      "href",
      "/people"
    );
  });
  it("should render a link to Delivery", async () => {
    expect(screen.getByRole("link", { name: "Delivery" })).toHaveAttribute(
      "href",
      "/delivery"
    );
  });
  it("should render a link to Capability", async () => {
    expect(screen.getByRole("link", { name: "Capability" })).toHaveAttribute(
      "href",
      "/capability"
    );
  });
});
