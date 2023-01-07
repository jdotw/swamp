import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Mock, vi } from "vitest";
import { act } from "react-dom/test-utils";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../../test/UITestHelpers";
import PracticeHome from "./PracticeHome";
import { Practice, usePractice } from "../../../Client/Practice";
import { Chapter } from "../../../Client/Chapter";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/capability/practices/2"]}>
      <Routes>
        <Route path="/">
          <Route path="capability">
            <Route path="practices">
              <Route path=":practiceId" element={<PracticeHome />} />
            </Route>
          </Route>
        </Route>
      </Routes>
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

describe("PracticeHome", () => {
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
  describe("when the Practice is not found", () => {
    beforeEach(() => {
      usePracticeMock.mockImplementation(() => ({
        ...mockUsePracticeReturn,
        items: [],
        loading: false,
      }));
    });
    it("renders the Not Found element when loading=false and an practice is not found", async () => {
      renderPage();
      expect(screen.getByText("Practice not found")).toBeInTheDocument();
    });
    it("does not render tables", async () => {
      renderPage();
      expect(screen.queryAllByRole("table")).toHaveLength(0);
    });
  });

  describe("when loading=false and a Practice is found", () => {
    const mockChapters: Chapter[] = [
      {
        id: "1",
        name: "Test Chapter",
      },
      {
        id: "2",
        name: "Test Chapter 2",
      },
    ];
    const mockPractice: Practice = {
      id: "1",
      name: "Test Practice",
      chapters: mockChapters,
    };
    beforeEach(() => {
      usePracticeMock.mockImplementation(() => ({
        ...mockUsePracticeReturn,
        items: [mockPractice],
        loading: false,
      }));
    });
    it("renders a heading with the practice name", async () => {
      renderPage();
      expect(
        screen.getByRole("heading", { name: /Test Practice/i })
      ).toBeInTheDocument();
    });
    it("renders a table of chapters with the expected headers, rows and cells", async () => {
      renderPage();
      expectTableToHave({
        tableTestId: "chapters-table",
        rowCount: mockChapters.length,
        headerLabels: ["Name"],
        cellContents: mockChapters
          .map((i) => [i.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
  });
  describe("Add Chapter Modal", () => {
    const mockPractice: Practice = {
      id: "1",
      name: "Test Practice",
      chapters: [],
    };
    const createItemMock = vi.fn();
    beforeEach(() => {
      usePracticeMock.mockImplementation(() => ({
        ...mockUsePracticeReturn,
        items: [mockPractice],
        loading: false,
        createItem: createItemMock,
      }));
      renderPage();
      const addButton = screen.getByRole("button", { name: "Add Chapter" });
      fireEvent.click(addButton);
    });
    describe("when Add Chapter is clicked", () => {
      it("renders the modal", async () => {
        expect(screen.getByPlaceholderText("chapter name")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      });
      describe("when the form is filled out and Add is clicked", () => {
        it("calls the usePractice's updateItem function", async () => {
          const nameInput = screen.getByPlaceholderText("chapter name");
          const submitButton = screen.getByRole("button", { name: "Add" });
          fireEvent.change(nameInput, { target: { value: "New Chapter" } });
          fireEvent.click(submitButton);
          expect(createItemMock).toHaveBeenCalledTimes(1);
          waitFor(() => expect(submitButton).not.toBeInTheDocument());
        });
      });
    });
  });
});
