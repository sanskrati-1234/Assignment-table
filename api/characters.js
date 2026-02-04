import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }
  try {
    const pathToDb = join(process.cwd(), "server", "db.json");
    const raw = readFileSync(pathToDb, "utf-8");
    const data = JSON.parse(raw);
    const characters = data.characters ?? [];
    res.setHeader("Cache-Control", "public, max-age=60");
    res.status(200).json(characters);
  } catch (err) {
    console.error("characters API error:", err);
    res.status(500).json({ error: "Failed to load characters" });
  }
}
