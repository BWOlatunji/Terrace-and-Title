# Use Cases

**Project:** Terrace & Title Real Estate Advisory — Web Application
**Related documents:** `docs/FRD.md` (every "Related requirements" reference below), `docs/FSD.md` (implementation detail behind each step), `docs/user-stories.md` (the stories these flows fulfill)

Four core flows, in full actor/precondition/flow format, covering the journeys with the most business weight: a visitor deciding whether to trust a listing, a visitor converting into a lead, staff keeping the data current, and a client checking on their own deal.

---

## UC-01 — Browse and Filter Listings

**Actor:** Site visitor (Prospective Buyer or Diaspora Investor)
**Preconditions:** At least one Listing exists with `status: published`.

### Main flow
1. Visitor navigates to the Opportunities page.
2. System fetches every published Listing and renders the full result list with a result count (FR-106).
3. Visitor selects one or more filters — category, district, price range, and/or the verified/payment-plan/below-average checkboxes (FR-107).
4. System re-computes the filtered result set and re-renders the list and result count without a page reload.
5. Visitor optionally selects a sort order — price ascending/descending or ₦/sqm ascending (FR-108).
6. System re-orders the filtered list accordingly.
7. Visitor clicks a listing card.
8. System navigates to that listing's Listing Detail page (FR-110).

### Alternate / exception flows
- **A1 — No results (from step 4):** If the filtered set is empty, the system shows a "no opportunities match these filters" message with a one-click "Reset filters" action, instead of an empty list (FR-109). Selecting reset clears every filter and returns to step 2's full result set.
- **A2 — Reset at any point:** Visitor clicks "Reset filters" from any filter state; all controls clear and the flow returns to step 2.
- **A3 — Zero published listings site-wide (at step 2):** If no Listings are published at all, the system shows a distinct empty-state message — different from A1's filtered-no-results message, since this reflects the whole catalog being empty, not a specific filter combination.

### Postconditions
The visitor is either viewing a Listing Detail page (a step toward conversion) or remains on the Opportunities page with an active filter state. **Known limitation:** filter state is held only in client-side memory in the current design — refreshing the page or sharing the URL does not preserve applied filters. Worth revisiting if analytics later show visitors frequently want to share or bookmark a filtered view.

**Related requirements:** FR-106, FR-107, FR-108, FR-109, FR-110

---

## UC-02 — Submit a Lead (General Inquiry or Inspection Booking)

**Actor:** Site visitor (Prospective Buyer or Diaspora Investor)
**Preconditions:** Visitor has reached the Contact page, either directly or via a "Speak to an Advisor" / "Book an inspection" link elsewhere on the site.

