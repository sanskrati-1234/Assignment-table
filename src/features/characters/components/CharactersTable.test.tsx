import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CharactersTable } from "./CharactersTable";
import * as api from "../../../api/characters.api";
import { useCharactersStore } from "../store/character.store";

const mockCharacters = [
  {
    id: "1",
    name: "Ninja One",
    location: "Tokyo",
    health: "Healthy" as const,
    power: 100,
    viewed: false,
  },
  {
    id: "2",
    name: "Ninja Two",
    location: "Osaka",
    health: "Injured" as const,
    power: 50,
    viewed: false,
  },
];

describe("CharactersTable", () => {
  beforeEach(() => {
    vi.spyOn(api, "fetchCharacters").mockResolvedValue(mockCharacters);
    useCharactersStore.setState({
      data: [],
      loading: true,
      selected: new Set(),
      search: "",
      healthFilter: [],
      sort: null,
    });
  });

  it("shows loading state initially", () => {
    render(<CharactersTable />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders table after data loads", async () => {
    render(<CharactersTable />);
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /characters/i })).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Ninja One")).toBeInTheDocument();
      expect(screen.getByText("Ninja Two")).toBeInTheDocument();
    });
  });

  it("has search input", async () => {
    render(<CharactersTable />);
    await waitFor(() => {
      expect(screen.getByPlaceholderText(/search by name or location/i)).toBeInTheDocument();
    });
  });

  it("filters by search when user types", async () => {
    const user = userEvent.setup({ delay: null });
    render(<CharactersTable />);
    await waitFor(() => {
      expect(screen.getByText("Ninja One")).toBeInTheDocument();
    });
    const input = screen.getByPlaceholderText(/search by name or location/i);
    await user.type(input, "One");
    await waitFor(
      () => {
        expect(screen.getByText("Ninja One")).toBeInTheDocument();
        expect(screen.queryByText("Ninja Two")).not.toBeInTheDocument();
      },
      { timeout: 800 },
    );
  });

  it("has Submit button", async () => {
    render(<CharactersTable />);
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    });
  });
});
