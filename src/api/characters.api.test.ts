import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchCharacters } from "./characters.api";

vi.mock("axios");

describe("characters.api", () => {
  beforeEach(() => {
    vi.mocked(axios.get).mockReset();
  });

  it("fetchCharacters returns data from GET /characters", async () => {
    const mockData = [
      {
        id: "1",
        name: "Ninja",
        location: "Tokyo",
        health: "Healthy",
        power: 100,
        viewed: false,
      },
    ];
    vi.mocked(axios.get).mockResolvedValue({ data: mockData });

    const result = await fetchCharacters();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:4000/characters");
    expect(result).toEqual(mockData);
  });
});
