import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableHeader } from "./TableHeader";

describe("TableHeader", () => {
  it("renders all column headers", () => {
    render(<TableHeader />);
    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
    expect(screen.getByText("Power")).toBeInTheDocument();
  });

  it("has filter button for Health", () => {
    render(<TableHeader />);
    expect(screen.getByRole("button", { name: /toggle health filter/i })).toBeInTheDocument();
  });

  it("toggles health filter on filter button click", async () => {
    const user = userEvent.setup();
    render(<TableHeader />);
    const filterBtn = screen.getByRole("button", { name: /toggle health filter/i });
    expect(screen.queryByLabelText(/healthy/i)).not.toBeInTheDocument();
    await user.click(filterBtn);
    expect(screen.getByText("Healthy")).toBeInTheDocument();
    expect(screen.getByText("Injured")).toBeInTheDocument();
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("has Power sort button", () => {
    render(<TableHeader />);
    const sortBtn = screen.getByRole("button", { name: /sort by power/i });
    expect(sortBtn).toBeInTheDocument();
  });
});
