# Terrace & Title — Web Application

Next.js 16 + Payload CMS 3, running as a single deployable application on Vercel with Postgres (Neon) and Cloudflare R2.

**New here?** Don't start with this file — start with [`docs/walkthrough-for-developer.md`](docs/walkthrough-for-developer.md). It's a jargon-free, step-by-step onboarding doc written for someone who's never touched this stack before, and it covers local setup, the folder structure, and how the core features work end to end.

For everything else:

| Document | What it's for |
|---|---|
| [`docs/project-overview.md`](docs/project-overview.md) | Business context, roadmap, decisions log — read this first if you're not the developer |
| [`docs/BRD.md`](docs/BRD.md), [`docs/FRD.md`](docs/FRD.md), [`docs/FSD.md`](docs/FSD.md) | Business, functional, and implementation-level requirements |
| [`docs/design-handoff.md`](docs/design-handoff.md) | Full design-token and screen-by-screen specification |
| [`docs/database-reference.md`](docs/database-reference.md) | The 9-table schema with real example data, and where to browse/query it |
| [`docs/product-owner/`](docs/product-owner/) | Product Goal, backlog, and working process for the Product Owner |

## Current status

Live at [terraceandtitle.com](https://terraceandtitle.com), connected to a real Neon Postgres database (provisioned through Vercel's Storage tab), and seeded with sample data (`npm run seed`) — see `docs/database-reference.md`. The application boots, the design system is wired into Tailwind, and the full data model (all 9 Payload collections) is defined in code and migrated. The Home page is still a placeholder; the real designed screens (Epic B onward in `docs/product-owner/product-backlog.md`) haven't been built yet. Cloudflare R2, Resend, and Plausible (Epic A, PBI-005–007) also remain unconnected.
