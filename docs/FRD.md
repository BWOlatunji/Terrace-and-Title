# Functional Requirements Document (FRD)

**Project:** Terrace & Title Real Estate Advisory — Web Application
**Related documents:** `docs/BRD.md` (business objectives each requirement traces to), `docs/FSD.md` (implementation detail for every FR below), `docs/user-stories.md` and `docs/use-cases.md` (both reference these IDs)

Every requirement below has an ID (`FR-###`), a phase (v1 or Phase 2), and a `Traces to` column pointing at the business objective(s) in `docs/BRD.md` it exists to serve. IDs are grouped in numeric blocks by module and are stable — once assigned, an ID is never reused, even if the requirement is later removed.

- **Module 1 — Public Site:** FR-101 to FR-126
- **Module 2 — Client Portal:** FR-201 to FR-208
- **Module 3 — Admin Dashboard:** FR-301 to FR-313
- **Module 4 — Content / Market Intelligence:** FR-401 to FR-409

---

## Module 1 — Public Site

| ID | Requirement | Phase | Traces to |
|---|---|---|---|
| FR-101 | The system shall display a homepage with a hero section, headline value proposition, and two calls to action ("Book an advisory call," "Browse opportunities") | v1 | BO-1 |
| FR-102 | The system shall display a headline market-data strip on the homepage showing average ₦/sqm for the top district (with QoQ delta), districts tracked, live verified opportunity count, and developer partner count | v1 | BO-2 |
| FR-103 | The system shall display a three-stage verification-process explainer (document search, physical inspection, developer standing) on the homepage, including a statement that in-progress verifications are shown, not hidden | v1 | BO-2, BO-3 |
| FR-104 | The system shall display a market-intelligence chart band on the homepage, comparing prime vs. suburban district price trends over the last four quarters, plus a district-by-district land-price comparison | v1 | BO-2 |
| FR-105 | The system shall display a curated set of featured opportunities (listing cards) on the homepage | v1 | BO-1 |
| FR-106 | The system shall display a full list of published listings on the Opportunities page, with a live result count | v1 | BO-1 |
| FR-107 | The system shall let a visitor filter the Opportunities list by category, district, minimum/maximum price, title-verified-only, payment-plan-available, and below-district-average, with results updating without a page reload | v1 | BO-1 |
| FR-108 | The system shall let a visitor sort the Opportunities list by price (ascending/descending) or ₦/sqm (ascending) | v1 | BO-1 |
| FR-109 | The system shall display an explicit no-results message with a one-click filter-reset action when no listings match the applied filters | v1 | BO-1 |
| FR-110 | The system shall display a Listing Detail page per published listing, including a cover image, verification status, price, ₦/sqm, size, and status | v1 | BO-1, BO-2 |
| FR-111 | The system shall display a price-history chart for the listing's district on the Listing Detail page | v1 | BO-2 |
| FR-112 | The system shall display a documentation status table on the Listing Detail page covering Certificate of Occupancy, survey plan, registry search, and deed of assignment, each with an independent status | v1 | BO-2, BO-3 |
| FR-113 | The system shall display the assigned developer partner's name, verified-partner status, and track-record statistics on the Listing Detail page | v1 | BO-2 |
| FR-114 | The system shall let a visitor request a callback from the listing's assigned advisor directly from the Listing Detail page | v1 | BO-1 |
| FR-115 | The system shall display the Market Intelligence Hub with headline index figures (prime index, suburban index, median plot size, sample size) | v1 | BO-2 |
| FR-116 | The system shall display a full quarterly pricing table (land ₦/sqm, residential ₦/sqm, QoQ) for every tracked district on the Market Intelligence Hub | v1 | BO-2 |
| FR-117 | The system shall let a visitor request the full quarterly report through an advisor, rather than downloading it directly | v1 | BO-1, BO-2 |
| FR-118 | The system shall display links to related market-education articles on the Market Intelligence Hub | v1 | BO-2 |
| FR-119 | The system shall provide a Price Check tool where a visitor selects a district and property type, optionally enters a size, and receives an estimated ₦/sqm, a QoQ trend, an estimated price range, and a live-listings count for that district | v1 | BO-1, BO-2 |
| FR-120 | The system shall let a visitor submit a General Inquiry via the Contact page (name, phone/WhatsApp, email, location, consent) | v1 | BO-1 |
| FR-121 | The system shall let a visitor submit an Inspection Booking via the Contact page, including property selection, preferred date, mode (in person / virtual walkthrough / representative attends), and timezone | v1 | BO-1, BO-3 |
| FR-122 | The system shall display an explanatory note about how virtual walkthroughs work when the "Virtual walkthrough" mode is selected on the Inspection tab | v1 | BO-3 |
| FR-123 | The system shall display an About page with brand narrative and firm-level statistics | v1 | BO-2 |
| FR-124 | The system shall display a Services page listing the firm's advisory service lines | v1 | BO-1 |
| FR-125 | The system shall let a visitor subscribe to a quarterly market-note email from the footer, on any page | v1 | BO-1, BO-2 |
| FR-126 | The system shall provide primary navigation via a persistent header (desktop) and a full-width drawer menu (viewport widths below 1080px), and shall render a labelled "coming soon" placeholder — inside full site chrome — for any linked destination not yet built | v1 | BO-1 |

