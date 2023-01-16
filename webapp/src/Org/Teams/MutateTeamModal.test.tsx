import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { addTestPolyfills } from "../../../test/UITestHelpers";
import MutateTeamModal, {
  MutateTeamModalMode,
  MutateTeamModalProps,
} from "./MutateTeamModal";

addTestPolyfills();

const defaultProps = {
  mode: MutateTeamModalMode.Create,
  opened: true,
  onClose: () => {},
  onSubmit: () => {},
};

const renderMutateTeamModal = (props?: MutateTeamModalProps) => {
  props = {
    ...defaultProps,
    ...props,
  };
  return render(<MutateTeamModal {...props} />);
};

describe("MutateTeamModal", () => {
  it("should render a title", () => {
    renderMutateTeamModal();
    expect(screen.getByRole("heading", { name: /Team/i })).toBeInTheDocument();
  });
  it("should render expected input fields", () => {
    renderMutateTeamModal();
    expect(screen.getByPlaceholderText("team name")).toBeInTheDocument();
  });
  describe("when mode is Create", () => {
    it("should render Add in the title", () => {
      renderMutateTeamModal();
      expect(screen.getByRole("heading", { name: /Add/i })).toBeInTheDocument();
    });
    it("should render an Add button", () => {
      renderMutateTeamModal();
      expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
    });
  });
  describe("when mode is Edit", () => {
    it("should render Edit in the title", () => {
      renderMutateTeamModal({
        ...defaultProps,
        mode: MutateTeamModalMode.Edit,
      });
      expect(
        screen.getByRole("heading", { name: /Edit/i })
      ).toBeInTheDocument();
    });
    it("should render an Update button", () => {
      renderMutateTeamModal({
        ...defaultProps,
        mode: MutateTeamModalMode.Edit,
      });
      expect(
        screen.getByRole("button", { name: /Update/i })
      ).toBeInTheDocument();
    });
  });
  describe("when cancel is clicked", () => {
    it("should call the onClose callback", async () => {
      const onClose = vi.fn();
      renderMutateTeamModal({ ...defaultProps, onClose });
      userEvent.click(screen.getByRole("button", { name: /Cancel/i }));
      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });
  describe("when submit is clicked with valid input", () => {
    it("should call the onSubmit callback with expected values", async () => {
      const onSubmit = vi.fn();
      renderMutateTeamModal({ ...defaultProps, onSubmit });
      await userEvent.type(screen.getByPlaceholderText("team name"), "Team 1");
      await userEvent.click(screen.getByRole("button", { name: /Add/i }));
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: "Team 1",
        });
      });
    });
  });
});
