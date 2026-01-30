import fs from "fs";
import { randomUUID } from "crypto";

const locations = ["Konoha", "Suna", "Kiri", "Iwa", "Kumo"];
const health = ["Healthy", "Injured", "Critical"];

const characters = Array.from({ length: 1000 }, (_, i) => ({
  id: randomUUID(),
  name: `Ninja ${i + 1}`,
  location: locations[i % locations.length],
  health: health[i % health.length],
  power: Math.floor(Math.random() * 9900 + 100),
  viewed: false,
}));

fs.writeFileSync("./server/db.json", JSON.stringify({ characters }, null, 2));

console.log("✅ 1000 characters generated");
