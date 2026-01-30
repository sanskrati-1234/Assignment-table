import type { Health } from "../../types/character.ts";

const styles: Record<Health, string> = {
  Healthy: "bg-emerald-100 text-emerald-800 border border-emerald-200/60",
  Injured: "bg-amber-100 text-amber-800 border border-amber-200/60",
  Critical: "bg-red-100 text-red-800 border border-red-200/60",
};

export const HealthBadge = ({ health }: { health: Health }) => {
  return (
    <span
      className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${styles[health]}`}
    >
      {health}
    </span>
  );
};
