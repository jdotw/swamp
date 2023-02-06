import { TextInput } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { MutateRole, Role } from "../../../Client/Role";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { MutateRoleModal, MutateRoleModalProps } from "./MutateRoleModal";

addTestPolyfills();

vi.mock("../../../Client/RoleType", () => ({
  useRoleType: () => ({
    items: [],
    loading: false,
  }),
}));

vi.mock("../../../Client/FunctionType", () => ({
  useFunctionType: () => ({
    items: [],
    loading: false,
  }),
}));

vi.mock("../../../Client/Level", () => ({
  useLevel: () => ({
    items: [],
    loading: false,
  }),
}));

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateRoleModalProps = {
  unit_id: 1,
  unit_type: "team",
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = (props: MutateRoleModalProps = defaultProps) => {
  render(<MutateRoleModal {...props} />);
};

describe("MutateRoleModal", () => {
  describe("when editing an existing role", () => {
    it("should render the edit title", async () => {
      const role: Role = {
        id: 1,
        role_type_id: 1,
        active_level_assignment: {
          id: 1,
          level: {
            id: 1,
            index: 1,
            external_id: "l1",
            individual_contributor_title: "Level 1",
            manager_title: "Level 1",
            active_from_date: "2021-01-01",
          },
        },
        start_date: "2021-01-01",
      };
      renderModal({ ...defaultProps, mode: "edit", role });
      expect(await screen.findByText("Edit Role")).toBeInTheDocument();
    });
  });
  describe("when creating a new role", () => {
    it("should render the create title", async () => {
      renderModal({ ...defaultProps, mode: "create" });
      expect(await screen.findByText("Add Role")).toBeInTheDocument();
    });
  });

  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("Type", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("Level", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("Function", { selector: "label" })
    ).toBeInTheDocument();
  });
});
