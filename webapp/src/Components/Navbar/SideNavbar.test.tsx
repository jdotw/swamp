import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { addTestPolyfills } from "../../../test/UITestHelpers";
import { SideNavbar } from "./SideNavbar";

addTestPolyfills();

describe("SideNavbar", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <SideNavbar hidden={false} onLinkClicked={() => { }} />
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
    it("should render a Teams link ", async () => {
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
  it("should render a link to Capabilities", async () => {
    expect(screen.getByRole("link", { name: "Capabilities" })).toHaveAttribute(
      "href",
      "/capability"
    );
    describe("when clicking on Capabilities", () => {
      beforeEach(async () => {
        const button = screen.getByRole("button", { name: "Capabilities" });
        await userEvent.click(button);
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

  // Setup
  it("should render a link to Setup", async () => {
    expect(screen.getByRole("link", { name: "Setup" })).toHaveAttribute(
      "href",
      "/setup"
    );
  });
  describe("when clicking on Setup", () => {
    beforeEach(async () => {
      const button = screen.getByRole("button", { name: "Setup" });
      await userEvent.click(button);
    });
    it("should render a Role Types link", async () => {
      await waitFor(() => {
        expect(
          screen.getByRole("link", { name: "Role Types" })
        ).toHaveAttribute("href", "/setup/roletypes");
      });
    });
    it("should render a Levels link", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "Levels" })).toHaveAttribute(
          "href",
          "/setup/levels"
        );
      });
    });
    it("should render a Deployment Types link", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "Deployments" })).toHaveAttribute(
          "href",
          "/setup/deploymenttypes"
        );
      });
    });
    it("should render a Tracks link", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "Tracks" })).toHaveAttribute(
          "href",
          "/setup/tracks"
        );
      });
    });
    it("should render a Titles link", async () => {
      await waitFor(() => {
        expect(screen.getByRole("link", { name: "Titles" })).toHaveAttribute(
          "href",
          "/setup/titles"
        );
      });
    });
  });

});
