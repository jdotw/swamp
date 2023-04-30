import { TextInput } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { MutateLevel, Level } from "../../../Client/Level";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { MutateLevelModal, MutateLevelModalProps } from "./MutateLevelModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateLevelModalProps = {
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = () => {
  render(<MutateLevelModal {...defaultProps} />);
};

describe("MutateLevelModal", () => {
  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("Index", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("External ID", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("Individual Contributor Title", {
        selector: "label",
      })
    ).toBeInTheDocument();
    expect(
      await screen.getByText("Manager Title", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByPlaceholderText("level index")
    ).toBeInTheDocument();
    expect(
      await screen.getByPlaceholderText("external id")
    ).toBeInTheDocument();
    expect(
      await screen.getByPlaceholderText("individual contributor title")
    ).toBeInTheDocument();
    expect(
      await screen.getByPlaceholderText("manager title")
    ).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = await screen.getByText("Add");
    const indexInput = await screen.getByPlaceholderText("level index");
    await userEvent.clear(indexInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Index is required")).toBeInTheDocument();
    });
  });
});
