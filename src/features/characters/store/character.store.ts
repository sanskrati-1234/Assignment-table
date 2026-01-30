import { create } from "zustand";
import type { Character, Health } from "../../../types/character.ts";

type SortOrder = "asc" | "desc" | null;

interface CharactersState {
  data: Character[];
  loading: boolean;

  selected: Set<string>;
  search: string;
  healthFilter: Health[];
  sort: SortOrder;

  setData: (d: Character[]) => void;
  setSearch: (v: string) => void;
  setHealthFilter: (v: Health[]) => void;
  toggleSelect: (id: string) => void;
  toggleSort: () => void;
}

export const useCharactersStore = create<CharactersState>((set) => ({
  data: [],
  loading: true,

  selected: new Set(),
  search: "",
  healthFilter: [],
  sort: null,

  setData: (data) => set({ data, loading: false }),
  setSearch: (search) => set({ search }),
  setHealthFilter: (healthFilter) => set({ healthFilter }),

  toggleSelect: (id) =>
    set((state) => {
      const next = new Set(state.selected);
      next.has(id) ? next.delete(id) : next.add(id);
      return { selected: next };
    }),

  toggleSort: () =>
    set((state) => ({
      sort: state.sort === null ? "asc" : state.sort === "asc" ? "desc" : null,
    })),
}));
