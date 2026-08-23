# Working Cadence

**Related documents:** `docs/product-owner/stakeholder-map.md` (the engagement frequencies referenced below), `docs/product-owner/role-charter.md` (the facilitation-gap note this document builds on), `docs/project-overview.md` §5 (the 8-week v1 timeline this cadence is sized against)

---

## A note before the schedule: this is sized for a team of roughly two-and-a-half people, not a standard Scrum Team

Textbook Scrum assumes a small team of developers, a Product Owner, and a Scrum Master, running a full set of formal events. This project currently has **one developer, one part-time/milestone-engaged external designer, and no Scrum Master** (flagged as an open item in `docs/product-owner/role-charter.md` and `docs/product-owner/open-questions.md`). Running the textbook cadence unmodified on a team this size would mean more meetings than there are people to have opinions in them. What follows is a deliberately right-sized adaptation — it keeps the essential *rhythm* (plan → build → review → adjust) without the ceremony overhead a team this small doesn't need. **This is a proposal, not a mandate — if the incoming Product Owner has run a different cadence successfully before and prefers it, that judgment should win.**

---

## Recommended cycle length: 1 week

**Reasoning:** the target v1 launch window is roughly 8 weeks from the date this handover package was written (`docs/project-overview.md` §5). A 2-week cycle would give the team only about four checkpoints before that target — not enough visibility into progress or risk on a timeline this tight, especially with a developer who is new to the entire technology stack (a real, named risk in `docs/project-overview.md` §11). A 1-week cycle gives roughly eight checkpoints, which allows priorities and estimates to be corrected quickly if the ramp-up is slower than hoped, without waiting two full weeks to find out. **If this cadence turns out to feel like overhead once real velocity is known, lengthening to two weeks is a reasonable adjustment — reconsider after the first three or four cycles, not before.**

---

## The cadence

### Backlog refinement — short, frequent, informal
- **When:** A standing 20–30 minute slot once or twice a week, not a separate heavyweight ceremony.
- **Who:** Product Owner and developer; designer joins when an upcoming item touches undesigned states or new components.
- **What happens:** Product Owner walks through the next few items coming up in `docs/product-owner/product-backlog.md`, developer asks clarifying questions and flags anything that looks bigger or riskier than its position in the backlog assumes. This is where sizing conversations happen — informally, not as a separate estimation ceremony, given the team's size.

### Sprint (cycle) planning — start of each week
- **When:** Start of each 1-week cycle.
- **Who:** Product Owner and developer, minimum. Designer joins if the week's work includes anything design-dependent.
- **What happens:** Product Owner presents the top of the ordered backlog and the reasoning behind that order (from `docs/product-owner/backlog-ordering-rationale.md`, updated as needed). Developer says what realistically fits in the week, given their own estimate — **the Product Owner does not dictate how much fits; they present priority, the developer determines capacity**, consistent with the "what/why vs. how" boundary in `docs/product-owner/role-charter.md`.

### Daily coordination — lightweight, not a formal Daily Scrum
- **Reasoning for the deviation from textbook Scrum:** a mandatory daily meeting for a team of one developer and one Product Owner tends to become theater — there's no one else in the room for the update to be "for." Recommended instead: a short async written check-in (a message, not a meeting) covering what's in progress and anything blocking, with the Product Owner available on short notice for unblocking questions rather than waiting for a scheduled sync.
- **If this stops working** (the developer needs more real-time support, or misunderstandings are slipping through async text), switching to a genuine short daily call is a reasonable and easy adjustment — don't be precious about the async default if it's not serving the team.

### Sprint review — end of each week
- **When:** End of each 1-week cycle.
- **Who:** Product Owner, developer, and — per `docs/product-owner/stakeholder-map.md` — Terrace & Title leadership when available, though not mandatory every single week given their engagement cadence is described there as milestone-based rather than weekly.
- **What happens:** A working demo of whatever reached Done that week (per `docs/product-owner/definition-of-done.md`), followed by the Product Owner's acceptance decision against the relevant backlog item's acceptance criteria. This is the moment the two-gate distinction in the Definition of Done document actually gets exercised, not a formality.

### Retrospective — end of each week, kept short
- **When:** Immediately after sprint review, 15–20 minutes.
- **Who:** Product Owner and developer (core team only — this is about how the team works together, not stakeholder-facing).
- **What happens:** What worked, what didn't, and — importantly — whether `docs/product-owner/definition-of-done.md` or this cadence document itself need adjusting. Both documents are explicitly living; this is the mechanism by which they actually stay that way instead of becoming stale on day one.

---

## Cadence by stakeholder — not everyone is on the weekly rhythm

Pulled directly from `docs/product-owner/stakeholder-map.md`, restated here as a single reference:

| Stakeholder | Cadence |
|---|---|
| Developer | Continuous — every event above |
| External designer | Milestone-based (Figma system complete, new screen/state needed) — not weekly |
| Terrace & Title leadership | Sprint review when available, plus epic-level milestone check-ins |
| Bilikisu Olatunji | One dedicated training session once the pricing-grid tooling is built, then quarterly |
| Maryam Aderinto | Front-loaded around account setup, then as-needed |
| Legal counsel | Two defined review gates, engaged ahead of Epic I, not on the weekly cycle |

---

## On the missing Scrum Master role

Several of the adaptations above (informal daily coordination, the Product Owner presenting the backlog *and* facilitating planning/review/retro) quietly assume the Product Owner is covering light facilitation duties that would normally belong to a separate Scrum Master. This is workable for a team this size, but it's worth being honest that it is a stretch, not a non-issue — facilitating a retrospective about your own backlog decisions is a harder position to hold impartially than facilitating someone else's. If the team grows, or if retrospectives start feeling like they avoid critiquing backlog-ordering decisions specifically because the person leading the retro is the same person who made them, that's the signal this gap has stopped being free.
