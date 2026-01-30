import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HealthFilter } from "./HealthFilter";
import { useCharactersStore } from "../../features/characters/store/character.store";

describe("HealthFilter", () => {
  beforeEach(() => {
    useCharactersStore.setState({ healthFilter: [] });
  });

  it("renders all health options", () => {
    render(<HealthFilter />);
    expect(screen.getByText("Healthy")).toBeInTheDocument();
    expect(screen.getByText("Injured")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("toggling checkbox updates store", async () => {
    const user = userEvent.setup();
    render(<HealthFilter />);
    const healthyCheckbox = screen.getAllByRole("checkbox")[0];
    await user.click(healthyCheckbox);
    expect(useCharactersStore.getState().healthFilter).toContain("Healthy");
    await user.click(healthyCheckbox);
    expect(useCharactersStore.getState().healthFilter).not.toContain("Healthy");
  });

  it("can select multiple health options", async () => {
    const user = userEvent.setup();
    render(<HealthFilter />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    await user.click(checkboxes[1]);
    expect(useCharactersStore.getState().healthFilter).toEqual(["Healthy", "Injured"]);
  });
});
