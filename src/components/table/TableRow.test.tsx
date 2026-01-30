import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableRow } from "./TableRow";
import { useCharactersStore } from "../../features/characters/store/character.store";

const mockRow = {
  id: "row-1",
  name: "Test Ninja",
  location: "Kyoto",
  health: "Injured" as const,
  power: 75,
  viewed: false,
};

describe("TableRow", () => {
  beforeEach(() => {
    useCharactersStore.setState({ selected: new Set() });
  });

  it("renders row data", () => {
    render(
      <TableRow
        row={mockRow}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: "translateY(0px)" }}
      />,
    );
    expect(screen.getByText("Test Ninja")).toBeInTheDocument();
    expect(screen.getByText("Kyoto")).toBeInTheDocument();
    expect(screen.getByText("Injured")).toBeInTheDocument();
    expect(screen.getByText("75")).toBeInTheDocument();
  });

  it("checkbox toggles selection", async () => {
    const user = userEvent.setup();
    render(
      <TableRow
        row={mockRow}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", transform: "translateY(0px)" }}
      />,
    );
    const checkbox = screen.getByRole("checkbox", { name: /select test ninja/i });
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(useCharactersStore.getState().selected.has("row-1")).toBe(true);
    await user.click(checkbox);
    expect(useCharactersStore.getState().selected.has("row-1")).toBe(false);
  });
});
