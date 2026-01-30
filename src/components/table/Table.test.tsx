import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "./Table";

const mockRows = [
  {
    id: "1",
    name: "Test",
    location: "City",
    health: "Healthy" as const,
    power: 10,
    viewed: false,
  },
];

describe("Table", () => {
  it("renders table header columns", () => {
    render(<Table rows={mockRows} />);
    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Location")).toBeInTheDocument();
    expect(screen.getByText("Health")).toBeInTheDocument();
    expect(screen.getByText("Power")).toBeInTheDocument();
  });

  it("renders row data", () => {
    render(<Table rows={mockRows} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("City")).toBeInTheDocument();
    expect(screen.getByText("Healthy")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("renders nothing when rows empty", () => {
    render(<Table rows={[]} />);
    expect(screen.getByText("Select")).toBeInTheDocument();
    expect(screen.queryByText("Test")).not.toBeInTheDocument();
  });
});
