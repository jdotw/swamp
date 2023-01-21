import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Mock, vi } from "vitest";
import { act } from "react-dom/test-utils";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../../../test/UITestHelpers";
import TribeHome from "./TribeHome";
import { Tribe, useTribe } from "../../../../Client/Tribe";
import { Squad, useSquad } from "../../../../Client/Squad";
import userEvent from "@testing-library/user-event";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/delivery/tribes/2"]}>
      <Routes>
        <Route path="/">
          <Route path="delivery">
            <Route path="tribes">
              <Route path=":tribeId" element={<TribeHome />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );

vi.mock("../../../../Client/Tribe", () => {
  return {
    useTribe: vi.fn(),
  };
});
const mockUseTribeReturn = {
  loading: false,
  items: [],
};
const useTribeMock = useTribe as Mock;
useTribeMock.mockImplementation(() => ({
  ...mockUseTribeReturn,
}));

vi.mock("../../../../Client/Squad", () => {
  return {
    useSquad: vi.fn(),
  };
});
const mockUseSquadReturn = {
  loading: false,
  items: [],
};
const useSquadMock = useSquad as Mock;
useSquadMock.mockImplementation(() => ({
  ...mockUseSquadReturn,
}));

describe("TribeHome", () => {
  it("should call useTribe with the tribeId", async () => {
    renderPage();
    expect(useTribeMock).toHaveBeenCalledWith({ id: 2 });
  });
  describe("when loading=true", () => {
    beforeEach(() => {
      useTribeMock.mockImplementation(() => ({
        ...mockUseTribeReturn,
        loading: true,
      }));
    });
    it("renders the Loading element when loading=true", async () => {
      renderPage();
      expect(screen.queryByText("Loading")).toBeInTheDocument();
    });
  });
  describe("when the Tribe is not found", () => {
    beforeEach(() => {
      useTribeMock.mockImplementation(() => ({
        ...mockUseTribeReturn,
        items: [],
        loading: false,
      }));
    });
    it("renders the Not Found element when loading=false and an tribe is not found", async () => {
      renderPage();
      expect(screen.getByText("Tribe not found")).toBeInTheDocument();
    });
    it("does not render tables", async () => {
      renderPage();
      expect(screen.queryAllByRole("table")).toHaveLength(0);
    });
  });

  describe("when loading=false and a Tribe is found", () => {
    const mockSquads: Squad[] = [
      {
        id: 1,
        name: "Test Squad",
        tribe_id: 1,
        formed_date: new Date().toISOString(),
        type: "squad",
        functions: [],
      },
      {
        id: 2,
        name: "Test Squad 2",
        tribe_id: 1,
        formed_date: new Date().toISOString(),
        type: "squad",
        functions: [],
      },
    ];
    const mockTribe: Tribe = {
      type: "tribe",
      id: 1,
      name: "Test Tribe",
      squads: mockSquads,
      functions: [],
      formed_date: new Date().toISOString(),
    };
    beforeEach(() => {
      useTribeMock.mockImplementation(() => ({
        ...mockUseTribeReturn,
        items: [mockTribe],
        loading: false,
      }));
      useSquadMock.mockImplementation(() => ({
        ...mockUseSquadReturn,
        items: mockSquads,
        loading: false,
      }));
    });
    it("renders a heading with the tribe name", async () => {
      renderPage();
      expect(
        screen.getByRole("heading", {
          name: new RegExp(mockTribe.name, "i"),
        })
      ).toBeInTheDocument();
    });
    it("renders a table of squads with the expected headers, rows and cells", async () => {
      renderPage();
      expectTableToHave({
        tableTestId: "squads-table",
        rowCount: mockSquads.length,
        headerLabels: ["Name"],
        cellContents: mockSquads
          .map((i) => [i.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
  });
  describe("Add Squad Modal", () => {
    const createItemMock = vi.fn();
    beforeEach(() => {
      useSquadMock.mockImplementation(() => ({
        ...mockUseSquadReturn,
        items: [],
        loading: false,
        createItem: createItemMock,
      }));
      renderPage();
      const addButton = screen.getByRole("button", { name: "Add Squad" });
      fireEvent.click(addButton);
    });
    describe("when Add Squad is clicked", () => {
      it("renders the modal", async () => {
        expect(screen.getByPlaceholderText("squad name")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      });
      describe("when the form is filled out and Add is clicked", () => {
        it("calls the useTribe's createItem function", async () => {
          const expectedSquad = {
            name: "New Squad",
            formed_date: expect.anything(),
          };
          const submitButton = screen.getByRole("button", { name: "Add" });
          const nameInput = screen.getByPlaceholderText("squad name");
          const user = userEvent.setup();
          await user.type(nameInput, expectedSquad.name);
          await user.click(submitButton);
          expect(createItemMock).toHaveBeenCalledTimes(1);
          expect(createItemMock).toHaveBeenCalledWith(expectedSquad);
          waitFor(() => expect(submitButton).not.toBeInTheDocument());
        });
      });
    });
  });
});
