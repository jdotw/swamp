import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import {
  MutateTrackModal,
  MutateTrackModalProps,
} from "./MutateTrackModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateTrackModalProps = {
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = () => {
  render(<MutateTrackModal {...defaultProps} />);
};

describe("MutateTrackModal", () => {
  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      screen.getByText("Name", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      screen.getByText("Parent", { selector: "label" })
    ).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = screen.getByText("Add");
    const nameInput = screen.getByPlaceholderText("name");
    await userEvent.clear(nameInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Name is required")).toBeInTheDocument();
    });
  });
});
