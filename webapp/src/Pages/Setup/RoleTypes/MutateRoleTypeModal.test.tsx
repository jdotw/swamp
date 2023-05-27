import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import {
  MutateRoleTypeModal,
  MutateRoleTypeModalProps,
} from "./MutateRoleTypeModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateRoleTypeModalProps = {
  opened: true,
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
      await screen.getByText("Name", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("Parent", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("Title Type", { selector: "label" })
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
