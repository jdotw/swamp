import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

export function addTestPolyfills() {
  global.ResizeObserver = require("resize-observer-polyfill");
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

export type ExpectTableToHaveProps = {
  rowCount: number;
  headerLabels: string[];
  cellContents: string[];
};

export const expectTableToHave = ({
  rowCount,
  headerLabels,
  cellContents,
}: ExpectTableToHaveProps) => {
  expect(screen.queryAllByRole("row")).toHaveLength(rowCount + 1);
  for (const headerLabel of headerLabels) {
    expect(
      screen.queryByRole("columnheader", { name: headerLabel })
    ).toBeInTheDocument();
  }
  for (const cellContent of cellContents) {
    expect(screen.queryAllByText(cellContent).length).toBeGreaterThan(0);
  }
};
