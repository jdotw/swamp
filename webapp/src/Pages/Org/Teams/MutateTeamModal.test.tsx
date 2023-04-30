import { render, screen } from "@testing-library/react";
import { addTestPolyfills } from "../../../../test/UITestHelpers";
import MutateTeamModal, {
  MutateTeamModalProps,
} from "./MutateTeamModal";

addTestPolyfills();

const defaultProps: MutateTeamModalProps = {
  opened: true,
  mode: "create",
  parentCandidates: [],
  onClose: () => { },
  onSubmit: () => { },
};

const renderMutateTeamModal = (props?: MutateTeamModalProps) => {
  props = {
    ...defaultProps,
    ...props,
  };
  return render(<MutateTeamModal {...props} />);
};

describe("MutateTeamModal", () => {
  it("should render a modal", async () => {
    renderMutateTeamModal();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
