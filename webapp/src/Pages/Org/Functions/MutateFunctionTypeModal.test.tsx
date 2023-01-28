import { TextInput } from "@mantine/core";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import { MutateFunctionType, FunctionType } from "../../../Client/FunctionType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import {
  MutateFunctionTypeModal,
  MutateFunctionTypeModalProps,
} from "./MutateFunctionTypeModal";

addTestPolyfills();

const mockOnSubmit = vi.fn();
const mockOnClose = vi.fn();

const defaultProps: MutateFunctionTypeModalProps = {
  opened: true,
  mode: "create",
  onSubmit: mockOnSubmit,
  onClose: mockOnClose,
};

const renderModal = (props: MutateFunctionTypeModalProps = defaultProps) => {
  render(<MutateFunctionTypeModal {...props} />);
};

describe("MutateFunctionTypeModal", () => {
  describe("when editing an existing function type", () => {
    it("should render the edit title", async () => {
      const functionType: FunctionType = {
        id: 1,
        name: "name",
        active_from_date: "2021-01-01",
      };
      renderModal({ ...defaultProps, mode: "edit", functionType });
      expect(await screen.findByText("Edit Function")).toBeInTheDocument();
    });
  });
  describe("when creating a new function type", () => {
    it("should render the create title", async () => {
      renderModal({ ...defaultProps, mode: "create" });
      expect(await screen.findByText("Add Function")).toBeInTheDocument();
    });
  });

  it("should render the expected input fields", async () => {
    renderModal();
    expect(
      await screen.getByText("Name", { selector: "label" })
    ).toBeInTheDocument();
    expect(
      await screen.getByPlaceholderText("function name")
    ).toBeInTheDocument();
  });
  it("should validate input fields", async () => {
    renderModal();
    const submitButton = await screen.getByText("Add");
    const nameInput = await screen.getByPlaceholderText("function name");
    await userEvent.clear(nameInput);
    await userEvent.click(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Name is required")).toBeInTheDocument();
    });
  });
});
