# Ninja Table

A React app that displays a **virtualized characters table** with search, health filter, sort, and row selection. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## What it does

- **Virtualized table** – Renders only visible rows (TanStack Virtual) so large datasets stay fast.
- **Search** – Filter by name or location (debounced).
- **Health filter** – Filter by Healthy, Injured, or Critical.
- **Sort** – Toggle Power column: ascending → descending → none.
- **Selection** – Check rows and use Submit to get selected IDs (logged to console).

## Tech stack

| Area | Tech |
|------|------|
| UI | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS v4, DM Sans font |
| State | Zustand |
| Data | Axios, json-server (REST API) |
| Table | @tanstack/react-virtual |
| Icons | Lucide React |
| Tests | Vitest, Testing Library |

## Prerequisites

- **Node.js 18+** (22+ recommended). Check with `node -v`. Use `nvm use 22` (or `nvm use 18`) if needed.

## Quick start

1. **Clone and install**
   ```bash
   cd ninja-table
   npm install
   ```

2. **Start the API and the app** (easiest)
   ```bash
   npm run dev:all
   ```
   This runs the API on port 4000 and the Vite dev server (usually http://localhost:5173).

3. **Or run them separately**
   - Terminal 1: `npm run server` (API on http://localhost:4000)
   - Terminal 2: `npm run dev` (Vite dev server)

4. Open the app URL in the browser. The table loads characters from `http://localhost:4000/characters`.

## Project structure

```
ninja-table/
├── server/
│   ├── db.json          # API data (characters)
│   └── generate.js      # Optional data generator
├── src/
│   ├── api/             # API client (fetchCharacters)
│   ├── components/      # Table, TableHeader, TableRow, HealthFilter, HealthBadge
│   ├── features/characters/
│   │   ├── components/   # CharactersTable
│   │   └── store/       # Zustand store (character.store.ts)
│   ├── hooks/           # useDebounce
│   ├── test/            # Vitest setup
│   └── types/           # Character, Health types
├── index.html
├── package.json
└── vite.config.ts
```

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server only |
| `npm run dev:all` | Start API + Vite (one command) |
| `npm run server` | Start json-server on port 4000 (Node 18+ required) |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Preview production build |
| `npm run test` | Run Vitest in watch mode |
| `npm run test:run` | Run tests once |
| `npm run test:coverage` | Run tests with coverage report |
| `npm run lint` | Run ESLint |

## API

The app expects a REST API at **http://localhost:4000** with:

- **GET /characters** – Returns an array of character objects.

Each character has: `id`, `name`, `location`, `health` (Healthy | Injured | Critical), `power` (number), `viewed` (boolean).

Data is read from `server/db.json` when you run `npm run server`.

## Tests

- **Vitest** + **Testing Library**; setup in `src/test/setup.ts`.
- Tests live next to source (e.g. `CharactersTable.test.tsx`, `character.store.test.ts`).
- Run once: `npm run test:run`
- Coverage: `npm run test:coverage` (target ~80% coverage).

Requires Node 18+.

## Troubleshooting

- **ERR_CONNECTION_REFUSED on port 4000** – Start the API: `npm run server` or use `npm run dev:all`.
- **SyntaxError: Unexpected token '??=' or '||='** – Node is too old. Use Node 18+: `nvm use 22` (or `nvm use 18`), then run the command again.
- **Tests fail or Vitest won't run** – Ensure Node 18+: `node -v`.
