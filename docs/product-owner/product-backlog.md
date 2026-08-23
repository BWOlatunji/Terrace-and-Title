# Product Backlog

**Related documents:** `docs/product-owner/product-goal.md` (what this backlog exists to achieve), `docs/product-owner/backlog-ordering-rationale.md` (why it's ordered this way — read that alongside this document, not after it), `docs/FRD.md` (the FR-### IDs referenced throughout), `docs/FSD.md` (implementation detail behind flagged gaps)

---

## How to read this document

This is the single, ordered source of truth for what the team builds next, in priority order top to bottom **within v1**. It is not the FRD rewritten — the FRD is the durable requirements reference; this backlog is the living, re-orderable plan for delivering against it. Items here bundle related FR-### requirements into buildable, reviewable chunks (a single FR is rarely a sensible unit of delivery on its own), and also include real work that has no FR number at all — infrastructure, content population, legal, and launch-readiness tasks that the FRD doesn't cover but the Product Goal depends on.

**This backlog is a living artifact.** Reorder it, split items, merge items, or add newly-discovered work as understanding improves — that reordering authority is the core of the Product Owner accountability (see `docs/product-owner/role-charter.md`). Nothing below should be read as fixed simply because it's written down.

**Sizing is deliberately absent.** Every item below is marked "Not yet sized." Estimating how much effort an item takes is a developer accountability, not a Product Owner one — the Product Owner decides *what* matters and *why*, the developer decides *how* and *how long*. Sizing happens during backlog refinement (see `docs/product-owner/working-cadence.md`), not in this document.

Status values used below: **Not started** (everything, currently — nothing has been built yet), **In progress**, **Done**. Update this column directly as work proceeds; it's the fastest way for anyone to see real state without a status meeting.

---

## Epic A — Foundation & Infrastructure

*No FR-### references — this is enabling work nothing else can start without. See rationale document for why it leads the backlog despite delivering no visible feature.*

| ID | Item | Notes | Size | Status |
|---|---|---|---|---|
| PBI-001 | Scaffold the Next.js + Payload CMS application, connected to a Neon Postgres database | Per `docs/walkthrough-for-developer.md` Section 3–4 | Not yet sized | Not started |
| PBI-002 | Configure the Tailwind theme directly from the design tokens in `docs/design-handoff.md` Section 1 | Colors, type scale, the single 2px radius, spacing scale | Not yet sized | Not started |
| PBI-003 | Define core Payload collection schemas: Listings, Districts, PriceQuarters, Advisors, Developers, Articles, Inquiries, Media, Users | Underlies nearly every later epic — see rationale doc for the specific downstream dependency this unblocks early | Not yet sized | Not started |
| PBI-004 | Set up the Vercel deployment pipeline with preview environments | Account owned by Maryam Aderinto (`docs/project-overview.md` §10) | Not yet sized | Not started |
| PBI-005 | Configure the Cloudflare R2 storage adapter for the Media collection | Supports FR-312 | Not yet sized | Not started |
| PBI-006 | Configure the Resend integration for transactional email | Supports FR-406 | Not yet sized | Not started |
| PBI-007 | Configure Plausible analytics, including the two custom goal events | Supports FR-408 | Not yet sized | Not started |

---

## Epic B — Home & Credibility Surfaces

*The pages that make the core positioning ("the data is the product") visible on first contact.*

| ID | Item | FR refs | Size | Status |
|---|---|---|---|---|
| PBI-010 | Build the Home page hero and headline data strip | FR-101, FR-102 | Not yet sized | Not started |
| PBI-011 | Build the verification-process explainer band | FR-103 | Not yet sized | Not started |
| PBI-012 | Build the market-intelligence chart band (prime/suburban trend, district bars) | FR-104, FR-401, FR-402 | Not yet sized | Not started |
| PBI-013 | Build the featured-opportunities section on Home | FR-105 | Not yet sized | Not started |
| PBI-014 | Build the About page | FR-123 | Not yet sized | Not started |
| PBI-015 | Build the Services page | FR-124 | Not yet sized | Not started |

---

## Epic C — Lead Capture

*The actual conversion mechanism — where BO-1 is either realized or it isn't.*

| ID | Item | FR refs | Size | Status |
|---|---|---|---|---|
| PBI-020 | Build the Contact page's General Inquiry tab, including email confirmation | FR-120, FR-406, FR-408 | Not yet sized | Not started |
| PBI-021 | Build the Inspection Booking tab (property, date, mode, timezone, virtual-walkthrough note) | FR-121, FR-122 | Not yet sized | Not started |
| PBI-022 | Add duplicate-submission protection to both lead forms | Closes a gap flagged in `docs/FSD.md` (FR-114/FR-120) — the static prototype allows a double-click to create two records | Not yet sized | Not started |
| PBI-023 | Build newsletter subscription capture in the footer | FR-125 — **blocked on a product decision**, see `docs/product-owner/open-questions.md` (subscriber storage/tooling not yet chosen) | Not yet sized | Not started |

---

## Epic D — Market Intelligence & Price Check

*The other half of the credibility engine — the self-serve, always-public data.*

| ID | Item | FR refs | Size | Status |
|---|---|---|---|---|
| PBI-030 | Build the Market Intelligence Hub: index band + full quarterly pricing table | FR-115, FR-116, FR-402 | Not yet sized | Not started |
| PBI-031 | Build the "request full report via advisor" flow | FR-117 | Not yet sized | Not started |
| PBI-032 | Build the related-education-articles list on the Market Hub | FR-118 | Not yet sized | Not started |
| PBI-033 | Build the Price Check tool, including live computation | FR-119, FR-403, FR-404 | Not yet sized | Not started |
| PBI-034 | Implement a visible "as of [quarter]" label on any district row that's missing a current-quarter update | Closes a gap flagged in `docs/FSD.md` FR-116 — directly protects the "data is never stale without saying so" claim behind BO-2 | Not yet sized | Not started |

---

## Epic E — Content Operations Enablement (Admin)

*Pulled forward ahead of the public-facing Opportunities/Listing Detail pages on purpose — see rationale doc.*

| ID | Item | FR refs | Size | Status |
|---|---|---|---|---|
| PBI-040 | Admin: Listings collection — create, edit, publish/unpublish | FR-302 | Not yet sized | Not started |
| PBI-041 | Admin: Districts collection — create, edit | FR-303 | Not yet sized | Not started |
| PBI-042 | Admin: single-record quarterly pricing entry | FR-304 | Not yet sized | Not started |
| PBI-043 | Admin: custom bulk quarterly-pricing grid view | FR-305 — the specific workflow Bilikisu Olatunji will use every quarter; see `docs/project-overview.md` §9 | Not yet sized | Not started |
| PBI-044 | Implement on-demand cache revalidation when a Listing or PriceQuarters record is saved | FR-405 | Not yet sized | Not started |

---

## Epic F — Opportunities & Listing Detail

*The browse-and-evaluate journey. Deliberately sequenced after lead capture and the data surfaces — see rationale doc for why that's a defensible order, not an oversight.*

| ID | Item | FR refs | Size | Status |
|---|---|---|---|---|
| PBI-050 | Build the Opportunities list with the full filter rail | FR-106, FR-107, FR-109 | Not yet sized | Not started |
| PBI-051 | Build the Opportunities sort control | FR-108 | Not yet sized | Not started |
| PBI-052 | Build the Listing Detail page core: stats strip, price-history chart, projected-use-case text | FR-110, FR-111 | Not yet sized | Not started |
| PBI-053 | Build the documentation status table | FR-112 | Not yet sized | Not started |
| PBI-054 | Build the developer-partner card | FR-113 | Not yet sized | Not started |
| PBI-055 | Build the advisor callback request form | FR-114 | Not yet sized | Not started |
| PBI-056 | Implement automatic listing URL slug generation | FR-409 | Not yet sized | Not started |
| PBI-057 | Design and build a proper "listing not found" state | Closes a gap flagged in `docs/design-handoff.md` and `docs/FSD.md` FR-110 — currently undesigned | Not yet sized | Not started |

---

## Epic G — Supporting Admin & Content Population

| ID | Item | FR refs | Size | Status |
|---|---|---|---|---|
| PBI-060 | Admin: Advisors collection — create, edit | FR-306 | Not yet sized | Not started |
| PBI-061 | Admin: Developer partners collection — create, edit | FR-307 | Not yet sized | Not started |
| PBI-062 | Admin: Articles collection — create, edit | FR-308 | Not yet sized | Not started |
| PBI-063 | Admin: Inquiries triage — status changes, advisor assignment | FR-309 | Not yet sized | Not started |
| PBI-064 | Admin: Media management via R2 | FR-312 | Not yet sized | Not started |
| PBI-065 | Admin: staff Users and permissions, including the super-admin gate | FR-313 | Not yet sized | Not started |
| PBI-066 | Populate real content: real advisor names/photos, real listings, real developer partnerships, replacing every placeholder from the prototype | Closes a risk flagged in `docs/project-overview.md` §11 | Not yet sized | Not started |

---

## Epic H — Navigation, Responsive & Polish

| ID | Item | FR refs | Size | Status |
|---|---|---|---|---|
| PBI-070 | Build the desktop header navigation and the mobile burger/drawer navigation | FR-126 | Not yet sized | Not started |
| PBI-071 | Build the "coming soon" placeholder page, rendered inside full site chrome for any unbuilt nav destination | FR-126 | Not yet sized | Not started |
| PBI-072 | Verify every v1 screen at the three required breakpoints (1440 / 1080 / 700) | Per `docs/design-handoff.md` responsive requirements | Not yet sized | Not started |
| PBI-073 | Add missing focus-visible and disabled states to the Button component | Closes a gap flagged in `docs/design-handoff.md` — no such states are currently styled anywhere in the build | Not yet sized | Not started |

---

## Epic I — Launch Readiness

*Necessarily last — most of this epic can't meaningfully start until the epics above are functionally complete.*

| ID | Item | Notes | Size | Status |
|---|---|---|---|---|
| PBI-080 | Draft and legally review Terms of Use and Privacy Policy | Via existing counsel, per `docs/project-overview.md` §8 decision | Not yet sized | Not started |
| PBI-081 | Legal review of the Price Check tool's and Listing Detail's disclaimer copy | Same legal-review path as PBI-080 | Not yet sized | Not started |
| PBI-082 | Point `terraceandtitle.com` at Vercel | Registrar/DNS control is confirmed as already held by Terrace & Title (`docs/project-overview.md` §10) — this item is now just the configuration work itself, no longer blocked on a confirmation | Not yet sized | Not started |
| PBI-083 | Verify the Resend sending domain (`terraceandtitle.com`) | Supports FR-406 | Not yet sized | Not started |
| PBI-084 | Final QA pass confirming every form's validation rules are enforced server-side, not only client-side | Directly addresses a pattern flagged repeatedly in `docs/FSD.md` (FR-120, FR-121, FR-208) | Not yet sized | Not started |
| PBI-085 | Confirm both Plausible custom goals are firing correctly in production | FR-408 | Not yet sized | Not started |

---

## Epic J — Client Portal *(Phase 2 — parked, not ordered in detail)*

This epic exists to record scope, not to be worked yet. Per `docs/product-owner/product-goal.md`, Phase 2 does not begin until the current Product Goal is judged fulfilled and the activity-threshold trigger is met — detailed ordering of the items below is deliberately deferred until that planning actually happens, since building a precise plan for work that may not start for months invites rework. Listed here only so nothing is lost between now and then.

| FR refs | Scope |
|---|---|
| FR-201, FR-202, FR-208 | Client authentication, sign-out, and server-side own-records-only access control |
| FR-203, FR-204, FR-205 | Portal dashboard, deal tracker, personal watchlist |
| FR-206, FR-207 | Client's own inquiries list; documents list and upload |
| FR-310, FR-311 | Admin-side document verification and deal-stage management |
| FR-407 | WhatsApp notification channel via Meta Cloud API |

**One time-sensitive exception:** Meta Cloud API/WhatsApp Business approval can have a long lead time and isn't fully in the developer's control (flagged as a risk in `docs/project-overview.md` §11). Whether to start that approval process *before* Phase 2 formally begins is a real open decision — see `docs/product-owner/open-questions.md`.
