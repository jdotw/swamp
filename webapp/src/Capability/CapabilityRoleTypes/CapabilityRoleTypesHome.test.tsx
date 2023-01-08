import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Mock, vi } from "vitest";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../test/UITestHelpers";
import {
  ChapterRoleType,
  useChapterRoleType,
} from "../../Client/ChapterRoleType";
import {
  PracticeRoleType,
  usePracticeRoleType,
} from "../../Client/PracticeRoleType";
import CapabilityRoleTypesHome from "./CapabilityRoleTypesHome";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/capability/roletypes"]}>
      <Routes>
        <Route path="/">
          <Route path="capability">
            <Route path="roletypes">
              <Route index element={<CapabilityRoleTypesHome />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );

vi.mock("../../Client/PracticeRoleType", () => {
  return {
    usePracticeRoleType: vi.fn(),
  };
});
const mockUsePracticeRoleTypeReturn = {
  loading: false,
  items: [],
};
const usePracticeRoleTypeMock = usePracticeRoleType as Mock;
usePracticeRoleTypeMock.mockImplementation(() => ({
  ...mockUsePracticeRoleTypeReturn,
}));

vi.mock("../../Client/ChapterRoleType", () => {
  return {
    useChapterRoleType: vi.fn(),
  };
});
const mockUseChapterRoleTypeReturn = {
  loading: false,
  items: [],
};
const useChapterRoleTypeMock = useChapterRoleType as Mock;
useChapterRoleTypeMock.mockImplementation(() => ({
  ...mockUseChapterRoleTypeReturn,
}));

describe("CapabilityRoleTypesHome", () => {
  it("should call usePracticeRoleType", async () => {
    renderPage();
    expect(usePracticeRoleTypeMock).toHaveBeenCalledTimes(1);
  });
  it("should call useChapterRoleType", async () => {
    renderPage();
    expect(useChapterRoleTypeMock).toHaveBeenCalledTimes(1);
  });
  describe("when loading=true for both role types", () => {
    beforeEach(() => {
      usePracticeRoleTypeMock.mockImplementation(() => ({
        ...mockUsePracticeRoleTypeReturn,
        loading: true,
      }));
      useChapterRoleTypeMock.mockImplementation(() => ({
        ...mockUseChapterRoleTypeReturn,
        loading: true,
      }));
    });
    it("renders the Loading element when loading=true", async () => {
      renderPage();
      expect(screen.queryByText("Loading")).toBeInTheDocument();
    });
  });
  describe("when loading=false", () => {
    const mockChapterRoleTypes: ChapterRoleType[] = [
      {
        id: "1",
        name: "Test Chapter Role Type",
      },
      {
        id: "2",
        name: "Test Chapter Role Type 2",
      },
    ];
    const mockPracticeRoleTypes: PracticeRoleType[] = [
      {
        id: "1",
        name: "Test Practice Role Type",
      },
      {
        id: "2",
        name: "Test Practice Role Type 2",
      },
    ];
    beforeEach(() => {
      usePracticeRoleTypeMock.mockImplementation(() => ({
        ...mockUsePracticeRoleTypeReturn,
        items: mockPracticeRoleTypes,
        loading: false,
      }));
      useChapterRoleTypeMock.mockImplementation(() => ({
        ...mockUseChapterRoleTypeReturn,
        items: mockChapterRoleTypes,
        loading: false,
      }));
    });
    it("renders a table of chapter role types with the expected headers, rows and cells", async () => {
      renderPage();
      expectTableToHave({
        tableTestId: "chapter-role-types-table",
        rowCount: mockChapterRoleTypes.length,
        headerLabels: ["Name"],
        cellContents: mockChapterRoleTypes
          .map((i) => [i.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
    it("renders a table of practice role types with the expected headers, rows and cells", async () => {
      renderPage();
      expectTableToHave({
        tableTestId: "practice-role-types-table",
        rowCount: mockPracticeRoleTypes.length,
        headerLabels: ["Name"],
        cellContents: mockPracticeRoleTypes
          .map((i) => [i.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
  });
  describe("Add Practice Role Type Modal", () => {
    const createItemMock = vi.fn();
    beforeEach(() => {
      usePracticeRoleTypeMock.mockImplementation(() => ({
        ...mockUsePracticeRoleTypeReturn,
        createItem: createItemMock,
      }));
      renderPage();
      const addButton = screen.getByRole("button", {
        name: "Add Practice Role Type",
      });
      fireEvent.click(addButton);
    });
    describe("when Add Practice Role Type is clicked", () => {
      it("renders the modal", async () => {
        expect(
          screen.getByPlaceholderText("practice role type name")
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      });
      describe("when the form is filled out and Add is clicked", () => {
        it("calls the usePracticeRoleType's createItem function", async () => {
          const nameInput = screen.getByPlaceholderText(
            "practice role type name"
          );
          const submitButton = screen.getByRole("button", { name: "Add" });
          fireEvent.change(nameInput, {
            target: { value: "New Practice Role Type" },
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
  describe("Add Chapter Role Type Modal", () => {
    const createItemMock = vi.fn();
    beforeEach(() => {
      useChapterRoleTypeMock.mockImplementation(() => ({
        ...mockUseChapterRoleTypeReturn,
        createItem: createItemMock,
      }));
      renderPage();
      const addButton = screen.getByRole("button", {
        name: "Add Chapter Role Type",
      });
      fireEvent.click(addButton);
    });
    describe("when Add Chapter Role Type is clicked", () => {
      it("renders the modal", async () => {
        expect(
          screen.getByPlaceholderText("chapter role type name")
        ).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
      });
      describe("when the form is filled out and Add is clicked", () => {
        it("calls the useChapterRoleType's createItem function", async () => {
          const nameInput = screen.getByPlaceholderText(
            "chapter role type name"
          );
          const submitButton = screen.getByRole("button", { name: "Add" });
          fireEvent.change(nameInput, {
            target: { value: "New Chapter Role Type" },
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
