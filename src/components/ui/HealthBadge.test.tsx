import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HealthBadge } from "./HealthBadge";

describe("HealthBadge", () => {
  it("renders Healthy label", () => {
    render(<HealthBadge health="Healthy" />);
    expect(screen.getByText("Healthy")).toBeInTheDocument();
  });

  it("renders Injured label", () => {
    render(<HealthBadge health="Injured" />);
    expect(screen.getByText("Injured")).toBeInTheDocument();
  });

  it("renders Critical label", () => {
    render(<HealthBadge health="Critical" />);
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });

  it("applies correct class for Healthy", () => {
    const { container } = render(<HealthBadge health="Healthy" />);
    const span = container.querySelector("span");
    expect(span).toHaveClass("bg-emerald-100", "text-emerald-800");
  });
});
