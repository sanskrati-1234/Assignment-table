import { ChevronUp, ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { HealthFilter } from "../filters/HealthFilter";
import { useCharactersStore } from "../../features/characters/store/character.store";

export const TableHeader = () => {
  const { toggleSort, sort } = useCharactersStore();
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="grid grid-cols-[3rem_1fr_1fr_1fr_1fr] gap-4 bg-gray-50/80 border-b border-gray-200 px-4 py-3.5 font-semibold text-sm text-gray-700 sticky top-0 z-20 backdrop-blur-sm">
      <div className="text-center">Select</div>
      <div>Name</div>
      <div>Location</div>

      <div className="flex items-center gap-1.5 relative">
        Health
        <button
          type="button"
          className="p-1 rounded-lg text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition"
          onClick={() => setShowFilter((s) => !s)}
          aria-label="Toggle health filter"
          aria-expanded={showFilter}
        >
          <Filter size={14} />
        </button>
        {showFilter && <HealthFilter />}
      </div>

      <button
        type="button"
        onClick={toggleSort}
        className="flex items-center justify-end gap-1.5 hover:text-gray-900 transition"
        aria-label={sort === "asc" ? "Sort ascending" : sort === "desc" ? "Sort descending" : "Sort by power"}
      >
        Power
        {sort === "asc" && <ChevronUp size={14} className="text-blue-600" />}
        {sort === "desc" && <ChevronDown size={14} className="text-blue-600" />}
      </button>
    </div>
  );
};
