import { useEffect, useMemo } from "react";
import { fetchCharacters } from "../../../api/characters.api";
import { useCharactersStore } from "../store/character.store";
import { useDebounce } from "../../../hooks/useDebounce";
import { Table } from "../../../components/table/Table";
import { Search, Send, Loader2 } from "lucide-react";

export const CharactersTable = () => {
  const {
    data,
    loading,
    setData,
    search,
    setSearch,
    healthFilter,
    sort,
    selected,
  } = useCharactersStore();

  const debounced = useDebounce(search);

  useEffect(() => {
    fetchCharacters().then(setData);
  }, [setData]);

  const rows = useMemo(() => {
    let r = [...data];

    if (debounced)
      r = r.filter(
        (x) =>
          x.name.toLowerCase().includes(debounced.toLowerCase()) ||
          x.location.toLowerCase().includes(debounced.toLowerCase()),
      );

    if (healthFilter.length)
      r = r.filter((x) => healthFilter.includes(x.health));

    if (sort === "asc") r.sort((a, b) => a.power - b.power);
    if (sort === "desc") r.sort((a, b) => b.power - a.power);

    return r;
  }, [data, debounced, healthFilter, sort]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" aria-hidden />
        <p className="text-gray-500 font-medium">Loading characters…</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Characters
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              aria-hidden
            />
            <input
              placeholder="Search by name or location…"
              className="w-full sm:w-80 pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search by name or location"
            />
          </div>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
            onClick={() => console.log(Array.from(selected))}
          >
            <Send className="w-4 h-4" aria-hidden />
            Submit
          </button>
        </div>
      </header>

      <section className="rounded-2xl border border-gray-200 bg-white shadow-card overflow-hidden">
        <Table rows={rows} />
      </section>
    </div>
  );
};
