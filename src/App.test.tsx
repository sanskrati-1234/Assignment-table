import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import * as api from "./api/characters.api";

vi.mock("./api/characters.api");

describe("App", () => {
  beforeEach(() => {
    vi.mocked(api.fetchCharacters).mockResolvedValue([]);
  });

  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders the characters section after load", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /characters/i })).toBeInTheDocument();
    });
  });
});
