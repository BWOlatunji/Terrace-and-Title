# Functional Specification Document (FSD)

**Project:** Terrace & Title Real Estate Advisory — Web Application
**Related documents:** `docs/FRD.md` (the requirement each spec below implements), `docs/walkthrough-for-developer.md` (the plain-language architecture these specs assume)

Each entry specifies **inputs**, **processing**, **outputs**, **edge cases**, and **validation rules** for the corresponding `FR-###` in `docs/FRD.md`. "Collection" below refers to a Payload CMS collection (a data model backed by a Postgres table) — see `docs/walkthrough-for-developer.md` Section 3 if that term is unfamiliar.

---

## Module 1 — Public Site

#### FR-101 — Homepage
- **Inputs:** none (static content) plus live data pulled for FR-102 through FR-105.
- **Processing:** Server-rendered on request; assembles hero copy, the data strip, verification band, market band, featured listings, and price-check CTA into one page.
- **Outputs:** Rendered HTML page at `/`.
- **Edge cases:** If the Listings collection has fewer than 3 published records, the featured-opportunities section (FR-105) renders whatever is available rather than erroring.
- **Validation:** None (read-only page).

#### FR-102 — Homepage data strip
- **Inputs:** Latest-quarter PriceQuarters entry for the top-ranked district; count of Districts; count of published, verified Listings; count of Developer records.
- **Processing:** Top district is the one with the highest current land ₦/sqm among districts tagged `prime`. QoQ delta computed as `(current − previous quarter) / previous quarter`.
- **Outputs:** Four stat cells with mono-formatted figures and a colored delta.
- **Edge cases:** If a district has no prior-quarter entry (e.g. first quarter of data ever recorded), the delta is omitted rather than shown as a false 0% or divide-by-zero.
- **Validation:** N/A — display only.

#### FR-103 — Verification explainer
- **Inputs:** None — static content (the three stage descriptions are firm-authored copy, not per-listing data).
- **Processing:** None.
- **Outputs:** Three stage cards + one note.
- **Edge cases:** None.
- **Validation:** N/A.

#### FR-104 — Homepage market chart band
- **Inputs:** Last four quarters of PriceQuarters data for every district, tagged by tier (prime/suburban).
- **Processing:** Averages all `prime`-tier districts' land price per quarter into one series, all `suburban`-tier districts into a second series (FR-401, FR-402). District bar list uses each district's current-quarter land price.
- **Outputs:** A two-series line chart (SVG) and a bar-list, both server-rendered.
- **Edge cases:** If fewer than 2 quarters of history exist, the chart renders with as many points as exist (minimum 1) rather than failing — a single-point chart is visually degenerate but should not crash the page.
- **Validation:** N/A.

#### FR-105 — Featured opportunities
- **Inputs:** Listings collection, filtered to `status = published` and a `featured` boolean flag (or, absent that flag, the 3 most recently published).
- **Processing:** Selects up to 3 records.
- **Outputs:** 3 listing cards.
- **Edge cases:** Fewer than 3 published listings exist → render however many there are; zero published listings → section is hidden entirely rather than showing an empty grid.
- **Validation:** N/A.

#### FR-106 — Opportunities list
- **Inputs:** Listings collection, `status = published`.
- **Processing:** Server-fetched once per page load; full result set passed to the client for FR-107/FR-108 to operate on without further server round-trips.
- **Outputs:** A results count and a stack of horizontal listing cards.
- **Edge cases:** Zero published listings at all (not a filtered zero — see FR-109 for that case) → page still renders its header and filter rail, with an empty-state message distinct from the filtered no-results message.
- **Validation:** N/A.

#### FR-107 — Opportunities filtering
- **Inputs:** Category (select), District (select), Min/Max price (numbers), and three checkboxes (verified-only, payment-plan, below-district-average).
- **Processing:** Client-side filter over the already-fetched result set (see FR-106); recomputed on every control change. "Below district average" compares each listing's ₦/sqm against its district's current land price (FR-403).
- **Outputs:** Re-rendered result list and updated result count.
- **Edge cases:** Min greater than Max → treat as two independent bounds (both still applied; results narrow to nothing, surfacing the FR-109 empty state — the UI does not block or auto-correct an illogical range).
- **Validation:** Min/Max accept only numeric input; non-numeric entries are ignored rather than throwing a client error.

