# User Stories

**Project:** Terrace & Title Real Estate Advisory — Web Application
**Related documents:** `docs/FRD.md` (every "Satisfies" reference below points to an FR-### there), `docs/use-cases.md` (four of the flows below are elaborated into full use cases)

Stories are grouped by role, per the brief: **Prospective Buyer**, **Diaspora Investor**, **Admin/Staff**, **Developer Partner**. A note on the last group: developer partners do not log into or directly operate this application in the current scope — no developer-facing portal was designed (see `docs/BRD.md`, Section 4). Their stories below describe needs the system meets *on their behalf*, satisfied through staff-managed records (Module 3) and public-facing display (Module 1), not through direct interaction. This is called out explicitly rather than glossed over, since it's a real gap worth stakeholders being aware of if direct developer self-service is ever wanted later.

Each story includes acceptance criteria and a `Satisfies:` line referencing the functional requirement(s) it maps to in `docs/FRD.md`.

---

## Role: Prospective Buyer

### US-01 — See credible market data before trusting the firm
**As a** prospective buyer, **I want to** see real, current pricing data on the homepage, **so that** I can judge whether this firm actually knows the market before I engage with them.
- **Acceptance criteria:**
  - Homepage displays a data strip with a real average ₦/sqm figure, a QoQ delta, districts tracked, and verified opportunity count.
  - Figures reflect the current quarter's data, not a hardcoded or stale value.
  - A three-stage verification explainer is visible without scrolling past the fold on desktop.
- **Satisfies:** FR-101, FR-102, FR-103

### US-02 — Browse and narrow down opportunities
**As a** prospective buyer, **I want to** filter listings by category, district, price, and verification status, **so that** I only spend time looking at properties relevant to my budget and requirements.
- **Acceptance criteria:**
  - Filter changes update the result list without a full page reload.
  - Result count updates to match the filtered set.
  - Filtering to a combination that matches nothing shows a clear "no results" message with a one-click reset, not a blank list.
- **Satisfies:** FR-106, FR-107, FR-108, FR-109

### US-03 — Understand exactly what's verified about a specific plot
**As a** prospective buyer, **I want to** see a listing's documentation status broken down by document type, **so that** I know precisely what has and hasn't been confirmed before I consider making an offer.
- **Acceptance criteria:**
  - Listing Detail shows a 4-row table: C of O, survey plan, registry search, deed of assignment.
  - Each row shows an independent status (Verified / In progress / Pending), never a single blended "verified" claim for the whole listing.
  - A document whose status hasn't been explicitly set by staff never displays as "Verified" by default.
- **Satisfies:** FR-110, FR-112

### US-04 — Get a fast first opinion on price
**As a** prospective buyer, **I want to** enter a district and property type and get an estimated ₦/sqm, **so that** I can sanity-check whether a listing I'm looking at elsewhere is fairly priced.
- **Acceptance criteria:**
  - Tool returns a result (figure, QoQ trend, estimated range) immediately on submit, with sensible defaults so it never requires every field to be filled to produce something.
  - Result is clearly labeled as an estimate, with a disclaimer distinguishing it from a formal valuation.
  - Result includes a path to book a call, not just the number itself.
- **Satisfies:** FR-119, FR-404

### US-05 — Reach a real person without friction
**As a** prospective buyer, **I want to** request a callback directly from a listing I'm interested in, **so that** I don't have to hunt for a separate contact page while I still have the property in front of me.
- **Acceptance criteria:**
  - Callback form is visible in the Listing Detail sidebar, pre-associated with that listing and its assigned advisor.
  - Only name and phone are required; submission gives visible confirmation.
  - Submission cannot be sent twice from a single click (no duplicate inquiry records from a double-click).
- **Satisfies:** FR-114, FR-406

---

## Role: Diaspora Investor

*Every story a Prospective Buyer has also applies here — these are the needs specific to buying without being able to visit in person.*

### US-06 — Inspect a property without being there
**As a** diaspora investor, **I want to** book a live virtual walkthrough with a surveyor on-site, **so that** I can evaluate a property as if I'd visited, without an international flight.
- **Acceptance criteria:**
  - "Virtual walkthrough" is a selectable mode alongside in-person and representative-attends, with equal visual weight — not a buried afterthought.
  - Selecting it reveals an explanation of exactly how it works (live video, surveyor on-site, visitor directs the camera).
  - Booking captures the visitor's timezone so scheduling accounts for the time difference.
- **Satisfies:** FR-121, FR-122

### US-07 — Trust the document chain enough to commit capital remotely
**As a** diaspora investor, **I want to** see full documentation status before I'm asked to commit any money, **so that** I'm not relying on someone else's word about a title I can't personally go verify at the registry.
- **Acceptance criteria:**
  - Documentation status is visible on every listing, not gated behind a request.
  - A listing still mid-verification says so plainly, rather than being hidden or omitted from search results by default (it should still be findable, just clearly labeled).
- **Satisfies:** FR-112, FR-403

### US-08 — Track a deal without a phone call at every step *(Phase 2)*
**As a** diaspora investor, **I want to** log into a portal and see where my purchase currently stands, **so that** I don't have to call or email my advisor across a large time-zone gap just to ask "any update?"
- **Acceptance criteria:**
  - Dashboard shows a 5-stage tracker for the active deal, with the current stage clearly distinguished from completed and remaining stages.
  - A plain-language note explains what's currently blocking progress, if anything is.
  - The tracker reflects real staff-entered status, not a generic estimate.
- **Satisfies:** FR-201, FR-203, FR-204, FR-208

### US-09 — Upload paperwork without a courier
**As a** diaspora investor, **I want to** upload identity and supporting documents directly through the portal, **so that** I don't have to physically courier paperwork internationally.
- **Acceptance criteria:**
  - Upload accepts common document formats (PDF, JPG, PNG at minimum).
  - Uploaded documents appear immediately in my documents list with a "Pending" status until staff review them.
  - I can only ever see and upload against my own deal, never another client's.
- **Satisfies:** FR-207, FR-208

### US-10 — Check on a district's pricing before wiring funds
**As a** diaspora investor, **I want to** see a personal watchlist for the district I'm buying into, **so that** I can confirm the market hasn't moved unfavorably between my initial inquiry and when I'm ready to transact.
- **Acceptance criteria:**
  - Watchlist shows current price, QoQ delta, and a short trend chart for one tracked district.
  - Data is the same live figure used everywhere else on the site — not a separately-cached or stale number.
- **Satisfies:** FR-205, FR-401

---

## Role: Admin / Staff

### US-11 — Publish a new listing without needing a developer
**As an** advisor, **I want to** create and publish a new listing through the CMS, **so that** I can get a verified opportunity live without waiting on engineering time.
- **Acceptance criteria:**
  - All fields shown on the public Listing Detail page are editable from one form (price, size, category, district, documentation status, advisor, developer, photos).
  - A listing stays hidden from the public site until its status is explicitly set to published.
  - Saving a new published listing makes it appear on the Opportunities list without a deploy.
- **Satisfies:** FR-302, FR-405

### US-12 — Update a whole quarter's pricing in one sitting
**As the** staff member who owns quarterly data updates, **I want to** enter all six districts' new pricing in one screen, **so that** I'm not clicking into six separate records and risking an inconsistent or half-finished update.
- **Acceptance criteria:**
  - A single grid view lets me enter land and residential ₦/sqm for all six districts for the current quarter.
  - If I leave a district blank by mistake, I'm warned before saving rather than silently zeroing out that district's price.
  - Saving the grid updates every public page that shows district pricing, without a redeploy.
- **Satisfies:** FR-305, FR-405

### US-13 — Keep incoming inquiries from falling through the cracks
**As an** advisor or office manager, **I want to** see every incoming inquiry in one place and assign it to an advisor, **so that** no lead sits unanswered because it wasn't visible to anyone.
- **Acceptance criteria:**
  - All General Inquiry and Inspection Booking submissions appear in one admin list, newest first.
  - I can change an inquiry's status (New / In Review / Advisor Assigned / Closed) and assign it to a specific advisor.
  - Status changes I make are immediately reflected in that client's own portal view, once Phase 2 is live.
- **Satisfies:** FR-309, FR-206

### US-14 — Verify a client's uploaded documents *(Phase 2)*
**As an** advisor, **I want to** review a document a client uploaded and mark its status, **so that** the client can see clear progress without me having to email them separately.
- **Acceptance criteria:**
  - I can view any document uploaded against a deal I'm assigned to.
  - I can change its status to Pending, Verified, or Action Required.
  - The status change is reflected in the client's portal document list immediately.
- **Satisfies:** FR-310, FR-207

### US-15 — Keep the developer partner roster accurate
**As** office staff, **I want to** maintain each developer partner's track record and verified-partner status, **so that** every listing referencing them shows correct, current information.
- **Acceptance criteria:**
  - Developer records can be created, edited, and linked to any number of listings.
  - Changing a developer's stats updates every listing referencing them, without editing each listing individually.
- **Satisfies:** FR-307, FR-113

---

## Role: Developer Partner

*As noted above, developer partners have no direct login or self-service access in this scope. These stories describe what they need from the system, delivered entirely through staff-managed records and public display — not through anything a developer partner operates themselves.*

### US-16 — Be represented accurately wherever I'm referenced
**As a** developer partner, **I want** my track record and verified-partner status to be current and correct on every listing that references me, **so that** buyers see an accurate picture of my company, not outdated or generic information.
- **Acceptance criteria:**
  - My delivery statistics and verified-partner badge display consistently across every listing I'm attached to.
  - If my information changes, updating it once (by staff, on my record) updates it everywhere I'm shown.
- **Satisfies:** FR-307, FR-113

### US-17 — Be vetted before being publicly associated with the firm
**As a** developer partner being considered for a listing partnership, **I want** the firm to check my standing (prior deliveries, disputes, regulatory status) before listing anything under my name, **so that** the firm's endorsement of me actually means something to a buyer.
- **Acceptance criteria:**
  - The firm's published verification process explicitly includes a developer-standing check as one of its three named stages.
  - A developer is not attachable to a published listing without a completed standing check, enforced as part of staff workflow (not a hard system constraint, since the check itself is a human process, not a data field) — flagged here as a process expectation, not a technical validation rule, since it can't be fully enforced in software.
- **Satisfies:** FR-103

### US-18 — Have listings under my name reflect their real documentation status
**As a** developer partner, **I want** listings I'm connected to show their true, current documentation status, **so that** I'm not associated with a listing that misrepresents where its paperwork actually stands.
- **Acceptance criteria:**
  - Documentation status per listing is independently maintained by staff, not inferred from my own general standing.
  - A documentation status left unset never defaults to "Verified."
- **Satisfies:** FR-302, FR-112
