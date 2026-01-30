import type { Character } from "../../types/character.ts";
import { useCharactersStore } from "../../features/characters/store/character.store";
import { HealthBadge } from "../ui/HealthBadge.tsx";

export const TableRow = ({
  row,
  style,
}: {
  row: Character;
  style: React.CSSProperties;
}) => {
  const { selected, toggleSelect } = useCharactersStore();
  const isSelected = selected.has(row.id);

  return (
    <div
      style={style}
      className={`
        grid grid-cols-[3rem_1fr_1fr_1fr_1fr] gap-4 px-4 py-3.5 items-center border-b border-gray-100 text-sm
        ${isSelected ? "bg-blue-50/60" : "bg-white hover:bg-gray-50/80"}
        transition-colors
      `}
    >
      <div className="text-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleSelect(row.id)}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          aria-label={`Select ${row.name}`}
        />
      </div>

      <div className="font-medium text-gray-900">{row.name}</div>
      <div className="text-gray-600">{row.location}</div>
      <HealthBadge health={row.health} />
      <div className="text-right font-mono text-gray-700 tabular-nums">{row.power}</div>
    </div>
  );
};
