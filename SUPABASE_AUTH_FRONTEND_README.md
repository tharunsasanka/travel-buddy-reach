# Supabase authentication frontend update

This update adds email/password sign-up, sign-in, sign-out, persisted Supabase sessions, and bearer tokens on cloud-trip API requests.

## Required local environment

Keep these values in the ignored repository-root `.env` file:

```env
VITE_SUPABASE_URL=https://your-project-reference.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key
VITE_API_URL=http://localhost:4000/v1
```

Never place a Supabase secret or service-role key in a `VITE_` variable.

## Install

The web package requires:

```powershell
pnpm --filter @travel-buddy/web add @supabase/supabase-js
```

Copy the `apps` folder from this update over the repository's existing `apps` folder.

## Verify

```powershell
pnpm --filter @travel-buddy/contracts build
pnpm --filter @travel-buddy/web build
pnpm --filter @travel-buddy/web dev
```

At `http://localhost:5173`, select **Sign in**, create an account, confirm the email if required, and sign in.

This is the frontend half of the security milestone. Do not deploy the API publicly until the API verifies the bearer token and scopes every trip query by the authenticated user's ID.
