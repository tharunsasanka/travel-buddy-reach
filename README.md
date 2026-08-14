# Travel Buddy Reach

**Don't just find it. Know how to reach it.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20App-d86438?logo=github)](https://tharunsasanka.github.io/travel-buddy-reach/)
[![Deploy to GitHub Pages](https://github.com/tharunsasanka/travel-buddy-reach/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/tharunsasanka/travel-buddy-reach/actions/workflows/deploy-pages.yml)

🌐 **Live application:** https://tharunsasanka.github.io/travel-buddy-reach/

Developed by **Tharun Sasanka** as an independent Sri Lankan travel-technology project.

Travel Buddy Reach is a standalone, community-powered destination reachability and last-mile travel intelligence platform for Sri Lanka. This repository is intentionally independent from every previous repository and Colab project.

## What is included

- `apps/web` — public product website and traveller experience (React + Vite)
- `apps/mobile` — Android/iOS application foundation (Expo + React Native)
- `apps/api` — versioned HTTP API (Fastify)
- `packages/contracts` — shared domain types, validation, and assessment rules
- `packages/database` — PostgreSQL/PostGIS data model and seed data (Prisma)
- `infra` — local database and deployment building blocks
- `docs` — architecture, API, security/privacy, and delivery guidance

## Quick start

Prerequisites: Node.js 22+, pnpm 10+, Docker Desktop.

```bash
cp .env.example .env
pnpm install
docker compose -f infra/docker-compose.yml up -d
pnpm db:generate
pnpm db:migrate
pnpm db:seed
pnpm dev
```

Local services:

- Web: `http://localhost:5173`
- API health: `http://localhost:4000/health`
- PostgreSQL/PostGIS: `localhost:5432`

For the Expo Android app, run `pnpm --filter @travel-buddy/mobile dev` and open it in Expo Go or an Android emulator. A production APK/AAB should be built with EAS after configuring signing credentials.

## First delivery boundary

This repository establishes a runnable MVP foundation, representative destination data, and the core `Can I Go?` logic. Production launch still requires verified destination research, moderation staffing, identity/email providers, map tiles, object storage, observability, legal review, and an AI retrieval pipeline.

## Safety principle

Assessments are evidence-based travel guidance, never a safety guarantee. Every response exposes evidence freshness and uncertainty.

[![CI](https://github.com/tharunsasanka/travel-buddy-reach/actions/workflows/ci.yml/badge.svg)](https://github.com/tharunsasanka/travel-buddy-reach/actions/workflows/ci.yml)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-54-000020?logo=expo&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-PostGIS-4169E1?logo=postgresql&logoColor=white)
![Sri Lanka](https://img.shields.io/badge/Built%20for-Sri%20Lanka-FFB81C)

