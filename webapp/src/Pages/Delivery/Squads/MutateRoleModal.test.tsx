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

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateRoleModalProps = {
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
        function_type_id: 1,
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
