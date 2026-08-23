# Business Requirements Document (BRD)

**Project:** Terrace & Title Real Estate Advisory — Web Application
**Status:** Approved for build. v1 scope confirmed; Phase 2 trigger condition set (see Section 6).
**Related documents:** `docs/project-overview.md` (full stakeholder context, roadmap, decisions log), `docs/FRD.md` (functional requirements this BRD's objectives map to)

---

## 1. Purpose of this document

This BRD defines *why* the application is being built, *for whom*, and *how success will be measured* — the business layer that every functional requirement in `docs/FRD.md` should trace back to. Where this document and `docs/project-overview.md` cover the same ground (roles, phasing), this one is the authoritative, structured statement of business intent; the overview document is the fuller narrative and status tracker.

---

## 2. Business context

Terrace & Title Real Estate Advisory Ltd operates in a market — Abuja real estate — where property listings are abundant but verifiable pricing and title-status information is scarce. Buyers, particularly those outside Nigeria, routinely commit capital without independent confirmation of price fairness or documentation validity. The firm's differentiation is not inventory (it does not develop or sell property directly) but **advisory credibility built on published, regularly-updated market data and transparent title-verification status**.

The current web presence does not express this differentiation. This project replaces it with a data-led site whose every page reinforces the same claim — the numbers are real, checkable, and current — and whose every path leads to the same conversion event: a conversation with a named advisor.

---

## 3. Business objectives

| ID | Objective | How it's realized |
|---|---|---|
| BO-1 | Generate qualified advisory leads from organic and referral traffic | Every data-rich surface (home, market hub, price-check tool) ends in an advisor call-to-action, never a gated download — see FRD Module 1 |
| BO-2 | Establish Terrace & Title as the credible, checkable source for Abuja district pricing | Public, quarterly-updated pricing data across six districts, with full historical trend — see FRD Module 4 |
| BO-3 | Win trust with diaspora buyers who cannot inspect property in person | Virtual-inspection booking, timezone-aware scheduling, and transparent (including in-progress) title verification — see FRD Module 1 |
| BO-4 | Reduce advisor time spent on manual status updates for existing clients | A client portal (Phase 2) where a buyer can see their own deal stage and documents without a phone call — see FRD Module 2 |
| BO-5 | Keep the operational cost of maintaining data currency low enough that it actually happens every quarter | Pricing data lives in a CMS editable by non-developers, not hardcoded in the application — see FRD Module 3 and 4 |

---

## 4. Target users

| Persona | Who they are | Primary need from the product |
|---|---|---|
| **Prospective buyer** | A Nigeria-based professional or business owner evaluating an Abuja property purchase, able to visit in person | Fast, trustworthy answers on price and title status, and an easy path to a human advisor |
| **Diaspora investor** | A Nigerian living abroad, buying without the ability to physically inspect a property before committing | Everything the prospective buyer needs, plus virtual inspection, timezone-aware booking, and visible document-chain status — the product's most demanding persona, and the one most of the design was stress-tested against |
| **Admin / staff** | Terrace & Title advisors and the CMS content owner, working inside the admin panel | A workable, non-technical way to keep listings, pricing, and inquiries current without needing a developer for routine changes |
| **Developer partner** | A property developer or land allottee whose projects the firm advises on or lists | Accurate, credible representation of their track record on any listing referencing them — this persona has no direct login or portal access in the current scope; their needs are met indirectly through admin-managed records (see `docs/user-stories.md` for the explicit note on this) |

A fifth, narrower group — **existing clients with an active deal** — is a subset of prospective buyer/diaspora investor who has progressed to working with an advisor. They are the sole users of the Phase 2 client portal.

---

## 5. Success metrics

| ID | Metric | Target / measurement | Priority |
|---|---|---|---|
| SM-1 | Price-check tool completions | Tracked as a Plausible custom goal from launch; no numeric target set pre-launch — establish a baseline in the first full quarter, then set a growth target | Primary |
| SM-2 | Advisor call bookings (via Contact/Inspection form) | Tracked as a Plausible custom goal from launch; this is the metric closest to actual business value and should be the one weighted most heavily in any future redesign decision | Primary |
| SM-3 | Organic search visibility for district/price search terms | Indirect benefit of listing and district pages having real, indexable URLs (a structural advantage over the previous site) — track via search console once live, no baseline yet | Secondary |
| SM-4 | Quarterly data-update completion rate | Whether the pricing data is actually updated every quarter, on time — an operational metric, not a marketing one, but directly tied to BO-2 and BO-5 holding up over time | Primary, operational |
| SM-5 (Phase 2) | Active deals tracked through the portal vs. handled entirely by phone/email | Only becomes measurable once Phase 2 ships; tracks whether BO-4 is actually being realized | Secondary, deferred |

---

## 6. Scope

### In scope — v1 (public marketing site)
Home, Opportunities, Listing Detail, Market Intelligence Hub, Price Check, Contact/Inspection, About, Services, and a functioning Portal Login screen (stub — see Section 6 of `docs/project-overview.md` for why the login screen ships ahead of the portal it leads to).

### In scope — Phase 2 (client portal)
Portal Dashboard, Portal Inquiries, Portal Documents. **Trigger condition:** Phase 2 begins once v1 has produced a meaningful volume of real inquiries/deals to build and test the portal against — not on a fixed calendar date (decision recorded in `docs/project-overview.md`, Section 8).

### Out of scope (this project)
Developer/partner-facing login or self-service pages, legal pages beyond what counsel supplies as static content (privacy policy, terms — content owned by legal, not this BRD), and any admin functionality beyond what Payload CMS generates plus the one custom bulk-pricing view (FRD Module 3).

---

## 7. Assumptions and constraints

- Real property/office/team photography is **not** a v1 launch blocker; the site launches with its designed placeholder-image system and swaps in real photography as it becomes available (decision recorded in `docs/project-overview.md`).
- Quarterly pricing-data updates depend on a single named, non-technical staff member using the CMS reliably every quarter — the product's core credibility claim (BO-2) is only as strong as this operational habit.
- The application is a single deployable unit (Next.js with Payload CMS embedded) hosted on Vercel, with PostgreSQL (Neon) as the database and Cloudflare R2 for media — see `docs/walkthrough-for-developer.md` for full technical detail.
- Target launch window for v1 is approximately 8 weeks from the date this scope was confirmed (mid-October 2026) — see `docs/project-overview.md`, Section 5.

---

## 8. Stakeholders

See `docs/project-overview.md`, Section 9, for the current, maintained roles-and-responsibilities table (in-house developer, external designer, Bilikisu Olatunji as quarterly data owner, Maryam Aderinto as external-account owner, and Terrace & Title leadership for content/legal/launch decisions).

---

## 9. Traceability

Every functional requirement in `docs/FRD.md` is tagged with the business objective(s) it serves. No functional requirement should exist without tracing back to at least one objective in Section 3 above; if one is proposed that doesn't, that's a scope-creep signal worth raising before building it.
