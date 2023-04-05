import { render, screen, waitFor } from "@testing-library/react";
import { Mock, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { addTestPolyfills } from "../../../test/UITestHelpers";
import Loading, { loadingComponentTestID, LoadingProps } from "./Loading";

addTestPolyfills();

const defaultProps: LoadingProps = {
  "data-testid": "loading-unit-tests",
};

const renderComponent = (props: LoadingProps = {}) => {
  props = { ...defaultProps, ...props };
  render(<Loading {...props} />);
};

describe("Loading", () => {
  describe("when a custom data-testid is specified in props", () => {
    it("renders with the custom data-testid", async () => {
      const customDataTestId = "custom-data-testid";
      renderComponent({ "data-testid": customDataTestId });
      expect(screen.getByTestId(customDataTestId)).toBeInTheDocument();
    });
  });
  describe("when a custom data-testid is NOT specified in props", () => {
    it("renders with the default data-testid", async () => {
      renderComponent({ "data-testid": undefined });
      expect(screen.getByTestId(loadingComponentTestID)).toBeInTheDocument();
    });
  });
});
