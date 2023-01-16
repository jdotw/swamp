import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  // Organisation
  it("should render a link to Organisation", async () => {
    expect(screen.getByRole("link", { name: "Organisation" })).toHaveAttribute(
      "href",
      "/org"
    );
  });
  describe("when clicking on Organisation", () => {
    beforeEach(async () => {
      const button = screen.getByRole("button", { name: "Organisation" });
      await userEvent.click(button);
    });
    it("should render a Home link", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
          "href",
          "/org"
        );
      });
    });
    it("should render a People link", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "People" })).toHaveAttribute(
          "href",
          "/org/people"
        );
      });
    });
    it("should render a Roles link", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "Roles" })).toHaveAttribute(
          "href",
          "/org/roles"
        );
      });
    });
    it("should render a Roleslink", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "Teams" })).toHaveAttribute(
          "href",
          "/org/teams"
        );
      });
    });
  });

  // Delivery
  it("should render a link to Delivery", async () => {
    expect(screen.getByRole("link", { name: "Delivery" })).toHaveAttribute(
      "href",
      "/delivery"
    );
    describe("when clicking on Delivery", () => {
      beforeEach(async () => {
        const button = screen.getByRole("button", { name: "Delivery" });
        await userEvent.click(button);
      });
      it("should render a Home link", async () => {
        await waitFor(() => {
          expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
            "href",
            "/delivery"
          );
        });
      });
      it("should render a Tribes link", async () => {
        await waitFor(() => {
          expect(screen.getByRole("link", { name: "Tribes" })).toHaveAttribute(
            "href",
            "/delivery/tribes"
          );
        });
      });
    });
  });
  // Capability
  it("should render a link to Capability", async () => {
    expect(screen.getByRole("link", { name: "Capability" })).toHaveAttribute(
      "href",
      "/capability"
    );
    describe("when clicking on Capability", () => {
      beforeEach(async () => {
        const button = screen.getByRole("button", { name: "Capability" });
        await userEvent.click(button);
      });
      it("should render a Home link", async () => {
        await waitFor(() => {
          expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
            "href",
            "/capability"
          );
        });
      });
      it("should render a Practices link", async () => {
        await waitFor(() => {
          expect(
            screen.getByRole("link", { name: "Practices" })
          ).toHaveAttribute("href", "/delivery/practices");
        });
      });
    });
  });
});
