import { TextInput } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { MutatePerson, Person } from "../../../Client/Person";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { MutatePersonModal, MutatePersonModalProps } from "./MutatePersonModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutatePersonModalProps = {
  title: "Unit Tests",
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = () => {
  render(<MutatePersonModal {...defaultProps} />);
};

describe("MutatePersonModal", () => {
  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("First Name", { selector: "label" })
    ).toBeInTheDocument();
    expect(await screen.getByPlaceholderText("first name")).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = await screen.getByText("Add");
    const firstNameInput = await screen.getByPlaceholderText("first name");
    const lastNameInput = await screen.getByPlaceholderText("last name");
    const middleNamesInput = await screen.getByPlaceholderText(/middle names/i);
    const externalIdInput = await screen.getByPlaceholderText("external ID");
    await userEvent.clear(firstNameInput);
    await userEvent.clear(lastNameInput);
    await userEvent.clear(middleNamesInput);
    await userEvent.clear(externalIdInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(
        await screen.findByText("First name is required")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("Last name is required")
      ).toBeInTheDocument();
      expect(
        await screen.findByText("External ID is required")
      ).toBeInTheDocument();
    });
    expect(mockOnSubmit).not.toBeCalled();
  });
});
