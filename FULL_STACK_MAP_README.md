# Travel Buddy Reach — Backend, Database and Real Map

This milestone adds an interactive OpenStreetMap, accurate coordinate fields, PostgreSQL trip storage, Fastify trip CRUD routes and optional cloud synchronization. Browser storage remains available when the API is not configured.

## What changes

- Real Leaflet/OpenStreetMap with zoom, pan, markers and popups
- Latitude and longitude fields for every destination
- New Prisma `Trip` and `TripStop` models
- `POST`, `GET`, `PUT` and `DELETE` routes under `/v1/trips`
- Optional **Save to cloud** button when `VITE_API_URL` is configured
- Automatic loading of the browser's previously linked cloud trip
- Local-storage fallback for offline and GitHub Pages-only operation

## Apply on Windows

Copy every included file and folder into the root of `travel-buddy-reach`, replacing files when prompted. Then run:

```powershell
pnpm install
Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue
```

## Start PostgreSQL

Install and start Docker Desktop, then run:

```powershell
docker compose -f infra/docker-compose.yml up -d
docker compose -f infra/docker-compose.yml ps
```

Create the local database tables and Prisma client:

```powershell
pnpm db:generate
pnpm db:push
```

`db:push` is appropriate for this local prototype. Before a production database launch, create and review a versioned Prisma migration.

## Run the full stack

Open two PowerShell terminals in the repository.

Terminal 1:

```powershell
pnpm --filter @travel-buddy/contracts build
pnpm --filter @travel-buddy/database build
pnpm --filter @travel-buddy/api dev
```

Terminal 2:

```powershell
pnpm --filter @travel-buddy/web dev
```

Open <http://localhost:5173>. The API should respond at <http://localhost:4000/health>. Because `.env` contains `VITE_API_URL=http://localhost:4000/v1`, the planner will show **Save to cloud**.

## Verify

1. Add a destination with verified latitude and longitude.
2. Confirm its marker appears on the interactive map.
3. Click **Save to cloud**.
4. Refresh the page and confirm the cloud-linked trip reloads.
5. Check API health:

```powershell
Invoke-RestMethod "http://localhost:4000/health"
```

## Important production boundary

The new trip routes are deliberately an infrastructure milestone and do not yet include authentication or authorization. Do not expose this API publicly until the next security milestone adds accounts, ownership checks and protected edit access.

GitHub Pages will still deploy the real map with local browser storage. After a secure API is hosted, add a GitHub repository Actions variable named `VITE_API_URL` containing the public API base URL, such as `https://api.example.com/v1`.

## Suggested branch and pull request

```powershell
git switch main
git pull --ff-only
git switch -c feat/backend-database-real-map
git add .
git commit -m "feat: add database-backed trips and real map"
git push -u origin feat/backend-database-real-map
gh pr create --base main --head feat/backend-database-real-map --title "feat: add database-backed trips and real map" --body "Adds PostgreSQL trip storage, Fastify trip CRUD routes, optional cloud sync, and an interactive OpenStreetMap."
```
