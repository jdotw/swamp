import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import {
  addTestPolyfills,
  expectTableToHave,
} from "../../../test/UITestHelpers";
import { useOrg } from "../../Client/Org";
import { LoadingComponentTestID } from "../../Loading/Loading";
import MutateOrgUnitModal, {
  MutateOrgUnitModalTestID,
} from "./MutateOrgUnitModal";
import OrgUnitList from "./OrgUnitList";

addTestPolyfills();

const renderOrgUnitList = () => {
  const route = "/org/units";
  return render(
    <MemoryRouter initialEntries={[route]}>
      <OrgUnitList />
    </MemoryRouter>
  );
};

vi.mock("../../Client/Org", () => {
  return {
    useOrg: vi.fn(),
  };
});
const mockUseOrgReturn = {
  loading: false,
  items: [],
};
const useOrgMock = useOrg as Mock;

describe("OrgUnitList", () => {
  const mockOrgUnits = [
    { id: "1", name: "Org Unit 1" },
    { id: "2", name: "Org Unit 2" },
  ];
  beforeEach(() => {
    useOrgMock.mockImplementation(() => ({
      ...mockUseOrgReturn,
    }));
  });

  it("should call useOrg", () => {
    renderOrgUnitList();
    expect(useOrgMock).toHaveBeenCalled();
  });

  it("should render a title", async () => {
    renderOrgUnitList();
    expect(screen.getByText("Organisation Units")).toBeInTheDocument();
  });

  describe("when loading", () => {
    it("should render the <Loading> component", async () => {
      useOrgMock.mockImplementation(() => ({
        ...mockUseOrgReturn,
        loading: true,
      }));
      renderOrgUnitList();
      expect(screen.getByTestId(LoadingComponentTestID)).toBeInTheDocument();
    });
  });

  describe("when data is loaded", () => {
    beforeEach(() => {
      useOrgMock.mockImplementation(() => ({
        ...mockUseOrgReturn,
        loading: false,
        items: mockOrgUnits,
      }));
    });
    it("should render a table of org units", async () => {
      renderOrgUnitList();
      expect(screen.getByRole("table")).toBeInTheDocument();
    });
    it("should render the table with expected header, row count and cells", () => {
      renderOrgUnitList();
      const table = screen.getByRole("table");
      expectTableToHave({
        tableTestId: "org-units-table",
        rowCount: mockOrgUnits.length,
        headerLabels: ["Name"],
        cellContents: mockOrgUnits
          .map((orgUnit) => [orgUnit.name])
          .reduce((a, v) => a.concat(v), []),
      });
    });
    it("should render an Add Org Unit button", () => {
      renderOrgUnitList();
      expect(screen.getByTestId("add-org-unit-button")).toBeInTheDocument();
    });
  });
  describe("Add Org Unit button", () => {
    it("should show Add Org Unit modal when clicked", async () => {
      renderOrgUnitList();
      const addOrgUnitButton = screen.getByTestId("add-org-unit-button");
      fireEvent.click(addOrgUnitButton);
      await waitFor(async () => {
        expect(
          screen.getByTestId(MutateOrgUnitModalTestID)
        ).toBeInTheDocument();
      });
    });
  });
});
