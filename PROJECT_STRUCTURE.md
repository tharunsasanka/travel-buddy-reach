# Project structure

```text
travel-buddy-reach/
├── apps/
│   ├── api/                    # Fastify REST API
│   │   ├── src/routes/         # Health, destinations, assessments
│   │   └── test/               # API and domain tests
│   ├── mobile/                 # Expo Android/iOS client
│   │   └── src/                # Screens, components, API client
│   └── web/                    # React public website/PWA foundation
│       └── src/                # Product demo and UI styles
├── packages/
│   ├── contracts/              # Shared schemas, types, assessment engine
│   └── database/               # Prisma schema, migrations, seed data
├── docs/                       # Product and engineering documentation
├── infra/                      # Docker and future deployment assets
├── .env.example                # Safe environment template
├── package.json                # Workspace scripts
├── pnpm-workspace.yaml         # Monorepo boundaries
└── turbo.json                  # Build orchestration
```

No folder references or imports code from another repository.

