import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../test/UITestHelpers";
import MutateOrgUnitModal, {
  MutateOrgUnitModalMode,
  MutateOrgUnitModalProps,
} from "./MutateOrgUnitModal";

addTestPolyfills();

const defaultProps = {
  mode: MutateOrgUnitModalMode.Create,
  opened: true,
  onClose: () => {},
  onSubmit: () => {},
};

const renderMutateOrgUnitModal = (props?: MutateOrgUnitModalProps) => {
  props = {
    ...defaultProps,
    ...props,
  };
  return render(<MutateOrgUnitModal {...props} />);
};

describe("MutateOrgUnitModal", () => {
  it("should render a title", () => {
    renderMutateOrgUnitModal();
    expect(
      screen.getByRole("heading", { name: /Org Unit/i })
    ).toBeInTheDocument();
  });
  it("should render expected input fields", () => {
    renderMutateOrgUnitModal();
    expect(screen.getByPlaceholderText("org unit name")).toBeInTheDocument();
  });
  describe("when mode is Create", () => {
    it("should render Add in the title", () => {
      renderMutateOrgUnitModal();
      expect(screen.getByRole("heading", { name: /Add/i })).toBeInTheDocument();
    });
    it("should render an Add button", () => {
      renderMutateOrgUnitModal();
      expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
    });
  });
  describe("when mode is Edit", () => {
    it("should render Edit in the title", () => {
      renderMutateOrgUnitModal({
        ...defaultProps,
        mode: MutateOrgUnitModalMode.Edit,
      });
      expect(
        screen.getByRole("heading", { name: /Edit/i })
      ).toBeInTheDocument();
    });
    it("should render an Update button", () => {
      renderMutateOrgUnitModal({
        ...defaultProps,
        mode: MutateOrgUnitModalMode.Edit,
      });
      expect(
        screen.getByRole("button", { name: /Update/i })
      ).toBeInTheDocument();
    });
  });
  describe("when cancel is clicked", () => {
    it("should call the onClose callback", async () => {
      const onClose = vi.fn();
      renderMutateOrgUnitModal({ ...defaultProps, onClose });
      userEvent.click(screen.getByRole("button", { name: /Cancel/i }));
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });
  describe("when submit is clicked with valid input", () => {
    it("should call the onSubmit callback with expected values", async () => {
      const onSubmit = vi.fn();
      renderMutateOrgUnitModal({ ...defaultProps, onSubmit });
      await userEvent.type(
        screen.getByPlaceholderText("org unit name"),
        "Org Unit 1"
      );
      await userEvent.click(screen.getByRole("button", { name: /Add/i }));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: "Org Unit 1",
        });
      });
    });
  });
});
