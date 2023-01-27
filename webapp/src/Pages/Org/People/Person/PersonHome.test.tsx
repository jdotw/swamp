import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Mock, vi } from "vitest";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../../../test/UITestHelpers";
import PersonHome from "./PersonHome";
import { usePerson } from "../../../../Client/Person";
import { act } from "react-dom/test-utils";
import { useRoleAssignment } from "../../../../Client/RoleAssignment";

addTestPolyfills();

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/org/people/2"]}>
      <Routes>
        <Route path="/">
          <Route path="org">
            <Route path="people">
              <Route path=":personId" element={<PersonHome />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );

vi.mock("../../../../Client/Person", () => {
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

vi.mock("../../../../Client/RoleAssignment", () => {
  return {
    useRoleAssignment: vi.fn(),
  };
});
const mockUseRoleAssignmentReturn = {
  loading: false,
  items: [],
};
const useRoleAssignmentMock = useRoleAssignment as Mock;
useRoleAssignmentMock.mockImplementation(() => ({
  ...mockUseRoleAssignmentReturn,
}));

describe("PersonHome", () => {
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
  describe("when the individual is not found", () => {
    beforeEach(() => {
      usePersonMock.mockImplementation(() => ({
        ...mockUsePersonReturn,
        items: [],
        loading: false,
      }));
    });
    it("renders the Not Found element when loading=false and an individual is not found", async () => {
      renderPage();
      expect(screen.getByText("Person not found")).toBeInTheDocument();
    });
    it("does not render tables", async () => {
      renderPage();
      expect(screen.getByText("Person not found")).toBeInTheDocument();
      expect(screen.queryAllByRole("table")).toHaveLength(0);
    });
  });

  // describe("when loading=false and an individual is found", () => {
  //   const mockPerson = {
  //     id: 1,
  //     first_name: "John",
  //     last_name: "Doe",
  //     external_id: "1234",
  //   };
  //   beforeEach(() => {
  //     usePersonMock.mockImplementation(() => ({
  //       ...mockUsePersonReturn,
  //       items: [mockPerson],
  //       loading: false,
  //     }));
  //   });
  //   it("renders a table with the expected headers, rows and cells", async () => {
  //     usePersonMock.mockImplementation(() => ({
  //       ...mockUsePersonReturn,
  //       items: [mockPerson],
  //     }));
  //     renderPage();
  //     expectTableToHave({
  //       rowCount: 0,
  //       headerLabels: ["Type", "Group", "Title", "Tenure"],
  //       cellContents: [],
  //     });
  //   });
  // });
  describe("Edit Modal", () => {
    const mockPerson = {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      external_id: "1234",
    };
    const updateItemMock = vi.fn();
    beforeEach(() => {
      usePersonMock.mockImplementation(() => ({
        ...mockUsePersonReturn,
        items: [mockPerson],
        loading: false,
        updateItem: updateItemMock,
      }));
      renderPage();
      const editButton = screen.getByRole("button", { name: "Edit" });
      act(() => editButton.click());
    });
    describe("when Edit is clicked", () => {
      it("renders the modal", async () => {
        expect(screen.getByPlaceholderText("first name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("last name")).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Save" })
        ).toBeInTheDocument();
      });
      describe("when Save is clicked", () => {
        it("calls the usePerson's updateItem function", async () => {
          const firstNameInput = screen.getByPlaceholderText("first name");
          const lastNameInput = screen.getByPlaceholderText("last name");
          const submitButton = screen.getByRole("button", { name: "Save" });
          await act(async () => {
            fireEvent.change(firstNameInput, { target: { value: "Jane" } });
            fireEvent.change(lastNameInput, { target: { value: "Doe" } });
            submitButton.click();
          });
          expect(updateItemMock).toHaveBeenCalled();
          waitFor(() => expect(submitButton).not.toBeInTheDocument());
        });
      });
    });
  });
});

const mockPracticeRoles = [
  {
    id: 1,
    practice: {
      id: 3,
      name: "Practice 1",
    },
    individual_id: 12,
    practice_role_type: {
      id: 123432,
      name: "Role 1",
    },
  },
  {
    id: 2,
    practice: {
      id: 4,
      name: "Practice 2",
    },
    individual_id: 44,
    practice_role_type: {
      id: 123431,
      name: "Role 2",
    },
    start_date: "2020-01-01",
    end_date: "2020-02-01",
  },
];
const mockChapterRoles = [
  {
    id: 1,
    chapter: {
      id: 3,
      name: "Chapter 1",
    },
    individual_id: 12,
    chapter_role_type: {
      id: 123432,
      name: "Role 1",
    },
    start_date: "2020-01-01",
  },
  {
    id: 2,
    chapter: {
      id: 453,
      name: "Chapter 16",
    },
    individual_id: 1634,
    chapter_role_type: {
      id: 12342,
      name: "Role 12",
    },
    start_date: "2020-01-01",
    end_date: "2020-02-01",
  },
];
const mockTribeRoles = [
  {
    id: 1,
    tribe: {
      id: 3,
      name: "Tribe 1",
    },
    individual_id: 12,
    tribe_role_type: {
      id: 123432,
      name: "Role 1",
    },
    start_date: "2020-01-01",
    end_date: "2020-02-01",
  },
  {
    id: 3,
    tribe: {
      id: 645,
      name: "Tribe DFSA",
    },
    individual_id: 12,
    tribe_role_type: {
      id: 12656,
      name: "Role 123",
    },
    start_date: "2020-01-01",
  },
];
const mockSquadRoles = [
  {
    id: 1,
    squad: {
      id: 3,
      name: "Squad 1",
    },
    individual_id: 12,
    squad_role_type: {
      id: 123432,
      name: "Role 1",
    },
    start_date: "2020-01-01",
    end_date: "2020-02-01",
  },
  {
    id: 1432,
    squad: {
      id: 322,
      name: "Squad 71",
    },
    individual_id: 523412,
    squad_role_type: {
      id: 32,
      name: "Role 1333",
    },
    start_date: "2020-01-01",
  },
];
