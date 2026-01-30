import { describe, it, expect, beforeEach } from "vitest";
import { useCharactersStore } from "./character.store";

describe("character.store", () => {
  beforeEach(() => {
    useCharactersStore.setState({
      data: [],
      selected: new Set(),
      search: "",
      healthFilter: [],
      sort: null,
    });
  });

  it("setData updates data and sets loading false", () => {
    const chars = [
      {
        id: "1",
        name: "Test",
        location: "City",
        health: "Healthy" as const,
        power: 10,
        viewed: false,
      },
    ];
    useCharactersStore.getState().setData(chars);
    expect(useCharactersStore.getState().data).toEqual(chars);
    expect(useCharactersStore.getState().loading).toBe(false);
  });

  it("setSearch updates search", () => {
    useCharactersStore.getState().setSearch("ninja");
    expect(useCharactersStore.getState().search).toBe("ninja");
  });

  it("setHealthFilter updates healthFilter", () => {
    useCharactersStore.getState().setHealthFilter(["Healthy", "Injured"]);
    expect(useCharactersStore.getState().healthFilter).toEqual(["Healthy", "Injured"]);
  });

  it("toggleSelect adds and removes id", () => {
    const { toggleSelect } = useCharactersStore.getState();
    toggleSelect("id1");
    expect(useCharactersStore.getState().selected.has("id1")).toBe(true);
    toggleSelect("id1");
    expect(useCharactersStore.getState().selected.has("id1")).toBe(false);
  });

  it("toggleSort cycles asc -> desc -> null", () => {
    const { toggleSort } = useCharactersStore.getState();
    expect(useCharactersStore.getState().sort).toBe(null);
    toggleSort();
    expect(useCharactersStore.getState().sort).toBe("asc");
    toggleSort();
    expect(useCharactersStore.getState().sort).toBe("desc");
    toggleSort();
    expect(useCharactersStore.getState().sort).toBe(null);
  });
});
