import { act, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../../test/UITestHelpers";
import PracticeList from "./PracticeList";
import {
  MutatePractice,
  Practice,
  usePractice,
} from "../../../Client/Practice";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter>
      <PracticeList />
    </MemoryRouter>
  );

vi.mock("../../../Client/Practice", () => {
  return {
    usePractice: vi.fn(),
  };
});

const mockUsePracticeReturn = {
  loading: false,
  items: [],
};
const usePracticeMock = usePractice as Mock;
usePracticeMock.mockImplementation(() => ({
  ...mockUsePracticeReturn,
}));

describe("PracticeList", () => {
  describe("when loading=true", () => {
    beforeEach(() => {
      usePracticeMock.mockImplementation(() => ({
        ...mockUsePracticeReturn,
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
      usePracticeMock.mockImplementation(() => ({
        ...mockUsePracticeReturn,
        loading: false,
      }));
    });
    it("renders an Add Practice Button", async () => {
      renderPage();
      expect(screen.queryByText("Add Practice")).toBeInTheDocument();
    });
  });
  it("renders a table with the correct row count, headers and cells", async () => {
    const mockPractices: Practice[] = [
      {
        id: 1,
        name: "This Practice",
        chapters: [],
        type: "practice",
        formed_date: new Date().toISOString(),
        functions: [],
      },
      {
        id: 2,
        name: "That Practice",
        chapters: [],
        type: "practice",
        formed_date: new Date().toISOString(),
        functions: [],
      },
    ];
    usePracticeMock.mockImplementation(() => ({
      ...mockUsePracticeReturn,
      items: mockPractices,
    }));
    renderPage();
    expectTableToHave({
      rowCount: mockPractices.length,
      headerLabels: ["Name"],
      cellContents: mockPractices
        .map((c) => [c.name])
        .reduce((a, v) => a.concat(v), []),
    });
  });
  describe("onAddSubmit function", () => {
    it("should call the usePractice create function", async () => {
      const createMock = vi.fn();
      usePracticeMock.mockImplementation(() => ({
        ...mockUsePracticeReturn,
        createItem: createMock,
      }));
      renderPage();
      const addPracticeButton = screen.getByText(
        "Add Practice"
      ) as HTMLButtonElement;
      if (addPracticeButton) {
        await userEvent.click(addPracticeButton);
        await waitFor(() => {
          expect(
            screen.queryByText("Name", { selector: "label" })
          ).toBeInTheDocument();
        });
        const nameInput =
          screen.getByPlaceholderText<HTMLInputElement>("practice name");
        const submitButton = screen.getByRole("button", {
          name: "Add",
        });
        if (nameInput && submitButton) {
          const expectedPractice: MutatePractice = {
            name: "Updated Practice",
            formed_date: expect.anything(),
          };
          const user = userEvent.setup();
          await user.clear(nameInput);
          await user.type(nameInput, expectedPractice.name);
          await user.click(submitButton);
          await waitFor(async () => {
            expect(createMock).toHaveBeenCalledTimes(1);
            expect(createMock).toHaveBeenCalledWith(expectedPractice);
          });
        }
      }
    });
  });
});
