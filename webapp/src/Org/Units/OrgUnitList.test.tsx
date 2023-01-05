import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import OrgUnitList from "./OrgUnitList";

global.ResizeObserver = require("resize-observer-polyfill");

const renderOrgUnitList = () => {
  const route = "/org/units";
  return render(
    <MemoryRouter initialEntries={[route]}>
      <OrgUnitList />
    </MemoryRouter>
  );
};

describe("OrgUnitList", () => {
  it("should render a title", async () => {
    renderOrgUnitList();
    expect(screen.getByText("Organisation Units")).toBeInTheDocument();
  });
  it("should render a table of org units", async () => {
    renderOrgUnitList();
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
