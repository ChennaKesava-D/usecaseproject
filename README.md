# Expense Tracker — No Database (In-Memory)

A simple dynamic web app: Express backend + vanilla JS frontend, with data kept **in a JavaScript array in memory** — no file, no database.

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000

## Why "no database"?

- Data is stored in a `let expenses = []` array inside `server.js`.
- It's dynamic — add/delete an expense and the page updates instantly via `fetch()` calls to the API.
- Nothing is written to disk, so there's zero setup — but data disappears whenever the server restarts (deploy, crash, scale event, sleep on free hosting tiers, etc).

## When to upgrade

If you need data to survive a restart, swap the in-memory array for:
- A JSON file on disk (simplest, fine for single-instance apps)
- SQLite (`better-sqlite3`) for a real embedded database with zero server setup
- A hosted database (Postgres, MongoDB Atlas, etc.) for anything production-grade

## Deploying

Works the same way as any Node/Express app — e.g. on Azure Web App, set:
- Runtime: Node 20 LTS, Linux
- Startup: leave default (`npm start` runs automatically)

No environment variables or connection strings needed, since there's no database to configure.
