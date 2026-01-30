export type Health = "Healthy" | "Injured" | "Critical";

export type Character = {
  id: string;
  name: string;
  location: string;
  health: Health;
  power: number;
  viewed: boolean;
};
