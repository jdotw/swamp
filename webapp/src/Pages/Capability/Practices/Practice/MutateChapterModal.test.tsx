import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../../test/UITestHelpers";
import {
  MutateChapterModal,
  MutateChapterModalProps,
} from "./MutateChapterModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateChapterModalProps = {
  opened: true,
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = () => {
  render(<MutateChapterModal {...defaultProps} />);
};

describe("MutateChapterModal", () => {
  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("Name", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByPlaceholderText("chapter name")
    ).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = await screen.getByText("Add");
    const nameInput = await screen.getByPlaceholderText("chapter name");
    await userEvent.clear(nameInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Name is required")).toBeInTheDocument();
    });
  });
});
