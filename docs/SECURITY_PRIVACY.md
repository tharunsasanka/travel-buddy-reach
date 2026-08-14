# Security, privacy, and responsible travel

## Non-negotiable controls

- Hash passwords with Argon2id; never store recoverable passwords.
- Use short-lived access tokens, rotated refresh tokens, secure storage on mobile, and HTTP-only secure cookies on web.
- Require email verification and step-up authentication for administrators.
- Enforce role checks server-side. Guardian status never grants destination ownership.
- Validate all inputs, scan uploads, strip image metadata, generate safe derivatives, and keep originals private.
- Encrypt traffic and managed storage; rotate secrets and keep them outside the repository.
- Apply per-IP and per-account abuse limits with device-aware anomaly detection.
- Make moderation actions append-only in `AuditLog`.

## Journey privacy

- Exact private starting points are not accepted into public route replay.
- Public routes begin at a recognised access node, not the contributor's home or live position.
- Visit times shown publicly are bucketed; exact timestamps remain private.
- Recent-traveller questions use relay identifiers and explicit opt-in. No contact details are disclosed.
- Deletion removes public attribution and schedules private evidence deletion subject to legal/audit retention.

## Sensitive destinations

`Destination.sensitive` activates Responsible Reveal. Exact coordinates and access segments are withheld until rules, current opening status, and acknowledgement requirements are satisfied. Server responses enforce the policy; hiding UI elements is insufficient.

## Safety language

The app must say what evidence supports an assessment, its age, confidence, and gaps. It must never say a route is “safe” or guarantee arrival. Severe weather, closure, flooding, or stale evidence overrides positive suitability signals.

## Sri Lankan context

Before public launch, obtain legal review covering Sri Lanka's Personal Data Protection Act, consumer protection, location privacy, minors, content liability, payment processing if introduced, and terms for community/guardian contributions.

