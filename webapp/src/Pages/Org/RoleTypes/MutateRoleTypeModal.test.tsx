import { TextInput } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { MutateRoleType, RoleType } from "../../../Client/RoleType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import {
  MutateRoleTypeModal,
  MutateRoleTypeModalProps,
} from "./MutateRoleTypeModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateRoleTypeModalProps = {
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = () => {
  render(<MutateRoleTypeModal {...defaultProps} />);
};

describe("MutateRoleTypeModal", () => {
  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("Title", { selector: "label" })
    ).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = await screen.getByText("Add");
    const titleInput = await screen.getByPlaceholderText("title");
    await userEvent.clear(titleInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Title is required")).toBeInTheDocument();
    });
  });
});
