import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { Role, useRole } from "../../../Client/Role";
import RoleHome, { RoleHomeProps } from "./RoleHome";
import { roleHistoryTimelineTestId } from "../../../Components/RoleHistoryTimeline/RoleHistoryTimeline";

addTestPolyfills();

const testRole: Role = {
  id: 1,
  start_date: "2021-01-01",
  active_level_assignment: {
    id: 1,
    level: {
      id: 1,
      index: 1,
      external_id: "1",
      active_from_date: "2021-01-01",
      manager_title: "Manager",
      individual_contributor_title: "Individual Contributor",
    },
  },
};

const renderPage = (props: RoleHomeProps = { role: testRole }) =>
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

const mockRole: Role = {
  id: 1,
  start_date: "2021-01-01",
  active_level_assignment: {
    id: 1,
    level: {
      id: 1,
      index: 1,
      external_id: "1",
      active_from_date: "2021-01-01",
      manager_title: "Manager",
      individual_contributor_title: "Individual Contributor",
    },
  },
};

const mockUseRoleReturn = {
  loading: false,
  items: [mockRole],
};
const useRoleMock = useRole as Mock;
useRoleMock.mockImplementation(() => ({
  ...mockUseRoleReturn,
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
