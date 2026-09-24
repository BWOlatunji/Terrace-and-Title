# Database Reference

**Related documents:** `src/collections/*.ts` (the actual schema source of truth — this document explains it, but code always wins if the two ever disagree), `docs/FSD.md` (why each field exists, its validation rules and edge cases), `scripts/seed.ts` (the script that produced every example row below)

---

## Where to look, depending on what you need

| Need | Where |
|---|---|
| The exact schema — fields, types, relationships | `src/collections/*.ts` (9 files, one per table) |
| Why a field exists, its validation rules | `docs/FSD.md` |
| Browse real rows, friendly UI | Payload admin — `localhost:3000/admin` locally, `terraceandtitle.com/admin` live |
| Browse raw rows / run SQL | Neon console → your project → **Tables** tab or **SQL Editor** |
| Re-populate sample data | `npm run seed` (see [Seeding](#seeding) below) |

**The database is PostgreSQL, hosted on Neon** (provisioned through Vercel's Storage tab — see `docs/project-overview.md` §6). One physical database serves both local development and production; there is currently no separate staging database.

---

## The 9 tables

Every example row below is real — pulled directly from what `npm run seed` actually inserted and verified via the Local API, not invented for this document. All of it is sample/demo content using the same fictional Abuja data already established throughout `index.html`, `docs/FSD.md`, `docs/user-stories.md`, and `docs/use-cases.md` — **it needs replacing with real content before launch** (see `docs/project-overview.md` §11).

### `districts`

The six Abuja districts. Everything else in the schema hangs off this table — it's the first thing seeded and the last thing that should ever be deleted.

| Field | Type | Notes |
|---|---|---|
| `name` | text, required, unique | |
| `tier` | select: `prime` / `suburban` | Drives the two-series prime-vs-suburban aggregate (FR-402) |

**Example row:**
```json
{ "id": 1, "name": "Maitama", "tier": "prime" }
```

All 6: Maitama (prime), Asokoro (prime), Jabi (suburban), Gwarinpa (suburban), Lugbe (suburban), Kuje (suburban).

---

### `price_quarters`

The actual content of "data is the product." One row per district per quarter. A `(district, quarter)` pair is enforced unique at the database level — this is the table that gets a bulk-entry admin view in a later PBI (PBI-305) so an editor can update all six districts in one screen instead of six separate records.

| Field | Type | Notes |
|---|---|---|
| `district` | relationship → `districts`, required | |
| `quarter` | text, required | Fixed format, e.g. `"Q2 '26"` |
| `land` | number, required | ₦/sqm |
| `residential` | number, required | ₦/sqm |
| `qoq` | number | Quarter-over-quarter % change. Omitted on a district's first-ever quarter — there's nothing to compare against (see `docs/FSD.md` FR-401's edge case) |

**Example rows** (Maitama, all four seeded quarters):
```json
{ "district": 1, "quarter": "Q3 '25", "land": 372000, "residential": 347746, "qoq": null }
{ "district": 1, "quarter": "Q4 '25", "land": 385000, "residential": 359916, "qoq": 3.5 }
{ "district": 1, "quarter": "Q1 '26", "land": 396000, "residential": 369994, "qoq": 2.9 }
{ "district": 1, "quarter": "Q2 '26", "land": 412000, "residential": 384960, "qoq": 4.0 }
```
24 rows total (6 districts × 4 quarters).

---

### `advisors`

The named staff shown on listings and assigned to inquiries.

| Field | Type | Notes |
|---|---|---|
| `name` | text, required | |
| `patch` | text | e.g. "Senior Advisor, Prime Districts" |
| `phone` | text, required | |
| `photo` | upload → `media` | Optional — none seeded, no real photography yet |

**Example row:**
```json
{ "id": 1, "name": "Adaeze Okonkwo", "patch": "Senior Advisor, Prime Districts", "phone": "+234 803 555 0142" }
```

All 3: Adaeze Okonkwo, Chidi Umeh, Ifeoma Bello.

---

### `developers`

Developer partners referenced by listings. Per `docs/user-stories.md`, developer partners have no direct system access of their own — every field here is maintained by staff on their behalf.

| Field | Type | Notes |
|---|---|---|
| `name` | text, required, unique | |
| `delivered` | text | Track-record stat, e.g. "14 estates delivered since 2011" |
| `onSchedule` | text | Reliability stat, e.g. "96% handovers on schedule" |
| `verifiedPartner` | checkbox, default `false` | Should only be `true` once the FR-103 developer-standing check is actually done — see `docs/product-owner/open-questions.md` OQ-011. All 4 seeded rows are `true`, matching the prototype's assumption that referenced developers are already vetted. |

**Example row:**
```json
{ "id": 1, "name": "Northbridge Development Co.", "delivered": "14 estates delivered since 2011", "onSchedule": "96% handovers on schedule", "verifiedPartner": true }
```

All 4: Northbridge Development Co., Crestline Estates, Lakeview Frontier Ltd, Capital Reach Properties.

---

### `listings`

The core content type — the properties themselves.

| Field | Type | Notes |
|---|---|---|
| `title` | text, required | |
| `slug` | text, unique, auto-generated | Derived from title on save (FR-409) — don't set by hand |
| `category` | select: `residential-land` / `developed-residence` / `commercial-plot` | |
| `district` | relationship → `districts`, required | |
| `size` | number, required, min 1 | sqm |
| `pricePerSqm` | number, required, min 1 | ₦ |
| `price` | number, auto-computed | `size × pricePerSqm`, recalculated on every save — don't set by hand |
| `status` | select: `draft` / `published`, default `draft` | Only `published` listings are ever publicly visible (FR-106/FR-110) |
| `plan` | checkbox | Payment plan available |
| `docs` | group: `cofo`/`survey`/`registry`/`deed`, each `verified`/`progress`/`pending`, default `pending` | An unset value is never "verified" (FR-112) |
| `useCase` | richText | Lexical editor state — see the seed script's `richText()` helper for the minimal JSON shape if writing one by hand |
| `advisor` | relationship → `advisors` | |
| `developer` | relationship → `developers` | |
| `photos` | relationship → `media`, hasMany | None seeded |

**Example row** (abbreviated — `useCase` is a full Lexical document, shown as plain text here):
```json
{
  "id": 6,
  "title": "Kuje Frontier Acreage",
  "slug": "kuje-frontier-acreage",
  "category": "residential-land",
  "district": 6,
  "size": 718,
  "pricePerSqm": 41000,
  "price": 29438000,
  "status": "published",
  "plan": false,
  "docs": { "cofo": "verified", "survey": "verified", "registry": "verified", "deed": "verified" },
  "useCase": "A larger frontier plot suited to a phased self-build or land-banking position ahead of Kuje's projected road expansion.",
  "advisor": 3,
  "developer": 4
}
```

All 6 titles: Diplomatic Close Plot (Maitama), Asokoro Hillside Residence, Jabi Waterfront Commercial Plot (the one with an in-progress registry search — `registry: "progress"`, `deed: "pending"`), Gwarinpa Family Estate Plot, Lugbe Growth Corridor Plot, Kuje Frontier Acreage.

---

### `articles`

Market-education links shown on the Market Intelligence Hub (FR-118).

| Field | Type | Notes |
|---|---|---|
| `title` | text, required | |
| `slug` | text, required, unique | Not auto-generated (unlike Listings) — set explicitly |
| `body` | richText | |

**Example row:**
```json
{ "title": "Reading a survey plan before you commit", "slug": "reading-a-survey-plan-before-you-commit", "body": "A survey plan shows beacon coordinates, plot dimensions, and whether the parcel has been excised from a larger gazetted holding..." }
```

All 3 titles: "C of O vs R of O: what diaspora buyers confuse most," "How Governor's Consent works — and why it takes time," "Reading a survey plan before you commit."

---

### `inquiries`

Every General Inquiry, Inspection Booking, and listing-sidebar Callback submission lands here — the same table serves both the public forms and the (Phase 2) portal's "my inquiries" view.

| Field | Type | Notes |
|---|---|---|
| `type` | select: `general` / `inspection` / `callback` | |
| `name` | text, required | |
| `phone` | text, required | |
| `email` | email | |
| `basedIn` | text | "Where are you based?" |
| `listing` | relationship → `listings` | Only set for inspection/callback |
| `preferredDate` | date | Inspection only |
| `mode` | select: `in-person` / `virtual` / `representative` | Inspection only |
| `timezone` | text | Inspection only |
| `consent` | checkbox, required | Must be `true` to submit — enforced server-side, not just in the UI |
| `status` | select: `new` / `in-review` / `advisor-assigned` / `closed`, default `new` | |
| `advisor` | relationship → `advisors` | Set once staff triage the inquiry |

**Access note:** unlike every other table above, this one is **not publicly readable** via the API — only authenticated staff (or, in Phase 2, the owning client) can read inquiry records; the public can only create them. Querying `/api/inquiries` without logging in correctly returns "You are not allowed to perform this action" rather than data — verified directly while writing this document, not assumed.

**Example row** (all 4 seeded inquiries belong to the same fictional diaspora client, matching the persona already used in the design prototype's portal mockup):
```json
{
  "type": "inspection",
  "name": "Efe Omorogbe",
  "phone": "+44 7700 900142",
  "email": "efe.omorogbe@example.com",
  "basedIn": "United Kingdom",
  "listing": 3,
  "preferredDate": "2026-08-09",
  "mode": "virtual",
  "timezone": "GMT/BST (UK)",
  "consent": true,
  "status": "advisor-assigned",
  "advisor": 3
}
```
The other 3: one inspection request on Gwarinpa Family Estate Plot (`in-review`, mode `representative`), and two `general` inquiries with no listing attached (both `closed`).

---

### `media`

Generic file storage — photos and (eventually) uploaded documents. Currently backed by local disk; swaps to Cloudflare R2 in PBI-005 with no change to how other collections reference it.

| Field | Type | Notes |
|---|---|---|
| `alt` | text, required | Accessibility text |
| *(file)* | upload | Handled by Payload's `upload: true` config, not a regular field |

**No rows seeded** — there's no real photography yet (`docs/project-overview.md` §11 documents this as a deliberate decision, not an oversight: v1 launches with placeholder images and swaps in real photos as they're commissioned).

---

### `users`

Staff accounts — the only auth-enabled collection currently in the schema. **Not seeded**, deliberately: creating a login credential from an unreviewed script is the wrong pattern. Create your own via the real "Create first user" flow at `/admin`.

| Field | Type | Notes |
|---|---|---|
| `email` | email, required | Added automatically by `auth: true` |
| `password` | — | Never stored in plain text; added automatically by `auth: true` |
| `roles` | select, hasMany: `editor` / `super-admin`, default `["editor"]` | Only a super-admin can change anyone's roles, including their own (FR-313's self-elevation safeguard) |

---

## What's not a table yet

Two entities referenced in the design docs don't have their own collection in the current schema, because the features that need them are Phase 2, not yet built:

- **Clients** (portal authentication) — FR-201. Will be a second auth-enabled collection, separate from `users`, so a staff login can never double as portal access or vice versa.
- **Deals** (the 5-stage tracker) and a dedicated **Documents** collection with per-document status (distinct from the generic `media` upload table) — FR-204, FR-207, FR-310, FR-311.

---

## Seeding

```bash
npm run seed
```

Runs `scripts/seed.ts` via the Local API. It inserts 6 districts, 24 price-quarter rows, 3 advisors, 4 developers, 6 listings, 3 articles, and 4 inquiries — everything above except `media` and `users`, for the reasons already noted.

**This is safe to run exactly once against a fresh, empty database.** The script checks whether `districts` already has any rows and aborts immediately if so, specifically to avoid silently duplicating data on a second run. There's no upsert logic — if you need to re-seed, clear the relevant tables first (via the admin UI, or directly in the Neon console).

`scripts/` is deliberately excluded from the app's TypeScript build check (`tsconfig.json`) — a one-off maintenance script like this one isn't part of the deployed application and shouldn't be able to fail the production build over its own type strictness. It's still fully typed for your own sake while editing it; the exclusion only affects `npm run build`.
