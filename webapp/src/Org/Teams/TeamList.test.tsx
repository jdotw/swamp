import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../test/UITestHelpers";
import { useTeam } from "../../Client/Team";
import { LoadingComponentTestID } from "../../Loading/Loading";
import MutateTeamModal, { MutateTeamModalTestID } from "./MutateTeamModal";
import TeamList from "./TeamList";

addTestPolyfills();

const renderTeamList = () => {
  const route = "/org/teams";
  return render(
    <MemoryRouter initialEntries={[route]}>
      <TeamList />
    </MemoryRouter>
  );
};

vi.mock("../../Client/Team", () => {
  return {
    useTeam: vi.fn(),
  };
});
const mockUseTeamReturn = {
  loading: false,
  items: [],
};
const useTeamMock = useTeam as Mock;

describe("TeamList", () => {
  const mockTeams = [
    { id: "1", name: "Team Unit 1" },
    { id: "2", name: "Team Unit 2" },
  ];
  beforeEach(() => {
    useTeamMock.mockImplementation(() => ({
      ...mockUseTeamReturn,
    }));
  });

  it("should call useTeam", () => {
    renderTeamList();
    expect(useTeamMock).toHaveBeenCalled();
  });

  it("should render a title", async () => {
    renderTeamList();
    expect(screen.getByText("Teamanisation Units")).toBeInTheDocument();
  });

  describe("when loading", () => {
    it("should render the <Loading> component", async () => {
      useTeamMock.mockImplementation(() => ({
        ...mockUseTeamReturn,
        loading: true,
      }));
      renderTeamList();
      expect(screen.getByTestId(LoadingComponentTestID)).toBeInTheDocument();
    });
  });

  describe("when data is loaded", () => {
    beforeEach(() => {
      useTeamMock.mockImplementation(() => ({
        ...mockUseTeamReturn,
        loading: false,
        items: mockTeams,
      }));
    });
    it("should render a table of team", async () => {
      renderTeamList();
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
    it("should render the table with expected header, row count and cells", () => {
      renderTeamList();
      const table = screen.getByRole("table");
      expectTableToHave({
        tableTestId: "teams-table",
        rowCount: mockTeams.length,
        headerLabels: ["Name"],
        cellContents: mockTeams
          .map((teamUnit) => [teamUnit.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
    it("should render an Add Team button", () => {
      renderTeamList();
      expect(screen.getByTestId("add-team-button")).toBeInTheDocument();
    });
  });
  describe("Add Team button", () => {
    it("should show Add Team modal when clicked", async () => {
      renderTeamList();
      const addTeamButton = screen.getByTestId("add-team-button");
      fireEvent.click(addTeamButton);
      await waitFor(async () => {
        expect(screen.getByTestId(MutateTeamModalTestID)).toBeInTheDocument();
      });
    });
  });
});
