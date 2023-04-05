import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RoleHistoryTimeline, {
  RoleHistoryTimelineProps,
  roleHistoryTimelineTestId,
} from "./RoleHistoryTimeline";
import { addTestPolyfills } from "../../../test/UITestHelpers";
import { RoleHistory, useRoleHistory } from "../../Client/RoleHistory";
import { Role } from "../../Client/Role";

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

const renderPage = (props: RoleHistoryTimelineProps = { role: testRole }) =>
  render(
    <MemoryRouter>
      <RoleHistoryTimeline {...props} />
    </MemoryRouter>
  );

vi.mock("../../Client/RoleHistory", () => {
  return {
    useRoleHistory: vi.fn(),
  };
});

const mockUseRoleHistoryReturn = {
  loading: false,
  items: [],
};
const useRoleMock = useRoleHistory as Mock;
useRoleMock.mockImplementation(() => ({
  ...mockUseRoleHistoryReturn,
}));

describe("RoleHistoryTimeline", () => {
  it("renders the Loading element when loading=true", async () => {
    useRoleMock.mockImplementationOnce(() => ({
      ...mockUseRoleHistoryReturn,
      loading: true,
    }));
    renderPage();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  it("renders in a div with the expected data-testid", async () => {
    renderPage();
    expect(screen.getByTestId(roleHistoryTimelineTestId)).toBeInTheDocument();
  });
});
