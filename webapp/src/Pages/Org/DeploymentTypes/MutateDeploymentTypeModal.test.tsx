import { TextInput } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { MutateDeploymentType, DeploymentType } from "../../../Client/DeploymentType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import {
  MutateDeploymentTypeModal,
  MutateDeploymentTypeModalProps,
} from "./MutateDeploymentTypeModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateDeploymentTypeModalProps = {
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = () => {
  render(<MutateDeploymentTypeModal {...defaultProps} />);
};

describe("MutateDeploymentTypeModal", () => {
  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("Name", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("Parent", { selector: "label" })
    ).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = await screen.getByText("Add");
    const nameInput = await screen.getByPlaceholderText("name");
    await userEvent.clear(nameInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Name is required")).toBeInTheDocument();
    });
  });
});
