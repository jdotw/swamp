import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Mock, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import RoleListTable, { RoleListTableProps } from "./RoleListTable";
import { addTestPolyfills } from "../../../test/UITestHelpers";
import { useRole } from "../../Client/Role";

addTestPolyfills();

const renderPage = (props: RoleListTableProps = {}) =>
  render(
    <MemoryRouter>
      <RoleListTable {...props} />
    </MemoryRouter>
  );

vi.mock("../../Client/Role", () => {
  return {
    useRole: vi.fn(),
  };
});

const mockUseRoleReturn = {
  loading: false,
  items: [],
};
const useRoleMock = useRole as Mock;
useRoleMock.mockImplementation(() => ({
  ...mockUseRoleReturn,
}));

describe("RoleListTable", () => {
  it("renders the Loading element when loading=true", async () => {
    useRoleMock.mockImplementationOnce(() => ({
      ...mockUseRoleReturn,
      loading: true,
    }));
    renderPage();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
