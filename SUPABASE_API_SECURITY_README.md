# Supabase API security and trip ownership

This update verifies Supabase access tokens on every `/v1/trips` route and scopes all trip reads, updates and deletes to the authenticated token subject.

## Install

```powershell
pnpm --filter @travel-buddy/api add jose
```

Add the same project URL already used by `VITE_SUPABASE_URL` to the ignored root `.env`:

```env
SUPABASE_URL=https://your-project-reference.supabase.co
```

Do not add a service-role key. JWT verification uses the project's public JWKS endpoint.

## Update the local schema

Existing prototype trips receive a null owner and become inaccessible through the secured API. New trips are assigned to the signed-in Supabase user.

```powershell
$env:DATABASE_URL = "postgresql://travel_buddy:travel_buddy@localhost:55432/travel_buddy_reach"
pnpm db:generate
pnpm db:push
pnpm --filter @travel-buddy/database build
pnpm --filter @travel-buddy/api build
```

## Run locally

Set the API process variables in its terminal, using the real project URL:

```powershell
$env:DATABASE_URL = "postgresql://travel_buddy:travel_buddy@localhost:55432/travel_buddy_reach"
$env:SUPABASE_URL = "https://your-project-reference.supabase.co"
pnpm --filter @travel-buddy/api dev
```

Keep the web app running with `VITE_API_URL`, `VITE_SUPABASE_URL`, and `VITE_SUPABASE_PUBLISHABLE_KEY` in the ignored root `.env`.

## Security behavior

- Missing bearer tokens return `401 AUTHENTICATION_REQUIRED`.
- Invalid or expired tokens return `401 INVALID_ACCESS_TOKEN`.
- Trips belonging to another account return `404 TRIP_NOT_FOUND`, avoiding ownership disclosure.
- Existing unowned prototype trips are not accessible through the secured endpoints.
