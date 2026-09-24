# Product Backlog

**Related documents:** `docs/product-owner/product-goal.md` (what this backlog exists to achieve), `docs/product-owner/backlog-ordering-rationale.md` (why it's ordered this way — read that alongside this document, not after it), `docs/FRD.md` (the FR-### IDs referenced throughout), `docs/FSD.md` (implementation detail behind flagged gaps)

---

## How to read this document

This is the single, ordered source of truth for what the team builds next, in priority order top to bottom **within v1**. It is not the FRD rewritten — the FRD is the durable requirements reference; this backlog is the living, re-orderable plan for delivering against it. Items here bundle related FR-### requirements into buildable, reviewable chunks (a single FR is rarely a sensible unit of delivery on its own), and also include real work that has no FR number at all — infrastructure, content population, legal, and launch-readiness tasks that the FRD doesn't cover but the Product Goal depends on.

**This backlog is a living artifact.** Reorder it, split items, merge items, or add newly-discovered work as understanding improves — that reordering authority is the core of the Product Owner accountability (see `docs/product-owner/role-charter.md`). Nothing below should be read as fixed simply because it's written down.

**Sizing is deliberately absent.** Every item below is marked "Not yet sized." Estimating how much effort an item takes is a developer accountability, not a Product Owner one — the Product Owner decides *what* matters and *why*, the developer decides *how* and *how long*. Sizing happens during backlog refinement (see `docs/product-owner/working-cadence.md`), not in this document.

Status values used below: **Not started**, **In progress**, **Done**. Update this column directly as work proceeds; it's the fastest way for anyone to see real state without a status meeting.

### v1 is now split into v1a and v1b — see the Release column

Partway through the build, with the application scaffold live and seeded with sample data but almost none of the real public pages built yet, the decision was made to split v1 into two releases rather than hold everything for one big-bang launch:

- **v1a — data demo.** Every screen that actually displays the seeded data (Home, Market Intelligence Hub, Price Check, Opportunities, Listing Detail) plus a working Contact/Inspection form, admin content management, and navigation/polish. The goal is a real, demoable site — not a private mockup — proving the core "data is the product" concept end to end.
- **v1b — full public launch.** Cloudflare R2, Resend, and Plausible (all three deferred as a deliberate scope cut, not an oversight), plus About/Services, real content replacing every placeholder, the newsletter capture, and the full legal Terms/Privacy/disclaimer review.

**One real consequence of this split, decided deliberately rather than falling out by accident:** since the Contact form ships in v1a without Resend, submissions save to the database and are visible in `/admin`, but no confirmation email goes out — staff must check manually in the interim.

**A second consequence, caught only because the site turned out to already be fully public with no password gate:** a live Contact form collecting real name/phone/email, with no privacy policy published yet (that's v1b, legal-review-gated), is a real compliance gap, not just a cosmetic one. The decision was to fast-track a minimal privacy/data-use notice — lighter-weight than the full Terms/Privacy pages — ahead of the Contact form going live. See **PBI-024** below.

The target date originally set for a single v1 launch no longer applies to either release cleanly — see `docs/product-owner/open-questions.md` for that as an open item rather than a number invented here.

---

## Epic A — Foundation & Infrastructure

*No FR-### references — this is enabling work nothing else can start without. See rationale document for why it leads the backlog despite delivering no visible feature.*

| ID | Item | Notes | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-001 | Scaffold the Next.js + Payload CMS application, connected to a Neon Postgres database | Per `docs/walkthrough-for-developer.md` Section 3–4 | Not yet sized | Done | v1a |
| PBI-002 | Configure the Tailwind theme directly from the design tokens in `docs/design-handoff.md` Section 1 | Colors, type scale, the single 2px radius, spacing scale | Not yet sized | Done | v1a |
| PBI-003 | Define core Payload collection schemas: Listings, Districts, PriceQuarters, Advisors, Developers, Articles, Inquiries, Media, Users | Underlies nearly every later epic — see rationale doc for the specific downstream dependency this unblocks early. Verified against real seeded data — see `docs/database-reference.md` | Not yet sized | Done | v1a |
| PBI-004 | Set up the Vercel deployment pipeline with preview environments | Production deploys confirmed working (live at `terraceandtitle.com`, auto-deploys on push to `main`). Preview-deployment behavior on non-main branches has not been specifically tested | Not yet sized | Mostly done | v1a |
| PBI-005 | Configure the Cloudflare R2 storage adapter for the Media collection | Supports FR-312. Media currently uses local disk storage, which does not persist across Vercel deploys — worth prioritizing before any real photo gets uploaded | Not yet sized | Not started | v1b |
| PBI-006 | Configure the Resend integration for transactional email | Supports FR-406 — blocks real confirmation emails on every lead-capture form | Not yet sized | Not started | v1b |
| PBI-007 | Configure Plausible analytics, including the two custom goal events | Supports FR-408 — blocks SM-1/SM-2 measurement entirely until wired up | Not yet sized | Not started | v1b |

---

## Epic B — Home & Credibility Surfaces

*The pages that make the core positioning ("the data is the product") visible on first contact.*

| ID | Item | FR refs | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-010 | Build the Home page hero and headline data strip | FR-101, FR-102 | Not yet sized | Not started | v1a |
| PBI-011 | Build the verification-process explainer band | FR-103 | Not yet sized | Not started | v1a |
| PBI-012 | Build the market-intelligence chart band (prime/suburban trend, district bars) | FR-104, FR-401, FR-402 | Not yet sized | Not started | v1a |
| PBI-013 | Build the featured-opportunities section on Home | FR-105 | Not yet sized | Not started | v1a |
| PBI-014 | Build the About page | FR-123 | Not yet sized | Not started | v1b |
| PBI-015 | Build the Services page | FR-124 | Not yet sized | Not started | v1b |

---

## Epic C — Lead Capture

*The actual conversion mechanism — where BO-1 is either realized or it isn't.*

| ID | Item | FR refs | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-020 | Build the Contact page's General Inquiry tab, including email confirmation | FR-120, FR-406, FR-408 | Not yet sized | Not started | v1a |
| PBI-021 | Build the Inspection Booking tab (property, date, mode, timezone, virtual-walkthrough note) | FR-121, FR-122 | Not yet sized | Not started | v1a |
| PBI-022 | Add duplicate-submission protection to both lead forms | Closes a gap flagged in `docs/FSD.md` (FR-114/FR-120) — the static prototype allows a double-click to create two records | Not yet sized | Not started | v1a |
| PBI-023 | Build newsletter subscription capture in the footer | FR-125 — **blocked on a product decision**, see `docs/product-owner/open-questions.md` (subscriber storage/tooling not yet chosen) | Not yet sized | Not started | v1b |
| PBI-024 | Draft and publish a minimal privacy/data-use notice covering the Contact form | Lighter-weight than the full Terms/Privacy pages (PBI-080) — must ship no later than PBI-020/021, since the site is already fully public with no password gate and a live Contact form collects real name/phone/email | Not yet sized | Not started | v1a |

---

## Epic D — Market Intelligence & Price Check

*The other half of the credibility engine — the self-serve, always-public data.*

| ID | Item | FR refs | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-030 | Build the Market Intelligence Hub: index band + full quarterly pricing table | FR-115, FR-116, FR-402 | Not yet sized | Not started | v1a |
| PBI-031 | Build the "request full report via advisor" flow | FR-117 | Not yet sized | Not started | v1a |
| PBI-032 | Build the related-education-articles list on the Market Hub | FR-118 | Not yet sized | Not started | v1a |
| PBI-033 | Build the Price Check tool, including live computation | FR-119, FR-403, FR-404 | Not yet sized | Not started | v1a |
| PBI-034 | Implement a visible "as of [quarter]" label on any district row that's missing a current-quarter update | Closes a gap flagged in `docs/FSD.md` FR-116 — directly protects the "data is never stale without saying so" claim behind BO-2 | Not yet sized | Not started | v1a |

---

## Epic E — Content Operations Enablement (Admin)

*Pulled forward ahead of the public-facing Opportunities/Listing Detail pages on purpose — see rationale doc.*

**Note on current status:** Payload generates a full create/edit UI for every collection automatically once it's defined — which happened as part of PBI-003. So basic CRUD on Listings, Districts, etc. already works today at `/admin`, without any of the items below being separately built. What's still genuinely outstanding is only **PBI-043**, the custom bulk-entry grid — without it, updating a quarter's pricing means editing six separate district records one at a time in Payload's default UI, which works but isn't the smooth workflow this was designed to be for Bilikisu.

| ID | Item | FR refs | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-040 | Admin: Listings collection — create, edit, publish/unpublish | FR-302 | Not yet sized | Not started | v1a |
| PBI-041 | Admin: Districts collection — create, edit | FR-303 | Not yet sized | Not started | v1a |
| PBI-042 | Admin: single-record quarterly pricing entry | FR-304 | Not yet sized | Not started | v1a |
| PBI-043 | Admin: custom bulk quarterly-pricing grid view | FR-305 — the specific workflow Bilikisu Olatunji will use every quarter; see `docs/project-overview.md` §9 | Not yet sized | Not started | v1a |
| PBI-044 | Implement on-demand cache revalidation when a Listing or PriceQuarters record is saved | FR-405 | Not yet sized | Not started | v1a |

---

## Epic F — Opportunities & Listing Detail

*The browse-and-evaluate journey. Deliberately sequenced after lead capture and the data surfaces — see rationale doc for why that's a defensible order, not an oversight.*

| ID | Item | FR refs | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-050 | Build the Opportunities list with the full filter rail | FR-106, FR-107, FR-109 | Not yet sized | Not started | v1a |
| PBI-051 | Build the Opportunities sort control | FR-108 | Not yet sized | Not started | v1a |
| PBI-052 | Build the Listing Detail page core: stats strip, price-history chart, projected-use-case text | FR-110, FR-111 | Not yet sized | Not started | v1a |
| PBI-053 | Build the documentation status table | FR-112 | Not yet sized | Not started | v1a |
| PBI-054 | Build the developer-partner card | FR-113 | Not yet sized | Not started | v1a |
| PBI-055 | Build the advisor callback request form | FR-114 | Not yet sized | Not started | v1a |
| PBI-056 | Implement automatic listing URL slug generation | FR-409 | Not yet sized | Not started | v1a |
| PBI-057 | Design and build a proper "listing not found" state | Closes a gap flagged in `docs/design-handoff.md` and `docs/FSD.md` FR-110 — currently undesigned | Not yet sized | Not started | v1a |

---

## Epic G — Supporting Admin & Content Population

| ID | Item | FR refs | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-060 | Admin: Advisors collection — create, edit | FR-306 | Not yet sized | Not started | v1a |
| PBI-061 | Admin: Developer partners collection — create, edit | FR-307 | Not yet sized | Not started | v1a |
| PBI-062 | Admin: Articles collection — create, edit | FR-308 | Not yet sized | Not started | v1a |
| PBI-063 | Admin: Inquiries triage — status changes, advisor assignment | FR-309 | Not yet sized | Not started | v1a |
| PBI-064 | Admin: Media management | FR-312 — basic upload/management already works via local disk storage as a side effect of PBI-003; moving the storage backend to R2 specifically is PBI-005, deferred to v1b since local disk is sufficient for demo purposes but doesn't persist across Vercel deploys | Not yet sized | Not started | v1a |
| PBI-065 | Admin: staff Users and permissions, including the super-admin gate | FR-313 | Not yet sized | Not started | v1a |
| PBI-066 | Populate real content: real advisor names/photos, real listings, real developer partnerships, replacing every placeholder from the prototype | Closes a risk flagged in `docs/project-overview.md` §11 | Not yet sized | Not started | v1b |

---

## Epic H — Navigation, Responsive & Polish

| ID | Item | FR refs | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-070 | Build the desktop header navigation and the mobile burger/drawer navigation | FR-126 | Not yet sized | Not started | v1a |
| PBI-071 | Build the "coming soon" placeholder page, rendered inside full site chrome for any unbuilt nav destination | FR-126 | Not yet sized | Not started | v1a |
| PBI-072 | Verify every v1 screen at the three required breakpoints (1440 / 1080 / 700) | Per `docs/design-handoff.md` responsive requirements | Not yet sized | Not started | v1a |
| PBI-073 | Add missing focus-visible and disabled states to the Button component | Closes a gap flagged in `docs/design-handoff.md` — no such states are currently styled anywhere in the build | Not yet sized | Not started | v1a |

---

## Epic I — Launch Readiness

*Necessarily last — most of this epic can't meaningfully start until the epics above are functionally complete.*

| ID | Item | Notes | Size | Status | Release |
|---|---|---|---|---|---|
| PBI-080 | Draft and legally review Terms of Use and Privacy Policy | Via existing counsel, per `docs/project-overview.md` §8 decision | Not yet sized | Not started | v1b |
| PBI-081 | Legal review of the Price Check tool's and Listing Detail's disclaimer copy | Same legal-review path as PBI-080 | Not yet sized | Not started | v1b |
| PBI-082 | Point `terraceandtitle.com` at Vercel | Done — apex and `www` both show Valid Configuration in Vercel's Domains tab; verified live via a plain unauthenticated request (`www.terraceandtitle.com` returns 200 with real content, valid SSL/HSTS; apex 308-redirects to `www`) | Not yet sized | Done | v1a |
| PBI-083 | Verify the Resend sending domain (`terraceandtitle.com`) | Supports FR-406 | Not yet sized | Not started | v1b |
| PBI-084 | Final QA pass confirming every form's validation rules are enforced server-side, not only client-side | Directly addresses a pattern flagged repeatedly in `docs/FSD.md` (FR-120, FR-121, FR-208) | Not yet sized | Not started | v1a |
| PBI-085 | Confirm both Plausible custom goals are firing correctly in production | FR-408 | Not yet sized | Not started | v1b |

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
