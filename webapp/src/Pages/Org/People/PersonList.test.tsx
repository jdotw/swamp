import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import { usePerson } from "../../../Client/Person";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import PersonList from "./PersonList";
import userEvent from "@testing-library/user-event";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter>
      <PersonList />
    </MemoryRouter>
  );

vi.mock("../../../Client/Person", () => {
  return {
    usePerson: vi.fn(),
  };
});

const mockUsePersonReturn = {
  loading: false,
  items: [],
};
const usePersonMock = usePerson as Mock;
usePersonMock.mockImplementation(() => ({
  ...mockUsePersonReturn,
}));

describe("PersonList", () => {
  describe("when loading=true", () => {
    beforeEach(() => {
      usePersonMock.mockImplementation(() => ({
        ...mockUsePersonReturn,
        loading: true,
      }));
    });
    it("renders the Loading element when loading=true", async () => {
      renderPage();
      expect(screen.queryByText("Loading")).toBeInTheDocument();
    });
  });
  describe("when loading=false", () => {
    beforeEach(() => {
      usePersonMock.mockImplementation(() => ({
        ...mockUsePersonReturn,
        loading: false,
      }));
    });
    it("renders an Onboard Person Button", async () => {
      renderPage();
      expect(screen.queryByText("Onboard Person")).toBeInTheDocument();
    });
    it("renders a table with the correct headers", async () => {
      renderPage();
      expect(
        screen.queryByRole("columnheader", { name: "First Name" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("columnheader", { name: "Last Name" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("columnheader", { name: "External ID" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("columnheader", { name: "Current Role" })
      ).toBeInTheDocument();
    });
    it("renders a table with the correct number of rows", async () => {
      const mockPersons = [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          external_id: "123",
          active_role: {
            id: 1,
            },
        },
        {
          id: "2",
          first_name: "Jane",
          last_name: "Smith",
          external_id: "456",
        },
      ];
      usePersonMock.mockImplementation(() => ({
        ...mockUsePersonReturn,
        items: mockPersons,
      }));
      renderPage();
      expect(screen.queryAllByRole("row")).toHaveLength(3);
      for (const individual of mockPersons) {
        expect(
          screen.queryByRole("cell", { name: individual.first_name })
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("cell", { name: individual.last_name })
        ).toBeInTheDocument();
        expect(
          screen.queryByRole("cell", { name: individual.external_id })
        ).toBeInTheDocument();
      }
      expect(screen.queryByRole("cell", { name: "John" })).toBeInTheDocument();
    });
  });
  describe("onAddSubmit function", () => {
    it("should call the usePerson createItem function", async () => {
      const createMock = vi.fn();
      usePersonMock.mockImplementation(() => ({
        ...mockUsePersonReturn,
        createItem: createMock,
      }));
      renderPage();
      const addPersonButton = screen.getByText(
        "Onboard Person"
      ) as HTMLButtonElement;
      if (addPersonButton) {
        await userEvent.click(addPersonButton);
        await waitFor(() => {
          expect(
            screen.queryByText("First Name", { selector: "label" })
          ).toBeInTheDocument();
          expect(
            screen.queryByText("Last Name", { selector: "label" })
          ).toBeInTheDocument();
          expect(
            screen.queryByText("External ID", { selector: "label" })
          ).toBeInTheDocument();
        });
        const firstNameInput =
          screen.getByPlaceholderText<HTMLInputElement>("first name");
        const lastNameInput =
          screen.getByPlaceholderText<HTMLInputElement>("last name");
        const externalIdInput =
          screen.getByPlaceholderText<HTMLInputElement>("external ID");
        const submitButton = screen.getByRole("button", { name: "Add" });
        if (
          firstNameInput &&
          lastNameInput &&
          externalIdInput &&
          submitButton
        ) {
          const expectedPerson = {
            first_name: "Jim",
            last_name: "More",
            middle_names: "",
            external_id: "JXJ2222444",
          };
          const user = userEvent.setup();
          await user.clear(firstNameInput);
          await user.type(firstNameInput, expectedPerson.first_name);
          await user.clear(lastNameInput);
          await user.type(lastNameInput, expectedPerson.last_name);
          await user.clear(externalIdInput);
          await user.type(externalIdInput, expectedPerson.external_id);
          await user.click(submitButton);
          await waitFor(async () => {
            expect(createMock).toHaveBeenCalledTimes(1);
            expect(createMock).toHaveBeenCalledWith(expectedPerson);
          });
        }
      }
    });
  });
});
