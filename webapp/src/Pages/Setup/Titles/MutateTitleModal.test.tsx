import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { MutateTitle, Title } from "../../../Client/Title";
import { MutateTitleModal, MutateTitleModalProps } from "./MutateTitleModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateTitleModalProps = {
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = () => {
  render(<MutateTitleModal {...defaultProps} />);
};

describe("MutateTitleModal", () => {
  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("Title", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByPlaceholderText("title")
    ).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = await screen.getByText("Add");
    const indexInput = await screen.getByPlaceholderText("title");
    await userEvent.clear(indexInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Title is required")).toBeInTheDocument();
    });
  });
});
