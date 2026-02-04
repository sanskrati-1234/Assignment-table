import axios from "axios";
import type { Character } from "../types/character.ts";

const API_BASE =
  import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export const fetchCharacters = async (): Promise<Character[]> => {
  const res = await axios.get(`${API_BASE}/characters`);
  return res.data;
};
