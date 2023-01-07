import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { addTestPolyfills } from "../../test/UITestHelpers";
import { SideNavbar } from "./SideNavbar";

addTestPolyfills();

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
  // People
  it("should render a link to People", async () => {
    expect(screen.getByRole("link", { name: "People" })).toHaveAttribute(
      "href",
      "/people"
    );
  });

  // Organisation
  it("should render a link to Organisation", async () => {
    expect(screen.getByRole("link", { name: "Organisation" })).toHaveAttribute(
      "href",
      "/org"
    );
  });

  // Delivery
  it("should render a link to Delivery", async () => {
    expect(screen.getByRole("link", { name: "Delivery" })).toHaveAttribute(
      "href",
      "/delivery"
    );
  });
  // Capability
  it("should render a link to Capability", async () => {
    expect(screen.getByRole("link", { name: "Capability" })).toHaveAttribute(
      "href",
      "/capability"
    );
  });
});