---

## Module 2 — Client Portal

*All of Module 2 is Phase 2. It ships only once the Phase 2 trigger condition in `docs/BRD.md` Section 6 is met.*

| ID | Requirement | Phase | Traces to |
|---|---|---|---|
| FR-201 | The system shall authenticate a client via email and password and grant access only to that client's own portal session | Phase 2 | BO-4 |
| FR-202 | The system shall let a signed-in client sign out, returning them to the public site | Phase 2 | BO-4 |
| FR-203 | The system shall display a portal dashboard with a personalized greeting and summary stat cards (active inquiries, properties shortlisted, documents pending) | Phase 2 | BO-4 |
| FR-204 | The system shall display a five-stage deal tracker (Inquiry → Inspection → Documents → Offer → Transfer) for the client's active deal, with cleared/current/remaining states and a plain-language note on what is currently blocking progress | Phase 2 | BO-4 |
| FR-205 | The system shall display a personal watchlist card showing the client's tracked district's current price and recent trend | Phase 2 | BO-2, BO-4 |
| FR-206 | The system shall display a list of the client's own inquiries with status | Phase 2 | BO-4 |
| FR-207 | The system shall display a list of the client's own documents with status, and let the client upload a new document against their deal | Phase 2 | BO-4 |
| FR-208 | The system shall restrict every portal data query to records belonging to the signed-in client only, enforced server-side (not only hidden in the UI) | Phase 2 | BO-4 |

---

## Module 3 — Admin Dashboard

| ID | Requirement | Phase | Traces to |
|---|---|---|---|
| FR-301 | The system shall authenticate staff users separately from client users, via Payload's built-in admin authentication | v1 | BO-5 |
| FR-302 | The system shall let staff create, edit, and publish/unpublish Listing records, including all fields shown on the public Listing Detail page | v1 | BO-5 |
| FR-303 | The system shall let staff create and edit District records (name, tier) | v1 | BO-5 |
| FR-304 | The system shall let staff create and edit a single quarter's pricing entry for a single district (land ₦/sqm, residential ₦/sqm, QoQ) | v1 | BO-5 |
| FR-305 | The system shall provide a custom bulk-entry grid view for updating all six districts' pricing for a given quarter in one screen, rather than one record at a time | v1 | BO-5 |
| FR-306 | The system shall let staff create and edit Advisor records (name, patch/title, phone, photo) | v1 | BO-5 |
| FR-307 | The system shall let staff create and edit Developer partner records (name, track-record statistics, verified-partner flag) | v1 | BO-5 |
| FR-308 | The system shall let staff create and edit Article records for the Market Hub's education links | v1 | BO-5 |
| FR-309 | The system shall let staff view incoming Inquiry records, change their status, and assign them to an advisor | v1 | BO-1, BO-4 |
| FR-310 | The system shall let staff review an uploaded client Document and change its status (Pending / Verified / Action Required) | Phase 2 | BO-4 |
| FR-311 | The system shall let staff view and update a Deal's current stage | Phase 2 | BO-4 |
| FR-312 | The system shall let staff upload and manage Media assets (photos, documents), stored in Cloudflare R2 | v1 | BO-5 |
| FR-313 | The system shall let a super-admin-level staff user manage other staff Users and their permissions | v1 | BO-5 |

---

## Module 4 — Content / Market Intelligence

*This module is largely system behavior rather than a user-facing screen — it's the machinery that makes Modules 1–3's data claims true and current.*

| ID | Requirement | Phase | Traces to |
|---|---|---|---|
| FR-401 | The system shall compute a district's multi-quarter price-trend series from its stored PriceQuarters history, for use in every chart that displays district trend | v1 | BO-2 |
| FR-402 | The system shall compute a prime-tier and suburban-tier price index by averaging the current quarter's land price across districts tagged with each tier | v1 | BO-2 |
| FR-403 | The system shall determine, for a given listing, whether its ₦/sqm is above or below its district's current average, and expose that flag to both the Opportunities filter (FR-107) and the Listing Detail stats strip (FR-110) | v1 | BO-1, BO-2 |
| FR-404 | The system shall compute the Price Check tool's estimated ₦/sqm, QoQ delta, trend series, and price range from live PriceQuarters and Listings data — never from a cached or hardcoded value | v1 | BO-1, BO-2 |
| FR-405 | The system shall invalidate and regenerate the cached versions of any public page whose underlying data (a Listing or a PriceQuarters entry) changes, without requiring a redeploy | v1 | BO-2, BO-5 |
| FR-406 | The system shall send a transactional confirmation email via Resend upon any public form submission (General Inquiry, Inspection Booking, newsletter subscription) | v1 | BO-1 |
| FR-407 | The system shall send a WhatsApp notification via the Meta Cloud API for inspection bookings flagged as diaspora/urgent | Phase 2 | BO-3 |
| FR-408 | The system shall track price-check completions and advisor-call bookings as named custom goals in Plausible analytics | v1 | BO-1 |
| FR-409 | The system shall auto-generate a URL-safe slug for each Listing from its title, used to construct its public Listing Detail URL | v1 | BO-2 |