#### FR-108 — Opportunities sorting
- **Inputs:** Sort selection (Featured / Price ascending / Price descending / ₦/sqm ascending).
- **Processing:** Client-side sort applied after filtering (FR-107).
- **Outputs:** Re-ordered result list.
- **Edge cases:** "Featured" (default) preserves original fetch order rather than applying a secondary sort key.
- **Validation:** N/A.

#### FR-109 — Opportunities no-results state
- **Inputs:** The filtered result set from FR-107.
- **Processing:** If the filtered set's length is 0, render the empty-state message instead of the card list.
- **Outputs:** Message + a "Reset filters" action that clears every control and re-runs FR-107.
- **Edge cases:** None beyond the zero-result condition itself.
- **Validation:** N/A.

#### FR-110 — Listing Detail page
- **Inputs:** URL slug (FR-409).
- **Processing:** Fetches the matching Listing record and its related District, Advisor, and Developer records in one request.
- **Outputs:** Rendered detail page.
- **Edge cases:** Slug matches no published Listing → render a 404-equivalent state (not yet designed in the prototype — flagged in `docs/design-handoff.md` Section 2 as a gap); slug matches an *unpublished* listing → same 404 treatment, not a preview.
- **Validation:** Slug is URL-decoded and looked up as an exact match; no partial/fuzzy matching.

#### FR-111 — Price-history chart (Listing Detail)
- **Inputs:** The listing's District's PriceQuarters history (last 4 quarters).
- **Processing:** Same trend computation as FR-401, scoped to a single district.
- **Outputs:** Single-series line chart.
- **Edge cases:** Same as FR-104's minimum-data case.
- **Validation:** N/A.

#### FR-112 — Documentation status table
- **Inputs:** The listing's `docs` field group (cofo, survey, registry, deed — each one of `verified` / `progress` / `pending`).
- **Processing:** Maps each status value to its display word and color.
- **Outputs:** 4-row status table.
- **Edge cases:** A field left blank on the record (not yet set by staff) must not silently render as "Verified" — it should default to `pending` at the schema level so an unset status can never read as a false positive.
- **Validation:** The `docs` sub-fields are constrained to the three enum values only, enforced at the collection schema level (FR-302).

#### FR-113 — Developer partner card
- **Inputs:** The listing's related Developer record.
- **Processing:** None beyond the relationship lookup.
- **Outputs:** Badge + name + two stat rows.
- **Edge cases:** A listing with no Developer assigned → the card is omitted from the sidebar rather than rendering with blank fields.
- **Validation:** N/A.

#### FR-114 — Advisor callback request
- **Inputs:** Name, phone/WhatsApp (both required), best time to call (optional) — submitted from the listing's sidebar form.
- **Processing:** Server Action creates an Inquiry record (`type: callback`, linked to the listing and its assigned advisor) and triggers FR-406.
- **Outputs:** Success message replacing the button label; new Inquiry record.
- **Edge cases:** Duplicate rapid submissions (double-click) → the client-side button should disable itself after first submit to avoid creating duplicate Inquiry records; this is not yet implemented in the static prototype and should be built into the real form.
- **Validation:** Name and phone are required, non-empty; phone is accepted as free text (no strict format enforced, since international/WhatsApp numbers vary too widely to validate reliably).

#### FR-115 — Market Intelligence Hub index figures
- **Inputs:** All Districts' current-quarter PriceQuarters entries; total transaction sample size (a manually-entered figure on a firm-level settings record, not derived).
- **Processing:** Prime/suburban index per FR-402; median plot size is a manually-maintained figure (not computed from listings, since listings are a small curated subset, not the full sampled dataset the index claims to represent).
- **Outputs:** 4-cell index band.
- **Edge cases:** None beyond FR-402's.
- **Validation:** N/A.

