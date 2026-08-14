# Sri Lankan homepage enhancement

This pack replaces the starter single-location homepage with a richer trip-planning experience.

## Included changes

- Sri Lankan landscape hero artwork, optimised as WebP
- Six editable prototype trip stops
- Category filters and destination cards
- Clickable stylised Sri Lanka planning map
- Detailed last-mile Access Graph example
- Interactive `Can I Go?` controls
- Future-feature roadmap
- Developer credit: `Designed and developed by Tharun Sasanka`
- Responsive desktop, tablet and mobile layout

## Apply to your repository

Copy the included `apps` folder over the `apps` folder in your local repository and allow Windows to replace matching files. No other project area is changed.

Alternatively, copy these files individually:

```text
apps/web/src/App.tsx
apps/web/src/SriLankaMap.tsx
apps/web/src/tripLocations.ts
apps/web/src/styles.css
apps/web/src/assets/sri-lanka-hero.webp
```

## Personalise it

- Edit the planned stops in `apps/web/src/tripLocations.ts`.
- Change the developer credit near the bottom of `apps/web/src/App.tsx` if needed.
- The map is a stylised planning visual, not a navigation map; marker positions are approximate.
- All included destinations are demonstration records until your group verifies them.

## Validate locally

```powershell
pnpm --filter @travel-buddy/contracts build
pnpm --filter @travel-buddy/web typecheck
pnpm --filter @travel-buddy/web build
pnpm --filter @travel-buddy/web dev
```

Open the local URL printed by Vite and review both desktop and narrow mobile widths.

## Commit through a pull request

```powershell
git switch main
git pull --ff-only
git switch -c feat/sri-lanka-trip-homepage
git add apps/web/src WEB_ENHANCEMENT_README.md
git commit -m "feat: expand Sri Lanka trip-planning homepage"
git push -u origin feat/sri-lanka-trip-homepage
gh pr create --base main --head feat/sri-lanka-trip-homepage --title "feat: expand Sri Lanka trip-planning homepage" --body "Adds multiple planned stops, an interactive Sri Lanka map, local visual identity, developer credit, and a richer responsive homepage."
```