### Main flow
1. Visitor arrives at the Contact page; the "General inquiry" tab is active by default (FR-120).
2. Visitor fills the shared fields: full name, phone/WhatsApp, email, and "where are you based."
3. Visitor optionally switches to the "Book an inspection" tab (FR-121).
4. If the inspection tab is active, visitor additionally selects a property, a preferred date, a mode (in person / virtual walkthrough / representative attends), and a timezone. If "virtual walkthrough" is selected, the system displays an explanatory note on how the live walkthrough works (FR-122).
5. Visitor checks the required consent checkbox.
6. Visitor clicks submit.
7. System validates all required fields client-side.
8. System creates an Inquiry record (`type: general` or `type: inspection`) via a Server Action (FR-120 / FR-121).
9. System triggers a confirmation email to the visitor and a notification to the relevant advisor via Resend (FR-406).
10. *(Phase 2)* If the mode is virtual or the stated location indicates a diaspora buyer, the system also triggers a WhatsApp notification to the advisor (FR-407).
11. System replaces the submit button with a success confirmation.
12. The new Inquiry is now visible in the staff triage queue (feeding into UC-03's ownership model, FR-309) and, if this visitor later has portal access, in their own Inquiries list (FR-206).

### Alternate / exception flows
- **A1 — Required field missing or invalid (at step 7):** System blocks submission and highlights the invalid field(s) inline; no Inquiry record is created. Visitor corrects the field(s) and retries from step 6.
- **A2 — Consent checkbox unchecked:** Treated the same as A1 — submission is blocked. Called out separately here because it's a deliberate product requirement, not just a generic empty-field case.
- **A3 — Preferred date in the past (inspection tab, at step 7):** System rejects the date with an inline message; visitor selects a valid future date.
- **A4 — Confirmation email fails to send (at step 9):** The Inquiry record is **not** rolled back — the lead is still captured even if Resend is unreachable. The failure is logged for staff review; the visitor still sees the success state from step 11, since their submission genuinely succeeded.
- **A5 — Duplicate submission from a double-click (at step 6):** The submit control disables itself after the first click, preventing a second Inquiry record from the same intent. *(Flagged in `docs/FSD.md` as not yet implemented in the static prototype — required in the real build.)*

### Postconditions
A new Inquiry record exists, linked to a Listing if submitted from the inspection tab with a property selected. A confirmation email has been sent or its failure logged. The record is queued for staff triage.

**Related requirements:** FR-120, FR-121, FR-122, FR-406, FR-407, FR-309

---

## UC-03 — Admin Manages a Listing

**Actor:** Staff member (advisor or CMS editor), authenticated
**Preconditions:** Staff is signed into `/admin` (FR-301) and holds a role permitted to edit Listings (per FR-313, this is the default for staff roles — only staff-account management itself is restricted to a super-admin role).

### Main flow
1. Staff signs into `/admin` (FR-301).
2. Staff navigates to the Listings collection.
3. Staff selects "Create New," or opens an existing Listing to edit.
4. Staff fills or updates the record: title, category, district, size, ₦/sqm, per-document verification status, projected-use-case text, linked advisor, linked developer, and photos (FR-302).
5. Staff sets the `status` field — "Published" to make it public, or leaves it as a draft.
6. Staff clicks Save.
7. System validates all required fields (title, category, district, size, ₦/sqm, status).
8. System persists the record. If `status: published`, the Listing becomes eligible for FR-105, FR-106, and FR-110.
9. An `afterChange` hook triggers on-demand revalidation of every public page tagged with Listings data (FR-405).
10. Staff confirms the change is live by checking the Opportunities list and the Listing Detail page.

### Alternate / exception flows
- **A1 — Validation failure (at step 7):** System blocks the save and highlights the missing or invalid required field(s); staff corrects and re-saves.
- **A2 — Staff leaves the Listing unpublished:** The record saves successfully but never appears on any public page, since FR-106 and FR-110 both filter to `status: published` only. Staff can return and publish later.
- **A3 — Staff attempts to unpublish a Listing with an active client Deal referencing it** *(Phase 2)*: System shows a warning before allowing the save, since this would break that client's Deal Tracker (FR-204) and Inquiries view (FR-206). Staff may proceed or cancel.
- **A4 — A documentation-status field is left blank:** The field defaults to "Pending" at the schema level (FR-112) rather than displaying as a false "Verified" — this happens automatically and does not block the save.
- **A5 — Title produces a duplicate slug** (e.g. two listings both titled "Corner Plot"): System silently appends a numeric suffix to the second (FR-409); staff is not blocked or prompted.

### Postconditions
The Listing record reflects the edit. If published, it is live, filterable, sortable, and directly viewable, and every dependent public page has been revalidated — visible without a deploy.

**Related requirements:** FR-301, FR-302, FR-405, FR-409, FR-112, FR-106, FR-110

---

## UC-04 — Client Tracks an Inquiry in the Portal *(Phase 2)*

**Actor:** Existing client with portal access (a Prospective Buyer or Diaspora Investor who has progressed to working with an advisor)
**Preconditions:** Client has portal credentials, issued by staff (portal accounts are not self-service — see "New client? Speak to an advisor" on the login screen). At least one Inquiry record exists, linked to this client's account.

### Main flow
1. Client navigates to `/portal/login` (FR-201).
2. Client enters email and password and submits.
3. System authenticates against the Clients collection and issues a session scoped to that client's ID only.
4. System redirects to the Portal Dashboard (FR-203).
5. Client selects "Inquiries" from the portal sidebar navigation.
6. System fetches Inquiry records where the client field matches the signed-in session's client ID — and only those (FR-206, enforced server-side by FR-208).
7. System renders the list: each record's title and meta (date, type) on the left, a colored status pill (New / In Review / Advisor Assigned / Closed) on the right.
8. Client reviews the current status, which reflects whatever staff most recently set during triage (FR-309).
9. Client signs out (FR-202) or navigates elsewhere in the portal.

### Alternate / exception flows
- **A1 — Invalid credentials (at step 3):** System shows a generic "invalid email or password" message, deliberately not indicating which field was wrong, to avoid confirming whether a given email has an account. Client retries.
- **A2 — Client has zero inquiries (at step 7):** System shows an empty-state message rather than a blank list. *(Flagged in `docs/design-handoff.md` as a state not yet designed in the current prototype — required for the real build.)*
- **A3 — Client attempts to access another client's inquiry** (e.g. by manipulating a record identifier directly): Blocked server-side by the FR-208 access-control rule, regardless of what the UI itself exposes or hides. The request returns no data, not another client's record.
- **A4 — Session expires mid-browse:** Client is redirected back to `/portal/login`, with their intended destination preserved so they land back on the Inquiries list — not the dashboard — after re-authenticating.

### Postconditions
The client has viewed the current, real-time status of their own inquiries only. At no point in the flow has any data belonging to another client been exposed, queried, or rendered.

**Related requirements:** FR-201, FR-202, FR-203, FR-206, FR-208, FR-309
