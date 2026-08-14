# Travel Buddy Reach — Trip Planner MVP

This enhancement turns the static homepage into a browser-based itinerary planner.

## Included

- Add, edit and delete trip destinations
- Save the itinerary automatically with `localStorage`
- Filter destinations by category
- Keep cards and the Sri Lanka map synchronized
- Open a shareable-style destination detail view using `#destination/{id}`
- Restore the six starter destinations at any time
- Responsive forms and detail views

## Apply the enhancement on Windows

1. Close the development server if it is running (`Ctrl+C`).
2. Extract this ZIP.
3. Copy the included `apps` folder into the root of your existing `travel-buddy-reach` project.
4. Choose **Replace the files in the destination** if Windows asks.
5. Open PowerShell in the project folder and run:

```powershell
pnpm install
pnpm --filter @travel-buddy/web dev
```

Open the local address printed by Vite, normally <http://localhost:5173>.

## What to test

1. Click **Add destination**, complete the form, and save it.
2. Confirm the new card and map marker both appear.
3. Click **Open details**, then edit the destination.
4. Refresh the browser and confirm your changes remain.
5. Delete a test destination and confirm it disappears from both the cards and map.

Your itinerary is currently saved only in that browser on that device. Clearing site data removes it. A database and user accounts are the recommended next milestone.

## Commit and open a pull request

```powershell
git switch main
git pull --ff-only
git switch -c feat/trip-planner-mvp
git add apps/web/src
git commit -m "feat: add persistent trip planner"
git push -u origin feat/trip-planner-mvp
gh pr create --base main --head feat/trip-planner-mvp --title "feat: add persistent trip planner" --body "Adds editable destinations, browser persistence, synchronized map markers, and destination detail views."
```

After GitHub Actions passes, merge the pull request on GitHub. Do not push this feature directly to protected `main`.
