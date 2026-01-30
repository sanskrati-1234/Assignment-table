import axios from "axios";
import type { Character } from "../types/character.ts";

export const fetchCharacters = async (): Promise<Character[]> => {
  const res = await axios.get("http://localhost:4000/characters");
  return res.data;
};
