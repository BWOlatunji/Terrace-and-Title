# Terrace & Title — Web Application

Next.js 16 + Payload CMS 3, running as a single deployable application on Vercel with Postgres (Neon) and Cloudflare R2.

**New here?** Don't start with this file — start with [`docs/walkthrough-for-developer.md`](docs/walkthrough-for-developer.md). It's a jargon-free, step-by-step onboarding doc written for someone who's never touched this stack before, and it covers local setup, the folder structure, and how the core features work end to end.

For everything else:

| Document | What it's for |
|---|---|
| [`docs/project-overview.md`](docs/project-overview.md) | Business context, roadmap, decisions log — read this first if you're not the developer |
| [`docs/BRD.md`](docs/BRD.md), [`docs/FRD.md`](docs/FRD.md), [`docs/FSD.md`](docs/FSD.md) | Business, functional, and implementation-level requirements |
| [`docs/design-handoff.md`](docs/design-handoff.md) | Full design-token and screen-by-screen specification |
| [`docs/product-owner/`](docs/product-owner/) | Product Goal, backlog, and working process for the Product Owner |

## Current status

This is a Phase 1 scaffold: the application boots, the design system is wired into Tailwind, and the full data model (all 9 Payload collections) is defined in code. It is **not yet connected to a real database** — `DATABASE_URI` still needs a real Postgres connection (provisioned via Vercel's Storage tab) before `npm run dev` or `npm run migrate` will fully work. See `docs/product-owner/product-backlog.md`, Epic A, for what's done and what's next.
