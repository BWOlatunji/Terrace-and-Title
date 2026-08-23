# Terrace & Title Web App — Project Overview

*Standard project documentation for stakeholders. Last updated 2026-08-18.*

This document is the entry point into the project for anyone who needs the business picture — not the code and not the pixel-level design spec, both of which live in their own documents (see [Related Documents](#related-documents) at the bottom). If you only read one document about this project, read this one.

---

## 1. Executive summary

Terrace & Title Real Estate Advisory Ltd is building a web application to replace its current online presence. The site's core bet: in a market where property listings are common and verifiable information is not, **published price data and visible title-verification status are the product's credibility engine**, and every page — no matter how data-rich — ends in the same conversion event: a booked call with a human advisor. Nothing on the site is gated behind a signup; the data is public on purpose.

The visual design and full UX for every priority screen is complete and has been validated as a clickable prototype. The technology stack is decided. The build has not started. This document, together with two companion documents for the developer and the designer, is the last step before implementation begins.

---

## 2. Business goals

| Goal | How the product serves it |
|---|---|
| Generate qualified advisory leads | Every data-heavy page (home, market data, price-check tool) ends in a "speak to an advisor" call-to-action rather than a content download or a gated signup |
| Win trust with a diaspora audience who cannot inspect a property in person | Virtual-inspection support, timezone-aware booking, and a title-verification process that is shown honestly — including when it isn't finished yet — are first-class product features, not afterthoughts |
| Differentiate on data, not decoration | Quarterly, district-level pricing data is public and updates on a real cadence, rather than being a one-time marketing asset |
| Reduce advisor workload on service existing clients (Phase 2) | A client portal will let an existing buyer track their own deal and documents without a phone call for every status update |

### Success metrics

Two actions on the public site matter more than any other engagement metric, and should be tracked as named goals in analytics from day one:
1. **Price-check tool completions** — a visitor asking "what is this worth," the moment the data is doing its job.
2. **Advisor call bookings** — the actual product being sold.

Secondary, slower-moving indicators worth watching: organic search visibility for district/price search terms (a direct benefit of listing and district pages having real, indexable URLs instead of a single-page app), and — once the portal ships — how many active deals are being tracked through it instead of over phone/email.

---

## 3. Audience

Young professionals, Nigerians in the diaspora, business owners, and corporate investors. The diaspora segment in particular cannot visit a property in person, which is why virtual inspection, document-chain transparency, and timezone-aware booking are treated as core requirements rather than nice-to-haves throughout the design.

---

## 4. Scope and phasing

The project is split into two phases, decided specifically so that the harder engineering work (client authentication and per-client data access) happens once there is real client data to build and test against, rather than against fixtures.

### v1 — Data-led marketing site (building now)

| Screen | Notes |
|---|---|
| Home | Hero, live data strip, verification explainer, market-intelligence chart band, featured listings, price-check CTA |
| Opportunities (listing search) | Filterable, sortable list of verified listings |
| Listing Detail | Full price/documentation/advisor detail per listing |
| Market Intelligence Hub | Full quarterly district pricing table + report request flow |
| Price Check tool | Self-serve district price estimator |
| Contact / Book an Inspection | Lead capture, including virtual-inspection booking |
| About, Services | Supporting brand/credibility pages |
| Portal Login screen | Exists as a stub in v1 (see below) |

### Phase 2 — Client portal (fast-follow, no committed start date yet)

| Screen | Notes |
|---|---|
| Portal Dashboard | Deal tracker (5-stage progress) + personal market watchlist |
| Portal Inquiries | A client's own inquiry history |
| Portal Documents | Document status + upload |

**Why the login screen ships in v1 but the portal doesn't:** the same principle used for any unbuilt destination in this product — a link should never lead to a blank or broken page. The login screen exists and looks finished; what's behind it is built once there are real clients and real deals to populate it with.

### Explicitly out of scope (for now)

Developer/partner-facing pages, legal pages (terms, privacy — required before a real launch, see [Risks](#7-risks-and-assumptions)), and an admin CMS beyond what Payload generates automatically. Any site link pointing to one of these currently resolves to a labelled "coming soon" placeholder rather than a dead link.

---

## 5. Roadmap

Dates are intentionally not fixed below — see [Open Questions](#8-open-questions--decisions-needed) for what's blocking a real target date.

| Stage | Status |
|---|---|
| Brand tokens, positioning, and UX defined | ✅ Complete |
| Clickable HTML prototype (all v1 + secondary screens) | ✅ Complete |
| Design system rationale documented | ✅ Complete |
| Logo and final typefaces integrated | ✅ Complete |
| Technology stack selected | ✅ Complete |
| Phasing decision (v1 public site → Phase 2 portal) | ✅ Complete |
| Project documentation package (developer, designer, stakeholder) | ✅ Complete (this document is the third of three) |
| Figma recreation of the design system | ⏳ Not started — owned by the external designer, using `docs/design-handoff.md` |
| Application scaffold (Next.js + Payload + database) | ⏳ Not started — next technical step |
| v1 build (public marketing site, content-populated) | ⏳ Not started |
| v1 launch | ⏳ Not started — **target: within 8 weeks of this document (~mid-October 2026)**, launching with the placeholder image system rather than waiting on real photography |
| Phase 2 (client portal) | ⏳ Not started — trigger condition set: begins once v1 has produced a meaningful volume of real inquiries/deals, not on a fixed calendar date (see Section 4) |

---

## 6. Technology approach, in brief

Full technical detail lives in `docs/walkthrough-for-developer.md`; this is the executive version.

The application is built on **Next.js** (the framework that renders every page and handles form submissions) with **Payload CMS** running inside it as the content-management layer — meaning there is one application to deploy and maintain, not a separate website and a separate backend service that could drift out of sync. All property listings, quarterly pricing data, advisors, developers, and client inquiries live in a **PostgreSQL database**, run by a provider called **Neon** and provisioned directly through Vercel's own dashboard (Vercel's "Storage" marketplace lists Neon as one of its database partners) rather than as a separate account — one bill, one dashboard, and environment variables wired in automatically. Photos and uploaded documents are stored separately with **Cloudflare R2**, which is materially cheaper than storing large files in the main database. The visual design is implemented with **Tailwind CSS**, configured directly from the brand's color, spacing, and typography tokens, so a token change (a color, a radius) propagates everywhere automatically instead of needing to be hunted down file by file. **Resend** sends confirmation emails when someone submits a form; a WhatsApp notification channel is planned for Phase 2. **Plausible** provides analytics without a cookie-consent banner, consistent with the brand's "nothing is gated, nothing is tracked invasively" posture. The whole application is hosted on **Vercel**.

This stack was chosen for three reasons worth stating plainly: it lets a single, small in-house developer own the whole application without needing separate backend and frontend specialists; it makes the quarterly-pricing-update workflow — the actual core of the product's credibility — a content-editing task rather than a code change; and every piece (Next.js, Payload, Neon, Vercel) is designed to work together with minimal custom integration glue.

---

## 7. What's been delivered so far

- A fully clickable HTML/CSS/JS prototype covering every v1 and Phase 2 screen, using realistic Abuja-specific content (six sample listings across Maitama, Asokoro, Jabi, Gwarinpa, Lugbe, and Kuje; plausible pricing; correct Nigerian land-title vocabulary — C of O, R of O, excision, gazette, Governor's Consent, deed of assignment).
- A written design-system rationale explaining *why* the visual choices were made, not just what they are.
- The client-supplied logo integrated into every instance of the lockup across the site (header, footer, mobile drawer, portal).
- Final typeface decisions applied throughout (Source Serif 4 for headings, Geist for body/UI, Manrope for labels, IBM Plex Mono for every number in the product).
- A complete technology stack decision, informed directly by the design's actual data and interaction requirements.
- Three onboarding/handoff documents: a jargon-free developer walkthrough, a full design-token and screen-by-screen specification for Figma recreation, and this document.

Nothing has been deployed publicly yet, and no real backend, database, or CMS exists yet — the prototype is a static, self-contained file with no server behind it.

---

## 8. Key decisions log

| Decision | Rationale |
|---|---|
| Pricing and market data are never gated behind a signup | The data *is* the credibility engine; gating it would undermine the core positioning |
| Every data-heavy page ends in "speak to an advisor," never a download or a signup | The advisor call is the only thing actually being sold |
| A title still in verification says so, rather than being hidden | Honesty about an incomplete process is treated as a trust signal, not a liability, matching the brand's "educational, confident, never pushy" voice |
| Client portal is Phase 2, not v1 | The portal is only meaningful once real inquiries and deals exist to populate it; building it against fixtures first would mean rebuilding the harder access-control logic later anyway |
| Payload CMS runs embedded inside Next.js rather than as a separate service | One deployable application, one thing to keep running, no API-sync risk between two systems |
| Hosting on Vercel | Pairs natively with the Next.js + Neon (serverless Postgres) + R2 combination with minimal custom deployment configuration |
| 2px border radius, system-wide | A deliberate rejection of the rounded "friendly SaaS" visual default, in favor of something that reads closer to private banking / institutional advisory |
| Every number in the product is set in monospace (IBM Plex Mono), without exception | The single strongest visual signal of the "data-led" positioning; diluting it with exceptions weakens the pattern |
| v1 launches with placeholder images rather than waiting for real photography | Decouples the software delivery timeline from a separate, slower photography production timeline; the placeholder system was designed to be a real launch-ready state, not just a dev stand-in |
| Phase 2 (portal) begins on an activity threshold, not a fixed calendar date | Matches the original reasoning for phasing the portal at all — it should be built once there's real client data to build and test against |
| Legal review of disclaimer copy and Terms/Privacy pages goes through Terrace & Title's existing counsel | Avoids launching with legally unvetted language on a tool that produces a valuation estimate |
| Database stays on Neon (queried in-house after `terraceandtitle.com`'s domain question raised the alternative) rather than switching to Prisma Postgres | Neon's branching feature is more mature and is the specific reason it was named in the original tech stack; Payload's Postgres adapter talks to it directly with no ORM-specific tooling needed, unlike Prisma Postgres which is built around the Prisma ecosystem this stack doesn't otherwise use. Provisioned through Vercel's own Storage marketplace rather than a separate neon.tech account, so the "keep it under one roof" benefit that motivated the question is achieved without changing providers |

---

## 9. Roles and responsibilities

| Role | Owns |
|---|---|
| In-house developer | Application build (Next.js/Payload/Postgres), using `docs/walkthrough-for-developer.md` as the onboarding reference |
| External designer | Figma recreation of the design system, using `docs/design-handoff.md`; any net-new screens/states this document flags as not-yet-designed |
| Stakeholders (Terrace & Title leadership) | Content accuracy (real listings, real advisor names/photos, real developer partnerships), legal/compliance sign-off (via existing counsel), launch timing |
| Bilikisu Olatunji | Quarterly pricing-data updates in the CMS once live |
| Maryam Aderinto | Creation, ownership, and billing administration of all five external service accounts (Section 10) |

---

## 10. Dependencies and accounts required

None of these exist yet and each needs an owner and a billing decision before the build can go to production (local development can proceed on free tiers for most of them):

| Service | Used for | Owner | Action needed |
|---|---|---|---|
| Vercel | Application hosting | Maryam Aderinto | Create org account, connect billing |
| Neon | Database hosting | Maryam Aderinto | Provision through Vercel's own Storage/marketplace tab (not a separate neon.tech signup), so billing stays unified under the Vercel account (free tier sufficient for development) |
| Cloudflare R2 | Photo and document storage | Maryam Aderinto | Create account, generate API credentials |
| Resend | Transactional email | Maryam Aderinto | Create account, verify sending domain (`terraceandtitle.com`) |
| Plausible | Analytics | Maryam Aderinto | Create account, connect billing (paid-only product) |
| Meta Cloud API (WhatsApp) | Phase 2 notification channel | Maryam Aderinto | Not needed yet — flagged here so approval (which can take time) can start early once Phase 2's activity threshold is close |
| Domain / DNS | Public URL for the live site | — | **Confirmed: `terraceandtitle.com`.** Terrace & Title already controls the registrar/DNS — ready for Vercel domain configuration whenever the build reaches that point |

---

## 11. Risks and assumptions

- **Real photography does not exist yet.** Every image in the current design is a labelled placeholder. Launch readiness depends on either real property/office photography being commissioned, or a conscious decision to launch with placeholders in specific spots — this should be a stated decision, not a default.
- **Quarterly data updates and external-service account administration are each owned by a single named person** — Bilikisu Olatunji for pricing data, Maryam Aderinto for the five service accounts. This resolves the original "no named owner" risk and splitting the two reduces the single-point-of-failure exposure somewhat, but each responsibility is still a single point of failure on its own: if either is unavailable for a stretch (leave, illness, departure), the corresponding function — fresh pricing data, or the team's access to hosting/database/storage/email/analytics accounts — has no backup. Worth a documented backup/succession plan (a second person with admin access, at minimum, for each role) before launch, not after something goes wrong.
- **Legal pages are out of scope of the current design but required before a real launch** — at minimum a privacy policy and terms of use, and likely a disclaimer specific to real estate advisory that a lawyer should review given the price-estimate tool.
- **Advisor names, photos, and contact details in the prototype are illustrative**, not real staff — these need to be replaced with actual team information before launch.
- **The in-house developer is new to every piece of this stack.** `docs/walkthrough-for-developer.md` is written specifically to close that gap, but a realistic build timeline should assume ramp-up time, not senior-developer velocity.
- **WhatsApp Business/Meta Cloud API approval can take longer than expected** and is not in the developer's direct control — worth starting early if Phase 2 has any target date.

---

## 12. Open questions — decisions needed

All six of the original questions in this section have now been resolved by stakeholders and are reflected in Sections 5, 8, 9, and 10 — including DNS/registrar control for `terraceandtitle.com`, confirmed as already held by Terrace & Title, which unblocks pointing Vercel at the domain and completing Resend's sending-domain verification whenever the build reaches that point.

No stakeholder-level open questions remain at this time. A separate, ongoing list of product-level decisions for the incoming Product Owner to work through lives in `docs/product-owner/open-questions.md` — that list is expected to keep growing as the project progresses, and reviewing it is a standing responsibility, not a one-time task.

---

## 13. Glossary (light)

A full, jargon-free glossary for anyone touching the code is in `docs/walkthrough-for-developer.md`. The handful of terms most likely to come up in a stakeholder conversation:

| Term | Plain-English meaning |
|---|---|
| CMS | The admin interface where staff add/edit listings, pricing, and content without needing a developer |
| v1 / Phase 2 | v1 is the initial public site launch; Phase 2 is the client portal, built afterward |
| Prototype | The current clickable design mockup — not the real, data-driven application |
| Staging / production | Staging is a private preview version of the site used for testing; production is the real, public live site |

---

## Related documents

| Document | Audience | Purpose |
|---|---|---|
| `docs/walkthrough-for-developer.md` | In-house developer | Jargon-free, step-by-step technical onboarding to the stack and codebase |
| `docs/design-handoff.md` | External designer | Full design-token reference and screen-by-screen spec for rebuilding the UI in Figma |
| `design-rationale.md` | Anyone | The *why* behind the visual design system |
| `index.html` | Anyone | The current clickable prototype — open directly in a browser |
| `tech stack.docx` | Anyone | The original source document naming the technology choices summarized in Section 6 |
