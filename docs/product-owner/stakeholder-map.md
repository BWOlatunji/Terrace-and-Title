# Stakeholder Map

**Related documents:** `docs/project-overview.md` (Sections 9 and 10 are the source for the named individuals and account ownership below — this document reorganizes that same information around engagement, not just responsibility), `docs/product-owner/working-cadence.md` (where the engagement cadence below plugs into the actual rhythm of work)

---

## How to use this document

A stakeholder list tells you who exists. A stakeholder *map* tells you how much attention each one needs, and when — which matters more, because treating every stakeholder with the same cadence either wastes the Product Owner's time on low-stakes updates or starves a high-stakes relationship of the attention it needs. The grid below uses the standard power/interest framing (how much influence someone has over the product's direction, and how closely they're paying attention to it), followed by a concrete engagement cadence per stakeholder.

**This map should be revisited whenever a new stakeholder appears** — most obviously, real advisors and eventually real clients, both of which are currently placeholder or future-state entries below.

---

## Power / interest grid

| | **Low interest** | **High interest** |
|---|---|---|
| **High power** | Existing legal counsel (engaged at specific gates, not continuously) | Terrace & Title leadership; Product Owner's own management chain |
| **Low power** | Developer partners (no direct channel currently — see note below) | In-house developer; external designer; Bilikisu Olatunji; Maryam Aderinto |

A note on why the developer sits in "low power, high interest" rather than somewhere implying more authority: this reflects the "what/why vs. how" boundary from `docs/product-owner/role-charter.md` — the developer has full authority over implementation, but does not set product direction or priority, which is what this grid is measuring. It is not a statement about how much their input should be weighed day to day, which in practice is heavy and constant.

---

## Stakeholder detail

### Terrace & Title leadership
- **Power/interest:** High/High.
- **What they care about:** Content accuracy, legal/compliance sign-off, launch timing, and ultimately whether the product delivers on BO-1 through BO-5.
- **Decision rights:** Final say on launch timing, brand/content accuracy, and any tradeoff the Product Owner escalates as needing business judgment beyond the backlog's normal ordering.
- **Engagement cadence:** Sprint Review attendance when available (not mandatory every cycle — see `docs/product-owner/working-cadence.md`), plus milestone check-ins at the end of each epic in `docs/product-owner/product-backlog.md`.

### In-house developer
- **Power/interest:** Low (in the direction-setting sense above)/High.
- **What they care about:** Clear, well-communicated backlog items; enough context to make good technical decisions without needing the Product Owner to specify implementation.
- **Decision rights:** Full authority over architecture, technical approach, and effort estimation.
- **Engagement cadence:** Continuous — this is the Product Owner's most frequent working relationship. See `docs/product-owner/working-cadence.md` for the specific rhythm (sprint planning, refinement, async coordination).

### External designer
- **Power/interest:** Low/High, but engaged intermittently rather than continuously.
- **What they care about:** A complete, stable specification to work from (`docs/design-handoff.md`) and clear resolution when they flag a gap (undesigned states, inconsistent components) that needs a product decision, not just a design one.
- **Decision rights:** Full authority over how the Figma system is built; escalates to the Product Owner when a gap requires a product-level decision (e.g., "should this loading state exist at all, or is this screen never expected to load slowly enough to need one").
- **Engagement cadence:** Milestone-based, not sprint-based — engage at defined checkpoints (Figma system complete, any new screen/state needed) rather than every cycle.

### Bilikisu Olatunji — quarterly data owner
- **Power/interest:** Low/High, but only around one specific, high-stakes recurring responsibility.
- **What she cares about:** A CMS workflow (PBI-043, the bulk pricing grid) that's actually usable without technical help, and clarity on exactly what "on time" means for the quarterly update.
- **Decision rights:** None over backlog priority, but her operational reality should heavily inform how PBI-043 is specified — this is a case where a low-power stakeholder's input should still materially shape a specific backlog item.
- **Engagement cadence:** Low-frequency but high-importance — a dedicated walkthrough/training session once PBI-043 is built, then a check-in each quarter to confirm the update actually happened (this directly feeds SM-4 in `docs/BRD.md`).

### Maryam Aderinto — external account/billing owner
- **Power/interest:** Low/Low-to-moderate — her scope is narrow (account creation and billing across the five services in `docs/project-overview.md` §10) but essential.
- **What she cares about:** Knowing when each account needs to exist (so she isn't blocking Epic A) and being looped in on any billing-relevant change (a service tier upgrade, a new service being added later).
- **Decision rights:** Controls account access and billing approval; effectively a hard dependency for Epic A even though she has no product-priority input.
- **Engagement cadence:** Front-loaded — most of her involvement happens once, early (setting up the five accounts before Epic A can complete), then drops to occasional/as-needed.

### Existing legal counsel
- **Power/interest:** High power (can block launch), typically low ongoing interest (engaged at specific gates only).
- **What they care about:** The Terms of Use, Privacy Policy, and disclaimer language (PBI-080, PBI-081) meeting the firm's actual legal exposure, particularly given the Price Check tool produces something that could be read as a valuation.
- **Decision rights:** Effectively a veto over launching with unreviewed legal content — this is treated as a hard gate in `docs/product-owner/product-backlog.md` (Epic I), not a soft recommendation.
- **Engagement cadence:** Two defined touchpoints — reviewing drafted policy pages, and reviewing the disclaimer copy already written into the product (Listing Detail, Price Check). Should be engaged well before Epic I starts, not held until the last sprint, given legal turnaround is outside the team's control.

### Real advisors (once onboarded — currently placeholder data)
- **Power/interest:** Currently N/A (don't exist as named individuals yet); once real, likely Low/High, similar to the developer's profile — they'll be daily-or-near-daily users of the admin's Inquiries triage (FR-309) and their own listing/profile accuracy matters directly to the brand's credibility claim.
- **What they'll care about:** Whether the admin panel is actually usable for their day-to-day triage work, and whether their own public-facing bio/contact info is accurate.
- **Decision rights:** None over product priority by default, though their operational feedback on FR-309's usability should carry real weight once they exist, the same way Bilikisu's does for FR-305.
- **Engagement cadence:** Not yet applicable. **Add this stakeholder group properly once real advisor names replace the placeholder data (PBI-066)** — this map should be updated at that point, not treated as covering them adequately in advance.

### Developer partners
- **Power/interest:** Low/Low-to-moderate — they have a real interest in accurate representation but currently no direct channel into the product at all (see `docs/user-stories.md`, the note at the top of the Developer Partner role section).
- **What they care about:** Their track record and verified-partner status being accurate and current wherever they're referenced.
- **Decision rights:** None — every need is mediated entirely through staff-managed records (FR-307) and public display (FR-113). This is a real gap worth the Product Owner being aware of, not solved by this document, if direct developer self-service is ever wanted.
- **Engagement cadence:** None currently exists. Flagged, not resolved — see `docs/product-owner/open-questions.md` if a direct channel is ever wanted.

### Future clients (Phase 2 portal users)
- **Power/interest:** Not stakeholders in the governance sense (no seat at planning), but the entire justification for Epic J's existence — the Product Owner represents their interests without them being directly present in any of these conversations.
- **Engagement cadence:** Not applicable until Phase 2. Worth considering, once Phase 2 planning starts, whether any lightweight mechanism for real client feedback (even informal — an advisor relaying what clients say) should inform that planning, rather than designing the portal purely from internal assumptions about what clients want.
