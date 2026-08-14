\# Contributing to Travel Buddy Reach



Thank you for helping improve destination reachability information for travellers in Sri Lanka.



\## Development setup



1\. Install Node.js 22 or newer.

2\. Install pnpm 10 or newer.

3\. Copy `.env.example` to `.env`.

4\. Install dependencies with `pnpm install`.

5\. Start PostgreSQL with Docker.

6\. Run the project with `pnpm dev`.



\## Contribution workflow



1\. Create or select a GitHub issue.

2\. Create a branch from `main`.

3\. Make one focused change.

4\. Add or update tests where appropriate.

5\. Run type checks, tests, and builds.

6\. Commit using a descriptive message.

7\. Push the branch and open a pull request.



\## Branch names



Use descriptive branch names:



\- `feat/destination-search`

\- `fix/walking-assessment`

\- `docs/android-setup`

\- `test/confidence-score`

\- `refactor/access-graph`



\## Commit messages



Use Conventional Commit-style messages:



\- `feat: add destination search`

\- `fix: correct walking-distance assessment`

\- `docs: explain Android setup`

\- `test: cover closed destinations`

\- `refactor: extract confidence calculator`

\- `ci: update validation workflow`



\## Destination evidence



Destination information must include:



\- Source classification

\- Observation date

\- Expiry date where applicable

\- Vehicle suitability evidence

\- Parking and walking information

\- Privacy-safe route details



Seed and demonstration data must not be presented as field-verified information.



\## Safety and privacy



Do not commit:



\- Private starting locations

\- Live traveller locations

\- Personal contact information

\- Unredacted image metadata

\- API keys, passwords or `.env` files



Travel assessments must be presented as guidance, never as a safety guarantee.



\## Pull requests



Pull requests should explain:



\- What changed

\- Why it changed

\- How it was tested

\- Any privacy or safety impact

