import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { Role, useRole } from "../../../Client/Role";
import RoleHome, { RoleHomeProps } from "./RoleHome";
import { roleHistoryTimelineTestId } from "../../../Components/RoleHistoryTimeline/RoleHistoryTimeline";
import { useManagerAssignment } from "@/Client/ManagerAssignment";
import { useCapability } from "@/Client/Capability";

addTestPolyfills();

const renderPage = (props: RoleHomeProps = {}) =>
  render(
    <MemoryRouter initialEntries={["/roles/1"]}>
      <RoleHome {...props} />
    </MemoryRouter>
  );

vi.mock("../../../Client/Role", () => {
  return {
    useRole: vi.fn(),
  };
});

vi.mock("@/Client/ManagerAssignment", () => {
  return {
    useManagerAssignment: vi.fn(),
  };
});

vi.mock("@/Client/Capability", () => {
  return {
    useCapability: vi.fn(),
  };
});

const mockRole: Role = {
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
    "level": {
      "id": 5,
      "index": 3,
      "external_id": "3",
      "individual_contributor_title": "Senior",
      "manager_title": "Manager",
      "parent_id": 0,
      "active_from_date": "2023-04-22T01:29:13.816475+00:00",
      "retired_at_date": "0001-01-01T00:00:00+00:00"
    },
    "role_id": 1,
    "role": null,
    "start_date": "2023-04-22T03:57:32.617856+00:00",
    "end_date": null
  },
  "active_role_assignment": {
    "id": 1,
    "role_id": 1,
    "role": null,
    "person_id": 1,
    "person": {
      "id": 1,
      "external_id": "5678",
      "first_name": "James",
      "middle_names": "",
      "last_name": "Wilson",
      "active_role_assignment": undefined
    },
    "start_date": "2023-04-22T04:45:12.245662+00:00",
    "end_date": null
  },
  "active_manager_assignment": {
    "role": undefined,
    "manager": undefined,
    "id": 7,
    "role_id": 1,
    "manager_id": 3,
    "start_date": "2023-04-29T03:06:19.580278+00:00",
    "end_date": null
  },
  "capabilities": []
};

const mockManagerAssignment = {
  "id": 7,
  "role_id": 1,
  "role": null,
  "manager_id": 3,
  "manager": {
    "id": 3,
    "role_type": null,
    "role_assignments": [{
      "id": 3,
      "person_id": 3,
      "person": {
        "id": 3,
        "external_id": "4",
        "first_name": "Tammy",
        "middle_names": null,
        "last_name": "Mitchell",
        "active_role_assignment": {
          "id": 3,
          "role_id": 3,
          "role": {
            "id": 3,
            "open_from_date": "2023-04-29T02:55:23.398991+00:00",
            "closed_at_date": null,
            "role_type": null,
            "active_level_assignment": null,
            "active_role_assignment": null,
            "active_manager_assignment": null
          },
          "person_id": 3,
          "person": {
            "id": 3,
            "external_id": "4",
            "first_name": "Tammy",
            "middle_names": null,
            "last_name": "Mitchell",
            "active_role_assignment": null
          },
          "start_date": "2023-04-29T02:55:29.276321+00:00",
          "end_date": null
        },
        "role_assignments": [null]
      },
      "role_id": 3,
      "role": null,
      "start_date": "2023-04-29T02:55:29.276321+00:00",
      "end_date": null
    }],
    "level_assignments": [],
    "manager_assignments": [],
    "open_from_date": "2023-04-29T02:55:23.398991+00:00",
    "closed_at_date": null,
    "active_level_assignment": null,
    "active_role_assignment": {
      "id": 3,
      "person_id": 3,
      "person": {
        "id": 3,
        "external_id": "4",
        "first_name": "Tammy",
        "middle_names": null,
        "last_name": "Mitchell",
        "active_role_assignment": {
          "id": 3,
          "role_id": 3,
          "role": {
            "id": 3,
            "open_from_date": "2023-04-29T02:55:23.398991+00:00",
            "closed_at_date": null,
            "role_type": null,
            "active_level_assignment": null,
            "active_role_assignment": null,
            "active_manager_assignment": null
          },
          "person_id": 3,
          "person": {
            "id": 3,
            "external_id": "4",
            "first_name": "Tammy",
            "middle_names": null,
            "last_name": "Mitchell",
            "active_role_assignment": null
          },
          "start_date": "2023-04-29T02:55:29.276321+00:00",
          "end_date": null
        },
        "role_assignments": [null]
      },
      "role_id": 3,
      "role": null,
      "start_date": "2023-04-29T02:55:29.276321+00:00",
      "end_date": null
    },
  },
  "start_date": "2023-04-29T03:06:19.580278+00:00",
  "end_date": null,

}

