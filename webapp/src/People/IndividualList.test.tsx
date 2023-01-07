import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import { useIndividual } from "../Client/Individual";
import { addTestPolyfills } from "../TestHelpers/UITestHelpers";
import IndividualList from "./IndividualList";
import userEvent from "@testing-library/user-event";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter>
      <IndividualList />
    </MemoryRouter>
  );

vi.mock("../Client/Individual", () => {
  return {
    useIndividual: vi.fn(),
  };
});

const mockUseIndividualReturn = {
  loading: false,
  items: [],
};
const useIndividualMock = useIndividual as Mock;
useIndividualMock.mockImplementation(() => ({
  ...mockUseIndividualReturn,
}));

describe("IndividualList", () => {
  describe("when loading=true", () => {
    beforeEach(() => {
      useIndividualMock.mockImplementation(() => ({
        ...mockUseIndividualReturn,
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
      useIndividualMock.mockImplementation(() => ({
        ...mockUseIndividualReturn,
        loading: false,
      }));
    });
    it("renders an Onboard Individual Button", async () => {
      renderPage();
      expect(screen.queryByText("Onboard Individual")).toBeInTheDocument();
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
    });
    it("renders a table with the correct number of rows", async () => {
      const mockIndividuals = [
        {
          id: "1",
          first_name: "John",
          last_name: "Doe",
          external_id: "123",
        },
        {
          id: "2",
          first_name: "Jane",
          last_name: "Smith",
          external_id: "456",
        },
      ];
      useIndividualMock.mockImplementation(() => ({
        ...mockUseIndividualReturn,
        items: mockIndividuals,
      }));
      renderPage();
      expect(screen.queryAllByRole("row")).toHaveLength(3);
      for (const individual of mockIndividuals) {
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
    it("should call the useIndividual create function", async () => {
      const createMock = vi.fn();
      useIndividualMock.mockImplementation(() => ({
        ...mockUseIndividualReturn,
        createItem: createMock,
      }));
      renderPage();
      const addIndividualButton = screen.getByText(
        "Onboard Individual"
      ) as HTMLButtonElement;
      if (addIndividualButton) {
        act(() => {
          addIndividualButton.click();
        });
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
          const expectedIndividual = {
            first_name: "Jim",
            last_name: "More",
            middle_names: "",
            external_id: "JXJ2222444",
          };
          await act(async () => {
            const user = userEvent.setup();
            await user.clear(firstNameInput);
            await user.type(firstNameInput, expectedIndividual.first_name);
            await user.clear(lastNameInput);
            await user.type(lastNameInput, expectedIndividual.last_name);
            await user.clear(externalIdInput);
            await user.type(externalIdInput, expectedIndividual.external_id);
            submitButton.click();
          });
          await waitFor(async () => {
            expect(createMock).toHaveBeenCalledTimes(1);
            expect(createMock).toHaveBeenCalledWith(expectedIndividual);
          });
        }
      }
    });
  });
});
