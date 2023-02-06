import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../../test/UITestHelpers";
import TribeList from "./TribeList";
import { MutateTribe, Tribe, useTribe } from "../../../Client/Tribe";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter>
      <TribeList />
    </MemoryRouter>
  );

vi.mock("../../../Client/Tribe", () => {
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

describe("TribeList", () => {
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
  describe("when loading=false", () => {
    beforeEach(() => {
      useTribeMock.mockImplementation(() => ({
        ...mockUseTribeReturn,
        loading: false,
      }));
    });
    it("renders an Add Tribe Button", async () => {
      renderPage();
      expect(screen.queryByText("Add Tribe")).toBeInTheDocument();
    });
  });
  it("renders a table with the correct row count, headers and cells", async () => {
    const mockTribes: Tribe[] = [
      {
        id: 1,
        name: "This Tribe",
        squads: [],
        type: "tribe",
        formed_date: new Date().toISOString(),
      },
      {
        id: 2,
        name: "That Tribe",
        squads: [],
        type: "tribe",
        formed_date: new Date().toISOString(),
      },
    ];
    useTribeMock.mockImplementation(() => ({
      ...mockUseTribeReturn,
      items: mockTribes,
    }));
    renderPage();
    expectTableToHave({
      rowCount: mockTribes.length,
      headerLabels: ["Name"],
      cellContents: mockTribes
        .map((c) => [c.name])
        .reduce((a, v) => a.concat(v), []),
    });
  });
  describe("submitNewTribe function", () => {
    it("should call the useTribe create function", async () => {
      const createMock = vi.fn();
      useTribeMock.mockImplementation(() => ({
        ...mockUseTribeReturn,
        createItem: createMock,
      }));
      renderPage();
      const addTribeButton = screen.getByText("Add Tribe") as HTMLButtonElement;
      if (addTribeButton) {
        await userEvent.click(addTribeButton);
        await waitFor(() => {
          expect(
            screen.queryByText("Name", { selector: "label" })
          ).toBeInTheDocument();
        });
        const nameInput =
          screen.getByPlaceholderText<HTMLInputElement>("tribe name");
        const submitButton = screen.getByRole("button", {
          name: "Add",
        });
        if (nameInput && submitButton) {
          const expectedTribe: MutateTribe = {
            name: "Updated Tribe",
            formed_date: expect.anything(),
          };
          const user = userEvent.setup();
          await user.clear(nameInput);
          await user.type(nameInput, expectedTribe.name);
          await user.click(submitButton);
          await waitFor(async () => {
            expect(createMock).toHaveBeenCalledTimes(1);
            expect(createMock).toHaveBeenCalledWith(expectedTribe);
          });
        }
      }
    });
  });
});
