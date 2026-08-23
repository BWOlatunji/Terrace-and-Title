# Product Goal

**Related documents:** `docs/BRD.md` (the business objectives this goal is drawn from), `docs/project-overview.md` (phasing and roadmap), `docs/product-owner/product-backlog.md` (the plan to achieve this goal)

---

## What a Product Goal is, and why this document exists

In Scrum, the Product Goal is the single, long-term target the entire Product Backlog exists to serve. It's not a task, a deadline, or a feature list — it's the state the product needs to reach before it's considered to have delivered what it set out to deliver. A Scrum Team pursues **one Product Goal at a time**; the next one doesn't start until the current one is fulfilled or deliberately abandoned.

This project already has a natural two-goal structure baked into it, because the phasing decision (v1 public site, then Phase 2 client portal, triggered by real activity — see `docs/BRD.md` Section 6) *is* a Product Goal boundary, even though no one used that language when the decision was made. This document names both goals explicitly and states which one is active now.

**This is a draft, not a finished artifact.** Owning, refining, and communicating the Product Goal is a core Product Owner accountability — the incoming Product Owner should read this, decide whether it's right, and change it if their judgment differs. What follows is the reasoning that produced this draft, so it can be agreed with, adjusted, or overridden with full context, not accepted as handed-down fact.

---

## Current Product Goal (v1)

> **Prove that Terrace & Title's website can turn public, verifiable pricing data into real advisory conversations — reliably, every quarter, without the data ever needing to be gated to do it.**

### Why this wording, specifically

Every business objective in `docs/BRD.md` (BO-1 through BO-5) is really in service of one underlying bet: that publishing real data builds enough trust to generate leads, and that this only works if the data stays real over time. A Product Goal should be the thing that, if achieved, would make the rest of the roadmap's early decisions look justified in hindsight. "Launch the v1 site" is not itself a Product Goal — it's an output. The actual outcome being tested is whether the data-led positioning *works as a lead-generation mechanism*, and whether the operational habit of keeping the data current (SM-4) actually holds up once it's someone's real quarterly job rather than a plan on paper.

### How this goal will be judged fulfilled

Three conditions, all drawn directly from the BRD's success metrics (Section 5) — not new metrics invented for this document:

1. **SM-1 and SM-2 are both non-zero and trending in a direction stakeholders find meaningful** — price-check completions and advisor-call bookings are actually happening, not just technically trackable.
2. **SM-4 has held for at least one full quarterly cycle** — the pricing data has been updated on time at least once since launch, proving the operational model (a named owner, a CMS, a recurring habit) works in practice, not just in the org chart.
3. **No open question in `docs/product-owner/open-questions.md` remains unresolved if it would materially undermine trust in the data** (for example: the sample-size and median-plot-size figures having a real, defensible methodology behind them — see that document for the specific item).

There is deliberately no numeric target set for SM-1/SM-2 in this document. `docs/BRD.md` is explicit that a baseline should be established in the first full quarter before a growth target is set — setting one now would be a guess dressed up as a decision. **This is a call for the incoming Product Owner to make once real data exists**, not something this handover package should pre-empt.

### What is out of scope for this goal

Everything in the Client Portal module (`docs/FRD.md` Module 2, FR-201–FR-208) is explicitly not part of this goal. Building portal features before this goal is fulfilled would be solving a problem (retention/service for existing clients) before the goal that justifies having clients to serve in the first place has been proven out.

---

## Next Product Goal (Phase 2) — not yet active

> **Let an existing client track their own deal and documents well enough that routine status questions stop requiring a phone call to their advisor.**

This is a placeholder, intentionally underdeveloped compared to the current goal above. Per Scrum practice, refining the *next* Product Goal in detail before the *current* one is fulfilled is premature — priorities, learnings from v1, and even the shape of the portal itself may look different once there's real usage data to plan against. What's fixed today is only the **trigger condition** already agreed in `docs/BRD.md`: Phase 2 begins once v1 has produced a meaningful volume of real inquiries/deals, not on a calendar date.

**Open question for the incoming Product Owner:** what "meaningful volume" concretely means (a number of inquiries? a number of active deals? a subjective judgment call reviewed monthly?) has not been defined. See `docs/product-owner/open-questions.md`, which carries this forward as an item requiring a decision before Phase 2 planning can responsibly begin — vague trigger conditions have a way of never quite triggering.
