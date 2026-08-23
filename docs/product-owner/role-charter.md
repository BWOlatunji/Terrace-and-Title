# Product Owner — Role Charter

**Related documents:** everything in `docs/product-owner/`, plus `docs/BRD.md`, `docs/FRD.md`, `docs/FSD.md` (the requirements artifacts this role now owns the evolution of)

---

## What this document is

A plain statement of what the Product Owner is accountable for on this project, drawn from the standard Scrum accountabilities and made concrete against Terrace & Title's actual team, product, and phase. It exists so the boundary between the Product Owner's decisions and the developer's decisions is explicit from day one, rather than negotiated informally (and inconsistently) as questions come up.

---

## The four core accountabilities

### 1. Developing and communicating the Product Goal
The Product Owner owns `docs/product-owner/product-goal.md` — not just reading it, but revising it as understanding improves, and making sure everyone on the team (developer, designer, stakeholders) can state it in their own words. A goal nobody can repeat back isn't actually guiding anyone's decisions day to day.

### 2. Creating and clearly communicating Product Backlog Items
The Product Owner owns `docs/product-owner/product-backlog.md`. "Clearly communicating" matters as much as "creating" — a backlog item that only the Product Owner understands isn't ready to build. Every item should be understandable enough that the developer can ask good clarifying questions about it, and traceable back to `docs/FRD.md` and `docs/FSD.md` for the requirement-level detail underneath it.

### 3. Ordering Product Backlog Items
The Product Owner owns the order in `docs/product-owner/product-backlog.md`, and the reasoning behind it in `docs/product-owner/backlog-ordering-rationale.md`. Ordering is not a one-time act — it should be revisited at least every sprint (see `docs/product-owner/working-cadence.md`) as new information arrives: a stakeholder deadline shifts, a technical dependency turns out to be bigger than expected, real usage data changes what looks valuable. An order that never changes after the first draft is a sign it isn't actually being used to make decisions.

### 4. Ensuring the Product Backlog is transparent, visible, and understood
The backlog lives in this repository, in plain markdown, readable by anyone with repo access — not in a private notebook or a person's head. If a stakeholder or the developer can't find or understand the current state of priorities, that's a Product Owner accountability gap, not a communication failure to route around informally.

---

## Who holds this accountability

**One person.** Scrum is explicit that these four accountabilities belong to a single individual, not a committee, even though many people (stakeholders, the developer, the designer) may influence the decisions that person makes. This matters practically here because several stakeholders — Terrace & Title leadership, Bilikisu Olatunji, Maryam Aderinto — all have real, legitimate input into priorities (see `docs/product-owner/stakeholder-map.md`), but none of them individually, or even collectively, *are* the Product Owner. Input gets weighed and synthesized by one accountable person; it doesn't get averaged by committee, and it doesn't get executed unfiltered just because someone senior asked for it.

---

## The boundary that matters most: "what and why" vs. "how"

This is worth stating explicitly and often, because it's the single most common source of friction on small teams where the Product Owner and developer work closely and informally.

**The Product Owner (with stakeholder input) decides:**
- *What* problem is worth solving next, and *why* it matters — this is the entire content of `docs/product-owner/backlog-ordering-rationale.md`.
- *What* a backlog item needs to do to be considered valuable — acceptance criteria, business rules, which edge cases matter enough to require handling (e.g., "a district missing a current-quarter update must visibly say so" — a real example already captured as PBI-034).
- *Whether* a proposed technical approach still delivers the business outcome — the Product Owner can and should push back if a suggested implementation would quietly change what the feature actually does for a user, even without understanding the code itself.
- *When* something ships relative to other things, i.e. backlog order and what's in vs. out of a given release.

**The developer decides:**
- *How* something gets built — architecture, libraries, code structure, which of several valid technical approaches to use.
- *How long* something takes — sizing and estimation are a developer accountability. The Product Owner does not assign story points or deadlines to unestimated work; they ask the developer for an estimate and plan around it.
- *How* to structure the codebase, name things, organize files, or refactor — none of this is the Product Owner's call to make or veto, even when the Product Owner has technical background.

**A concrete example from this project, to make the line un-fuzzy:** "the quarterly pricing update should happen in one bulk-entry screen instead of six separate district records" (PBI-043) is a Product Owner decision — it's a judgment about what makes the recurring operational workflow (owned by Bilikisu) actually usable, which is a *what/why* question about the product's real-world use. "Whether that bulk-entry screen is built as a custom Payload admin view in React, or some other technical approach" is entirely the developer's call, and the Product Owner should neither have an opinion on it nor be consulted about it.

When in doubt about which side of this line a question sits on, a useful test: **if the answer changes what a user experiences or what business rule gets enforced, it's a Product Owner question. If the answer only changes what the code looks like on the way to the same user-facing outcome, it's a developer question.**

---

## What this role is not

- **Not a project manager.** Tracking whether work is on schedule, running standups, or chasing task completion is not what the four accountabilities above describe. Some of that may still happen informally given the team's size (see `docs/product-owner/working-cadence.md`), but it isn't the core job, and shouldn't crowd out backlog ordering and stakeholder alignment.
- **Not a designer.** UI/UX decisions belong to the design system already specified in `docs/design-handoff.md`. The Product Owner can flag when something doesn't feel right or doesn't serve the Product Goal, but shouldn't be redesigning components — that's the external designer's accountability, working from the same document.
- **Not the sole source of requirements detail.** `docs/BRD.md`, `docs/FRD.md`, and `docs/FSD.md` already exist and are detailed. The Product Owner's job is to keep the backlog aligned with them and update them as real decisions are made (including everything tracked in `docs/product-owner/open-questions.md`) — not to re-derive requirements from scratch.

---

## A gap worth naming directly

Scrum typically assumes a third accountability — the Scrum Master, responsible for the team's effectiveness and facilitating events — exists alongside the Product Owner and the developers. **No one currently holds that role on this project**, and the team is small enough that this may be fine in practice, or may not be. This is carried forward as an open item in `docs/product-owner/open-questions.md` rather than silently assumed either way. Until it's resolved, expect the Product Owner to informally cover light facilitation duties (see `docs/product-owner/working-cadence.md`), which is a reasonable stretch for a team this size but worth naming as a stretch, not treating as invisible.
