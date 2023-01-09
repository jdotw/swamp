import { render, screen } from "@testing-library/react";
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
});