#### FR-116 — Full quarterly pricing table
- **Inputs:** Every District's current-quarter PriceQuarters entry.
- **Processing:** One row per district; QoQ computed per FR-102's method.
- **Outputs:** Full table.
- **Edge cases:** A district missing a current-quarter entry (staff hasn't updated it yet) → that row shows its most recent available quarter with a visible "as of [quarter]" label rather than silently showing stale data as if current. **This is a real gap in the current prototype** (which assumes all districts are always current) and should be built correctly from the start in the real app, since it directly protects BO-2/BO-5's credibility claim.
- **Validation:** N/A.

#### FR-117 — Request full report via advisor
- **Inputs:** None beyond the click itself (routes to the Contact page).
- **Processing:** No separate backend action — this is a navigation link, not a form. The actual report request is captured as a General Inquiry (FR-120) once the visitor lands on Contact.
- **Outputs:** Navigation to `/contact`.
- **Edge cases:** None.
- **Validation:** N/A.

#### FR-118 — Related education articles
- **Inputs:** Articles collection, most recent 3 records.
- **Processing:** None beyond the query.
- **Outputs:** 3 article links.
- **Edge cases:** Fewer than 3 Articles exist → show however many there are.
- **Validation:** N/A.

#### FR-119 — Price Check tool
- **Inputs:** District (required, select), property type (required, select: land/residential), size in sqm (optional number).
- **Processing:** Per FR-404: looks up the selected district's current land or residential ₦/sqm depending on type; computes an estimated range as `value × size × 0.9` to `value × size × 1.1` (default size of 500 sqm used if none entered); counts published Listings in that district for the "live listings" figure.
- **Outputs:** Result panel (figure, delta, chart), two supporting cards, CTA strip, disclaimer.
- **Edge cases:** Size entered as 0 or negative → treated as invalid and the default (500 sqm) is used instead, since a non-positive size has no meaningful estimate.
- **Validation:** Size, if provided, must be a positive number; district and property type are required selections with sensible defaults pre-selected so the tool never has to handle an empty required field.

#### FR-120 — General Inquiry submission
- **Inputs:** Full name, phone/WhatsApp, email, "where are you based" (select), consent checkbox — all required.
- **Processing:** Server Action creates an Inquiry record (`type: general`) and triggers FR-406.
- **Outputs:** Success message; new Inquiry record visible to staff (FR-309).
- **Edge cases:** Consent unchecked → form does not submit; this is enforced client-side (required checkbox) and must also be enforced server-side, since a client-side-only check can be bypassed.
- **Validation:** Email must match a standard email pattern; all four other fields are required non-empty; consent must be checked.

#### FR-121 — Inspection Booking submission
- **Inputs:** Everything in FR-120, plus property (select, required), preferred date (required), mode (required, one of in-person/virtual/representative), timezone (required, select).
- **Processing:** Server Action creates an Inquiry record (`type: inspection`) with the additional fields, links it to the selected Listing, and triggers FR-406 and (Phase 2) FR-407 if the mode is virtual or the timezone indicates a diaspora location.
- **Outputs:** Success message; new Inquiry record.
- **Edge cases:** Preferred date in the past → should be rejected with an inline message; the current prototype's date input does not enforce this and it should be added in the real build.
- **Validation:** All FR-120 rules apply, plus: preferred date must be today or later; property selection must reference an existing published Listing.

#### FR-122 — Virtual-walkthrough note
- **Inputs:** The currently-selected mode (client-side state).
- **Processing:** Purely conditional display — no data operation.
- **Outputs:** A note shown only when "Virtual walkthrough" is selected.
- **Edge cases:** None.
- **Validation:** N/A.

#### FR-123 — About page
- **Inputs:** Static firm-narrative content plus 3 firm-level stat figures (years active, transactions advised, districts covered).
- **Processing:** None.
- **Outputs:** Rendered page.
- **Edge cases:** None.
- **Validation:** N/A.

#### FR-124 — Services page
- **Inputs:** A fixed set of service-line entries (title + description) — could be hardcoded or modeled as a lightweight collection; not expected to change often enough to require full CMS treatment.
- **Processing:** None.
- **Outputs:** Rendered page.
- **Edge cases:** None.
- **Validation:** N/A.

#### FR-125 — Newsletter subscription
- **Inputs:** Email address.
- **Processing:** Server Action stores the email (a lightweight `Subscribers` collection or a direct integration with an email-list provider — not yet decided; flagged as an implementation choice for the developer, not specified further here since it doesn't affect any other requirement).
- **Outputs:** Button label changes to confirm the request.
- **Edge cases:** Duplicate subscription of the same email → should silently succeed (idempotent) rather than erroring, since a visitor re-subscribing is not a bug.
- **Validation:** Standard email format check.

#### FR-126 — Site navigation
- **Inputs:** None — navigation is static.
- **Processing:** At viewport widths below 1080px, the desktop nav links and header CTAs are hidden and a burger control is shown, which toggles a full-width drawer. Any nav link whose target route does not correspond to a built page renders the FR-131-equivalent placeholder (see FRD Module 1's final row) inside full site chrome.
- **Outputs:** Header, drawer, and/or placeholder page as appropriate.
- **Edge cases:** None beyond the responsive breakpoint itself.
- **Validation:** N/A.

---

## Module 2 — Client Portal *(Phase 2 — specs below assume Phase 2 has started)*

#### FR-201 — Client login
- **Inputs:** Email, password.
- **Processing:** Verified against the Clients auth collection via Payload's built-in authentication; on success, a session cookie is issued scoped to that client's ID.
- **Outputs:** Redirect to the portal dashboard; session cookie set.
- **Edge cases:** Wrong password → generic "invalid email or password" message, deliberately not specifying which field was wrong, to avoid confirming whether a given email has an account (a standard security practice against account enumeration).
- **Validation:** Both fields required; no client-side password strength check needed at login (only at account creation, which is staff-initiated, not self-service, per the design's "no self-service signup" flow — "New client? Speak to an advisor").

#### FR-202 — Client logout
- **Inputs:** None (button click).
- **Processing:** Session cookie is invalidated server-side.
- **Outputs:** Redirect to the public homepage.
- **Edge cases:** None.
- **Validation:** N/A.

#### FR-203 — Portal dashboard
- **Inputs:** The signed-in client's ID (from session).
- **Processing:** Fetches counts of the client's active Inquiries, shortlisted Listings, and pending Documents.
- **Outputs:** Greeting + 3 stat cards.
- **Edge cases:** A client with zero of any category shows `0`, not an omitted card — the stat cards are always all three, per FR-208's own-records-only scoping.
- **Validation:** N/A.

#### FR-204 — Deal tracker
- **Inputs:** The client's active Deal record (stage, blocking note, linked Listing).
- **Processing:** Maps the Deal's stage to the 5-stage visual (stages before the current one = done, current = current, later ones = remaining).
- **Outputs:** Stepper + note.
- **Edge cases:** A client with no active Deal → the dashboard shows a distinct empty state (not yet designed — flagged in `docs/design-handoff.md`) rather than an empty/broken tracker.
- **Validation:** N/A (read-only for the client; staff update the stage via FR-311).

#### FR-205 — Watchlist
- **Inputs:** The client's watched District (set by an advisor, not self-service in v1 of the portal).
- **Processing:** Same trend computation as FR-401, scoped to the watched district.
- **Outputs:** Price + delta + sparkline.
- **Edge cases:** No watched district set → card is hidden.
- **Validation:** N/A.

#### FR-206 — Client's own inquiries list
- **Inputs:** The signed-in client's ID.
- **Processing:** Fetches Inquiry records where `client = current session client` only (enforced by FR-208, not by this query alone).
- **Outputs:** Record list with status pills.
- **Edge cases:** Zero inquiries → empty state message.
- **Validation:** N/A.

#### FR-207 — Client's own documents + upload
- **Inputs:** For viewing: the signed-in client's ID. For upload: document type (select), file.
- **Processing:** Viewing fetches Document records scoped to the client (FR-208). Upload stores the file in Cloudflare R2 via Payload's storage adapter and creates a Document record with `status: pending`.
- **Outputs:** Record list; new Document record on upload.
- **Edge cases:** Upload of an unsupported file type or a file exceeding the size limit → rejected with an inline error before the upload attempt starts, not after a failed transfer.
- **Validation:** File type restricted to a defined allowlist (PDF, JPG, PNG at minimum, given these are legal documents and photos); maximum file size enforced (specific limit to be set by the developer based on R2 cost considerations, not specified further here).

#### FR-208 — Portal access control
- **Inputs:** Every portal data request, plus the requesting session's client ID.
- **Processing:** Enforced as a Payload collection-level access-control rule (not a UI-level filter) on Inquiries, Documents, and Deals: a client role can only read/write records where `client field = their own ID`.
- **Outputs:** Query results scoped correctly, or a 403/empty result for any attempt to access another client's record — including via a manually-crafted API request, not just through the UI.
- **Edge cases:** A client attempting to guess another client's record ID directly (e.g. via URL manipulation) must be blocked by the same access-control rule, not merely by the UI not providing a link to it.
- **Validation:** N/A — this is itself the validation/authorization layer for Module 2.

---

## Module 3 — Admin Dashboard

#### FR-301 — Staff authentication
- **Inputs:** Email, password.
- **Processing:** Payload's built-in admin authentication against the Users (staff) collection — a separate collection from Clients, so a staff credential can never be used to access the client portal or vice versa.
- **Outputs:** Access to `/admin`.
- **Edge cases:** Same generic-failure-message practice as FR-201.
- **Validation:** Standard Payload auth field validation (email format, password present).

#### FR-302 — Manage Listings
- **Inputs:** All Listing fields (title, category, district, size, price/sqm, status, docs, useCase text, photos, advisor, developer).
- **Processing:** Standard Payload collection CRUD; publishing sets `status: published`, which is the only status value FR-106/FR-110 will surface publicly.
- **Outputs:** Created/updated Listing record; triggers FR-405 on save.
- **Edge cases:** Unpublishing a Listing that a client has an active Deal against (Phase 2) should warn staff before saving, since it would break FR-204/FR-206 references — not yet designed, flagged for the developer.
- **Validation:** Required fields: title, category, district, size (positive number), price/sqm (positive number), status. `docs` sub-fields default to `pending`, per FR-112.

#### FR-303 — Manage Districts
- **Inputs:** Name, tier (prime/suburban).
- **Processing:** Standard CRUD.
- **Outputs:** Created/updated District record.
- **Edge cases:** Deleting a District that has Listings or PriceQuarters records referencing it should be blocked (referential integrity), not silently orphan those records.
- **Validation:** Name required and unique; tier required, one of the two enum values.

#### FR-304 — Manage single quarterly pricing entry
- **Inputs:** District (relation), quarter label, land ₦/sqm, residential ₦/sqm, QoQ % (or QoQ computed automatically from the prior quarter rather than manually entered — recommended, to prevent staff data-entry drift between the raw figure and its delta).
- **Processing:** Standard CRUD; triggers FR-405 on save.
- **Outputs:** Created/updated PriceQuarters record.
- **Edge cases:** A duplicate entry for the same district + quarter → should update the existing record rather than create a second conflicting one (enforced via a unique constraint on the district+quarter pair).
- **Validation:** Land and residential prices must be positive numbers; quarter label follows a fixed format (e.g. `Q2 2026`).

#### FR-305 — Bulk quarterly pricing grid
- **Inputs:** A full quarter's land/residential figures for all six districts at once, entered in a spreadsheet-style custom admin view.
- **Processing:** On save, writes one PriceQuarters record per district in a single transaction (all six succeed, or none do — avoiding a half-updated quarter if something fails partway through); triggers FR-405 once for the whole batch rather than six times.
- **Outputs:** Six created/updated PriceQuarters records.
- **Edge cases:** A district's field left blank in the grid → that district is skipped (not zeroed out) and a warning is shown before save, since a blank almost certainly means "forgot to fill this in," not "the price is zero."
- **Validation:** Same per-field rules as FR-304, applied to every row.

#### FR-306 — Manage Advisors
- **Inputs:** Name, patch/title, phone, photo.
- **Processing:** Standard CRUD.
- **Outputs:** Created/updated Advisor record.
- **Edge cases:** Deleting an Advisor referenced by an active Listing or Deal should be blocked or require reassignment first.
- **Validation:** Name and phone required.

#### FR-307 — Manage Developer partners
- **Inputs:** Name, delivered-stat text, on-schedule-stat text, verified-partner flag.
- **Processing:** Standard CRUD.
- **Outputs:** Created/updated Developer record.
- **Edge cases:** None beyond FR-113's "omit card if unassigned" behavior.
- **Validation:** Name required.

#### FR-308 — Manage Articles
- **Inputs:** Title, slug, body (richtext).
- **Processing:** Standard CRUD.
- **Outputs:** Created/updated Article record.
- **Edge cases:** None.
- **Validation:** Title and slug required; slug unique.

#### FR-309 — Triage Inquiries
- **Inputs:** Status change (New/In Review/Advisor Assigned/Closed), advisor assignment.
- **Processing:** Standard field update on an Inquiry record.
- **Outputs:** Updated Inquiry record, immediately reflected in FR-206 for the relevant client if one is linked.
- **Edge cases:** None.
- **Validation:** Status must be one of the four defined enum values.

#### FR-310 — Verify Documents *(Phase 2)*
- **Inputs:** Status change (Pending/Verified/Action Required).
- **Processing:** Standard field update.
- **Outputs:** Updated Document record, reflected in FR-207.
- **Edge cases:** Marking a document "Action Required" should ideally prompt for a reason, so the client isn't left guessing what's wrong — not specified in the current design, flagged as a possible enhancement.
- **Validation:** Status must be one of the three defined enum values.

#### FR-311 — Manage Deals *(Phase 2)*
- **Inputs:** Stage (Inquiry/Inspection/Documents/Offer/Transfer), blocking note (free text).
- **Processing:** Standard field update.
- **Outputs:** Updated Deal record, reflected in FR-204.
- **Edge cases:** Stage should only move forward or backward one step at a time in the UI (to catch accidental skips), though the underlying field itself has no such constraint at the data layer.
- **Validation:** Stage must be one of the five defined enum values.

#### FR-312 — Manage Media assets
- **Inputs:** File upload, alt text.
- **Processing:** Payload's Media collection, backed by the Cloudflare R2 storage adapter rather than local disk.
- **Outputs:** Stored file + Media record usable as a relation from Listings, Documents, etc.
- **Edge cases:** Same file-type/size validation concerns as FR-207.
- **Validation:** File type allowlist; alt text recommended (accessibility) but not hard-required, to avoid blocking staff on a non-critical field.

#### FR-313 — Manage staff Users and permissions
- **Inputs:** Staff email, role (e.g. editor vs. super-admin).
- **Processing:** Standard CRUD on the Users collection, gated so only a super-admin-role user can create or edit other Users.
- **Outputs:** Created/updated staff User record.
- **Edge cases:** A staff account must never be able to elevate its own role — role changes on one's own account should be blocked even for a super-admin, as a basic safeguard against a compromised session escalating itself.
- **Validation:** Email required, unique; role required, one of the defined enum values.

---

## Module 4 — Content / Market Intelligence

#### FR-401 — District price-trend computation
- **Inputs:** A district's last 4 PriceQuarters records, ordered by quarter.
- **Processing:** Returns the ordered array of land (or residential) ₦/sqm values, one per quarter, for direct use as chart series data.
- **Outputs:** An ordered numeric array + the corresponding quarter labels.
- **Edge cases:** Fewer than 4 quarters of history exist → returns however many exist; chart rendering (FR-104/FR-111) must handle a 1-point series without erroring.
- **Validation:** N/A — pure read/compute function.

#### FR-402 — Prime/suburban index computation
- **Inputs:** All Districts' current-quarter land price, grouped by tier.
- **Processing:** Simple arithmetic mean per tier group.
- **Outputs:** Two numbers (prime index, suburban index).
- **Edge cases:** A tier group with zero districts (shouldn't happen given the fixed 6-district dataset, but defensively) → that index is omitted rather than computed as a divide-by-zero.
- **Validation:** N/A.

#### FR-403 — Above/below district-average flag
- **Inputs:** A listing's ₦/sqm; its district's current land price.
- **Processing:** Boolean: `listing.pricePerSqm < district.land`.
- **Outputs:** A boolean flag consumed by FR-107 and FR-110.
- **Edge cases:** If the district has no current-quarter price on record at all, the flag cannot be computed — the listing should display without the below/above-average claim rather than defaulting to a guess in either direction.
- **Validation:** N/A.

#### FR-404 — Price Check computation
- See FR-119 for the full input/output description; this entry documents the underlying computation contract: given `(district, propertyType, size)`, return `(valuePerSqm, qoqDelta, trendSeries, estimatedLow, estimatedHigh, liveListingCount)` as a single unit, so the tool's result panel always renders from one consistent computed object rather than several independently-timed queries that could disagree with each other.
- **Edge cases:** Covered under FR-119.
- **Validation:** Covered under FR-119.

#### FR-405 — On-demand cache revalidation
- **Inputs:** A save event on a Listing or PriceQuarters record (a Payload `afterChange` hook).
- **Processing:** Calls Next.js's tag-based revalidation for every public page tagged with the affected data (e.g. saving a PriceQuarters record revalidates the tag used by Home, Market Hub, and Price Check).
- **Outputs:** Affected pages are rebuilt from fresh data on their next request, without a manual redeploy.
- **Edge cases:** A batch update (FR-305) should trigger revalidation once after the whole batch commits, not once per record, to avoid unnecessary rebuild churn.
- **Validation:** N/A.

#### FR-406 — Transactional email on submission
- **Inputs:** The newly-created Inquiry (or newsletter Subscriber) record.
- **Processing:** A Payload `afterChange` hook calls the Resend API with a template appropriate to the submission type (general inquiry confirmation, inspection booking confirmation, newsletter welcome), sending to the submitter and, for inquiries, notifying the assigned or default advisor.
- **Outputs:** Sent email(s); the Inquiry record itself is not blocked from saving if the email send fails (the data write and the notification are decoupled, so a Resend outage never loses a lead).
- **Edge cases:** Email send failure → logged for staff visibility, but does not roll back or block the underlying record creation.
- **Validation:** Recipient address validated at form-submission time (FR-120/FR-121), not re-validated here.

#### FR-407 — WhatsApp notification *(Phase 2)*
- **Inputs:** An Inspection Booking record where mode is "virtual" or the visitor's stated location is outside Nigeria.
- **Processing:** A webhook call to the Meta Cloud API using an approved message template.
- **Outputs:** A WhatsApp message delivered to the assigned advisor.
- **Edge cases:** Meta approval or delivery failure → falls back to the FR-406 email notification, which must never depend on this channel succeeding.
- **Validation:** N/A — this is an outbound notification, not a user-facing input.

#### FR-408 — Analytics goal tracking
- **Inputs:** A successful Price Check computation (FR-119/FR-404) and a successful Inquiry/callback submission (FR-114/FR-120/FR-121).
- **Processing:** Fires a Plausible custom-event call client-side at the moment of success.
- **Outputs:** Named goal completions visible in the Plausible dashboard (`price-check-completed`, `advisor-call-booked`).
- **Edge cases:** Ad-blockers or strict privacy settings may prevent the event from firing for some visitors — an accepted, unavoidable limitation of client-side analytics, not something to work around with server-side tracking given the brand's privacy-conscious positioning.
- **Validation:** N/A.

#### FR-409 — Listing slug generation
- **Inputs:** A Listing's title, at creation time.
- **Processing:** Lower-cased, spaces replaced with hyphens, non-URL-safe characters stripped (e.g. "Diplomatic Close Plot" → `diplomatic-close-plot`).
- **Outputs:** A `slug` field value, used to build the Listing Detail URL (FR-110).
- **Edge cases:** Two listings that would generate an identical slug (e.g. two "Corner Plot" titles) → a numeric suffix is appended to the second (`corner-plot-2`) to guarantee uniqueness.
- **Validation:** Slug must be unique across all Listings, enforced at the database level.
