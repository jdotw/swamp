import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Mock, vi } from "vitest";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../test/UITestHelpers";
import DeliveryRoleTypesHome from "./DeliveryRoleTypesHome";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/capability/roletypes"]}>
      <Routes>
        <Route path="/">
          <Route path="capability">
            <Route path="roletypes">
              <Route index element={<DeliveryRoleTypesHome />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );

vi.mock("../../Client/TribeRoleType", () => {
  return {
    useTribeRoleType: vi.fn(),
  };
});
const mockUseTribeRoleTypeReturn = {
  loading: false,
  items: [],
};
const useTribeRoleTypeMock = useTribeRoleType as Mock;
useTribeRoleTypeMock.mockImplementation(() => ({
  ...mockUseTribeRoleTypeReturn,
}));

vi.mock("../../Client/SquadRoleType", () => {
  return {
    useSquadRoleType: vi.fn(),
  };
});
const mockUseSquadRoleTypeReturn = {
  loading: false,
  items: [],
};
const useSquadRoleTypeMock = useSquadRoleType as Mock;
useSquadRoleTypeMock.mockImplementation(() => ({
  ...mockUseSquadRoleTypeReturn,
}));

describe("DeliveryRoleTypesHome", () => {
  it("should call useTribeRoleType", async () => {
    renderPage();
    expect(useTribeRoleTypeMock).toHaveBeenCalledTimes(1);
  });
  it("should call useSquadRoleType", async () => {
    renderPage();
    expect(useSquadRoleTypeMock).toHaveBeenCalledTimes(1);
  });
  describe("when loading=true for both role types", () => {
    beforeEach(() => {
      useTribeRoleTypeMock.mockImplementation(() => ({
        ...mockUseTribeRoleTypeReturn,
        loading: true,
      }));
      useSquadRoleTypeMock.mockImplementation(() => ({
        ...mockUseSquadRoleTypeReturn,
        loading: true,
      }));
    });
    it("renders the Loading element when loading=true", async () => {
      renderPage();
      expect(screen.queryByText("Loading")).toBeInTheDocument();
    });
  });
  describe("when loading=false", () => {
    const mockSquadRoleTypes: SquadRoleType[] = [
      {
        id: "1",
        name: "Test Squad Role Type",
      },
      {
        id: "2",
        name: "Test Squad Role Type 2",
      },
    ];
    const mockTribeRoleTypes: TribeRoleType[] = [
      {
        id: "1",
        name: "Test Tribe Role Type",
      },
      {
        id: "2",
        name: "Test Tribe Role Type 2",
      },
    ];
    beforeEach(() => {
      useTribeRoleTypeMock.mockImplementation(() => ({
        ...mockUseTribeRoleTypeReturn,
        items: mockTribeRoleTypes,
        loading: false,
      }));
      useSquadRoleTypeMock.mockImplementation(() => ({
        ...mockUseSquadRoleTypeReturn,
        items: mockSquadRoleTypes,
        loading: false,
      }));
    });
    it("renders a table of squad role types with the expected headers, rows and cells", async () => {
      renderPage();
      expectTableToHave({
        tableTestId: "squad-role-types-table",
        rowCount: mockSquadRoleTypes.length,
        headerLabels: ["Name"],
        cellContents: mockSquadRoleTypes
          .map((i) => [i.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
    it("renders a table of tribe role types with the expected headers, rows and cells", async () => {
      renderPage();
      expectTableToHave({
        tableTestId: "tribe-role-types-table",
        rowCount: mockTribeRoleTypes.length,
        headerLabels: ["Name"],
        cellContents: mockTribeRoleTypes
          .map((i) => [i.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
  });
  describe("Add Tribe Role Type Modal", () => {
    const createItemMock = vi.fn();
    beforeEach(() => {
      useTribeRoleTypeMock.mockImplementation(() => ({
        ...mockUseTribeRoleTypeReturn,
        createItem: createItemMock,
      }));
      renderPage();
      const addButton = screen.getByRole("button", {
        name: "Add Tribe Role Type",
      });
      fireEvent.click(addButton);
    });
    describe("when Add Tribe Role Type is clicked", () => {
      it("renders the modal", async () => {
        expect(
          screen.getByPlaceholderText("tribe role type name")
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      });
      describe("when the form is filled out and Add is clicked", () => {
        it("calls the useTribeRoleType's createItem function", async () => {
          const nameInput = screen.getByPlaceholderText("tribe role type name");
          const submitButton = screen.getByRole("button", { name: "Add" });
          fireEvent.change(nameInput, {
            target: { value: "New Tribe Role Type" },
          });
          await act(async () => {
            fireEvent.click(submitButton);
          });
          expect(createItemMock).toHaveBeenCalledTimes(1);
          expect(submitButton).not.toBeInTheDocument();
        });
      });
    });
  });
  describe("Add Squad Role Type Modal", () => {
    const createItemMock = vi.fn();
    beforeEach(() => {
      useSquadRoleTypeMock.mockImplementation(() => ({
        ...mockUseSquadRoleTypeReturn,
        createItem: createItemMock,
      }));
      renderPage();
      const addButton = screen.getByRole("button", {
        name: "Add Squad Role Type",
      });
      fireEvent.click(addButton);
    });
    describe("when Add Squad Role Type is clicked", () => {
      it("renders the modal", async () => {
        expect(
          screen.getByPlaceholderText("squad role type name")
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      });
      describe("when the form is filled out and Add is clicked", () => {
        it("calls the useSquadRoleType's createItem function", async () => {
          const nameInput = screen.getByPlaceholderText("squad role type name");
          const submitButton = screen.getByRole("button", { name: "Add" });
          fireEvent.change(nameInput, {
            target: { value: "New Squad Role Type" },
          });
          await act(async () => {
            fireEvent.click(submitButton);
          });
          expect(createItemMock).toHaveBeenCalledTimes(1);
          expect(submitButton).not.toBeInTheDocument();
        });
      });
    });
  });
});