const mockCapability = [{
  "id": 18,
  "capability_type_id": 19,
  "capability_type": {
    "id": 19,
    "name": "C# Backend Engineer",
    "active_from_date": "2023-04-22T02:48:13.424569+00:00",
    "retired_at_date": "0001-01-01T00:00:00+00:00",
    "parent_id": 0,
    "parent": null,
    "children": [],
    "role_type_id": 2,
    "role_type": null
  },
  "role_id": 1,
  "role": null,
  "active_from_date": "0001-01-01T00:00:00+00:00",
  "retired_at_date": null,
  "active_home_assignment": {
    "team": {
      "id": 1,
      "name": "React Engineering Chapter",
      "description": null,
      "type": "home",
      "parent_id": null,
      "children": []
    },
    "capability": null,
    "id": 4,
    "team_id": 1,
    "capability_id": 18,
    "start_date": "2023-04-25T03:00:47.510632+00:00",
    "end_date": null
  },
  "active_deployment": {
    "team": {
      "id": 2,
      "name": "Checkout",
      "description": null,
      "type": "delivery",
      "parent_id": null,
      "children": []
    },
    "capability": null,
    "id": 4,
    "team_id": 2,
    "capability_id": 18,
    "start_date": "2023-04-25T03:00:52.439328+00:00",
    "end_date": null
  }
}, {
  "id": 19,
  "capability_type_id": 16,
  "capability_type": {
    "id": 16,
    "name": "Practice Lead",
    "active_from_date": "2023-04-22T02:46:47.476079+00:00",
    "retired_at_date": "0001-01-01T00:00:00+00:00",
    "parent_id": 15,
    "parent": null,
    "children": [],
    "role_type_id": 0,
    "role_type": null
  },
  "role_id": 1,
  "role": null,
  "active_from_date": "0001-01-01T00:00:00+00:00",
  "retired_at_date": null,
  "active_home_assignment": null,
  "active_deployment": {
    "team": {
      "id": 1,
      "name": "React Engineering Chapter",
      "description": null,
      "type": "home",
      "parent_id": null,
      "children": []
    },
    "capability": null,
    "id": 5,
    "team_id": 1,
    "capability_id": 19,
    "start_date": "2023-04-25T03:01:01.705047+00:00",
    "end_date": null
  }
}, {
  "id": 20,
  "capability_type_id": 15,
  "capability_type": {
    "id": 15,
    "name": "People Leader",
    "active_from_date": "2023-04-22T02:46:37.802503+00:00",
    "retired_at_date": "0001-01-01T00:00:00+00:00",
    "parent_id": 0,
    "parent": null,
    "children": [],
    "role_type_id": 0,
    "role_type": null
  },
  "role_id": 1,
  "role": null,
  "active_from_date": "0001-01-01T00:00:00+00:00",
  "retired_at_date": null,
  "active_home_assignment": null,
  "active_deployment": null
}];

const mockUseRoleReturn = {
  loading: false,
  items: [mockRole],
};
const useRoleMock = useRole as Mock;
useRoleMock.mockImplementation(() => ({
  ...mockUseRoleReturn,
}));

const mockUseManagerAssignmentReturn = { loading: false, items: [mockManagerAssignment] };
const useManagerAssignmentMock = useManagerAssignment as Mock;
useManagerAssignmentMock.mockImplementation(() => ({
  ...mockUseManagerAssignmentReturn,
}));

const mockUseCapabilityReturn = { loading: false, items: mockCapability };
const useCapabilityMock = useCapability as Mock;
useCapabilityMock.mockImplementation(() => ({
  ...mockUseCapabilityReturn,
}));


describe("RoleHome", () => {
  it("renders the Loading element when loading=true", async () => {
    useRoleMock.mockImplementationOnce(() => ({
      ...mockUseRoleReturn,
      loading: true,
    }));
    renderPage();
    expect(screen.getByTestId("loading-role-home")).toBeInTheDocument();
  });
  it("renders a role history timeline", async () => {
    renderPage();
    await waitFor(() => {
      expect(screen.getByTestId(roleHistoryTimelineTestId)).toBeInTheDocument();
    });
  });
});
