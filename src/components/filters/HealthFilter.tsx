import type { Health } from "../../types/character.ts";
import { useCharactersStore } from "../../features/characters/store/character.store";

const options: Health[] = ["Healthy", "Injured", "Critical"];

export const HealthFilter = () => {
  const { healthFilter, setHealthFilter } = useCharactersStore();

  const toggle = (h: Health) => {
    setHealthFilter(
      healthFilter.includes(h)
        ? healthFilter.filter((x) => x !== h)
        : [...healthFilter, h],
    );
  };

  return (
    <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg p-3 space-y-2 z-30 min-w-[160px]">
      {options.map((h) => (
        <label
          key={h}
          className="flex gap-2.5 items-center cursor-pointer text-sm text-gray-700 hover:text-gray-900"
        >
          <input
            type="checkbox"
            checked={healthFilter.includes(h)}
            onChange={() => toggle(h)}
            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          {h}
        </label>
      ))}
    </div>
  );
};
