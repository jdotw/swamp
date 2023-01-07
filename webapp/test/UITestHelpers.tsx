import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
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
  tableTestId?: string;
  rowCount: number;
  headerLabels: string[];
  cellContents: string[];
};

export const expectTableToHave = ({
  tableTestId,
  rowCount,
  headerLabels,
  cellContents,
}: ExpectTableToHaveProps) => {
  const table = within(
    tableTestId ? screen.getByTestId(tableTestId) : screen.getByRole("table")
  );
  expect(table.queryAllByRole("row")).toHaveLength(rowCount + 1);
  for (const headerLabel of headerLabels) {
    expect(
      table.queryByRole("columnheader", { name: headerLabel })
    ).toBeInTheDocument();
  }
  for (const cellContent of cellContents) {
    expect(table.queryAllByText(cellContent).length).toBeGreaterThan(0);
  }
};
