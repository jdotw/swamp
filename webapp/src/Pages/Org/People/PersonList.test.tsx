import { act, queryByRole, queryByTestId, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import { Person, usePerson } from "@/Client/Person";
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

vi.mock("@/Client/Person", () => {
  return {
    usePerson: vi.fn(),
  };
});

const mockPersons: Person[] = [
  {
    "id": 1,
    "external_id": "5678",
    "first_name": "James",
    "middle_names": "",
    "last_name": "Wilson",
    "active_role_assignment": {
      "id": 1,
      "role_id": 1,
      "role": {
        "id": 1,
        "open_from_date": "2023-04-22T03:57:32.617777+00:00",
        "closed_at_date": null,
        "role_type": {
          "parent": undefined,
          "children": [],
          "capability_types": [],
          "id": 2,
          "name": "Software Engineer",
          "active_from_date": "2023-04-22T01:28:13.920098+00:00",
          "retired_at_date": "0001-01-01T00:00:00+00:00",
          "parent_id": 1
        },
        "active_level_assignment": {
          "id": 1,
          "level_id": 5,
          "level": undefined,
          "role_id": 1,
          "role": null,
          "start_date": "2023-04-22T03:57:32.617856+00:00",
          "end_date": null
        },
        "active_role_assignment": undefined,
        "active_manager_assignment": {
          "role": undefined,
          "manager": {
            "id": 3,
            "open_from_date": "2023-04-29T02:55:23.398991+00:00",
            "closed_at_date": undefined,
            "role_type": {
              "parent": undefined,
              "children": [],
              "capability_types": [],
              "id": 14,
              "name": "Quality Engineer",
              "active_from_date": "2023-04-22T02:27:09.702245+00:00",
              "retired_at_date": "0001-01-01T00:00:00+00:00",
              "parent_id": 1
            },
            "active_level_assignment": {
              "id": 3,
              "level_id": 5,
              "level": undefined,
              "role_id": 3,
              "role": undefined,
              "start_date": "2023-04-29T02:55:23.399173+00:00",
              "end_date": undefined
            },
            "active_role_assignment": {
              "id": 3,
              "role_id": 3,
              "role": undefined,
              "person_id": 3,
              "person": {
                "id": 3,
                "external_id": "4",
                "first_name": "Tammy",
                "middle_names": undefined,
                "last_name": "Mitchell",
                "active_role_assignment": undefined
              },
              "start_date": "2023-04-29T02:55:29.276321+00:00",
              "end_date": undefined
            },
            "active_manager_assignment": undefined
          },
          "id": 7,
          "role_id": 1,
          "manager_id": 3,
          "start_date": "2023-04-29T03:06:19.580278+00:00",
          "end_date": undefined
        }
      },
      "person_id": 1,
      "person": undefined,
      "start_date": "2023-04-22T04:45:12.245662+00:00",
      "end_date": undefined
    }
  },
  {
    "id": 3,
    "external_id": "4",
    "first_name": "Tammy",
    "middle_names": undefined,
    "last_name": "Mitchell",
    "active_role_assignment": {
      "id": 3,
      "role_id": 3,
      "role": {
        "id": 3,
        "open_from_date": "2023-04-29T02:55:23.398991+00:00",
        "closed_at_date": null,
        "role_type": {
          "parent": undefined,
          "children": [],
          "capability_types": [],
          "id": 14,
          "name": "Quality Engineer",
          "active_from_date": "2023-04-22T02:27:09.702245+00:00",
          "retired_at_date": "0001-01-01T00:00:00+00:00",
          "parent_id": 1
        },
        "active_level_assignment": {
          "id": 3,
          "level_id": 5,
          "level": undefined,
          "role_id": 3,
          "role": null,
          "start_date": "2023-04-29T02:55:23.399173+00:00",
          "end_date": null
        },
        "active_role_assignment": undefined,
        "active_manager_assignment": undefined
      },
      "person_id": 3,
      "person": undefined,
      "start_date": "2023-04-29T02:55:29.276321+00:00",
      "end_date": undefined
    }
  }];
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
        screen.queryByRole("columnheader", { name: "Role" })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole("columnheader", { name: "Manager" })
      ).toBeInTheDocument();
    });
    it("renders a table with the correct number of rows", async () => {
      usePersonMock.mockImplementation(() => ({
        ...mockUsePersonReturn,
        items: mockPersons,
      }));
      renderPage();
      expect(screen.queryAllByRole("row")).toHaveLength(mockPersons.length + 1);
      for (const individual of mockPersons) {
        const row = screen.queryByTestId(`person-${individual.id}`);
        expect(
          queryByRole(row!, "cell", { name: individual.first_name })
        ).toBeInTheDocument();
        expect(
          queryByRole(row!, "cell", { name: individual.last_name })
        ).toBeInTheDocument();
        expect(
          queryByRole(row!, "cell", { name: individual.external_id })
        ).toBeInTheDocument();
        expect(
          queryByRole(row!, "cell", { name: individual.active_role_assignment.role.role_type?.name })
        ).toBeInTheDocument();
        expect(
          queryByRole(row!, "cell", { name: individual.active_role_assignment.role.active_manager_assignment?.manager.active_role_assignment?.person.first_name ?? "unassigned" })
        ).toBeInTheDocument();
      }
    });
    describe("role column", () => {
      it("links to the persons role", async () => {
        usePersonMock.mockImplementation(() => ({
          ...mockUsePersonReturn,
          items: mockPersons,
        }));
        renderPage();
        for (const individual of mockPersons) {
          const row = screen.queryByTestId(`person-${individual.id}`);
          expect(
            queryByTestId(row!, "role-column-link")
          ).toHaveAttribute("href", `/org/roles/${individual.active_role_assignment.role.id}`);
        }
      });
    });
  });
  describe("onAddSubmit function", async () => {
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
        // await act(async () => {
        await userEvent.click(addPersonButton);
        // });
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
        const middleNameInput =
          screen.getByPlaceholderText<HTMLInputElement>("middle names (optional)");
        const lastNameInput =
          screen.getByPlaceholderText<HTMLInputElement>("last name");
        const externalIdInput =
          screen.getByPlaceholderText<HTMLInputElement>("external ID");
        const submitButton = screen.getByRole("button", { name: "Add" });
        if (
          firstNameInput &&
          lastNameInput &&
          middleNameInput &&
          externalIdInput &&
          submitButton
        ) {
          const expectedPerson = {
            first_name: "Jim",
            last_name: "More",
            middle_names: "Bob",
            external_id: "JXJ2222444",
          };
          const user = userEvent.setup();
          // await act(async () => {
          await user.clear(firstNameInput);
          await user.type(firstNameInput, expectedPerson.first_name);
          await user.clear(middleNameInput);
          await user.type(middleNameInput, expectedPerson.middle_names);
          await user.clear(lastNameInput);
          await user.type(lastNameInput, expectedPerson.last_name);
          await user.clear(externalIdInput);
          await user.type(externalIdInput, expectedPerson.external_id);
          await user.click(submitButton);
          // });
          await waitFor(async () => {
            expect(createMock).toHaveBeenCalledTimes(1);
            expect(createMock).toHaveBeenCalledWith(expectedPerson);
          });
        }
      }
    });
  });
});
