import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Mock, vi } from "vitest";
import { act } from "react-dom/test-utils";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../../../test/UITestHelpers";
import PracticeHome from "./PracticeHome";
import { Practice, usePractice } from "../../../../Client/Practice";
import { Chapter, useChapter } from "../../../../Client/Chapter";
import userEvent from "@testing-library/user-event";

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

vi.mock("../../../../Client/Practice", () => {
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

vi.mock("../../../../Client/Chapter", () => {
  return {
    useChapter: vi.fn(),
  };
});
const mockUseChapterReturn = {
  loading: false,
  items: [],
};
const useChapterMock = useChapter as Mock;
useChapterMock.mockImplementation(() => ({
  ...mockUseChapterReturn,
}));

describe("PracticeHome", () => {
  it("should call usePractice with the practiceId", async () => {
    renderPage();
    expect(usePracticeMock).toHaveBeenCalledWith({ id: 2 });
  });
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
        id: 1,
        name: "Test Chapter",
        practice_id: 1,
        formed_date: new Date().toISOString(),
        type: "chapter",
      },
      {
        id: 2,
        name: "Test Chapter 2",
        practice_id: 1,
        formed_date: new Date().toISOString(),
        type: "chapter",
      },
    ];
    const mockPractice: Practice = {
      type: "practice",
      id: 1,
      name: "Test Practice",
      chapters: mockChapters,
      formed_date: new Date().toISOString(),
    };
    beforeEach(() => {
      usePracticeMock.mockImplementation(() => ({
        ...mockUsePracticeReturn,
        items: [mockPractice],
        loading: false,
      }));
      useChapterMock.mockImplementation(() => ({
        ...mockUseChapterReturn,
        items: mockChapters,
        loading: false,
      }));
    });
    it("renders a heading with the practice name", async () => {
      renderPage();
      expect(
        screen.getByRole("heading", {
          name: new RegExp(mockPractice.name, "i"),
        })
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
      id: 1,
      name: "Test Practice",
      formed_date: new Date().toISOString(),
      type: "practice",
    };
    const createItemMock = vi.fn();
    beforeEach(() => {
      useChapterMock.mockImplementation(() => ({
        ...mockUseChapterReturn,
        items: [],
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
        it("calls the usePractice's createItem function", async () => {
          const expectedChapter = {
            name: "New Chapter",
            formed_date: expect.anything(),
          };
          const submitButton = screen.getByRole("button", { name: "Add" });
          const nameInput = screen.getByPlaceholderText("chapter name");
          const user = userEvent.setup();
          await user.type(nameInput, expectedChapter.name);
          await user.click(submitButton);
          expect(createItemMock).toHaveBeenCalledTimes(1);
          expect(createItemMock).toHaveBeenCalledWith(expectedChapter);
          waitFor(() => expect(submitButton).not.toBeInTheDocument());
        });
      });
    });
  });
});
