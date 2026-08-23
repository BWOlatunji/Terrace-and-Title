# Definition of Done

**Related documents:** `docs/FSD.md` (the validation rules and edge cases this checklist enforces), `docs/design-handoff.md` (the token/breakpoint/state requirements this checklist enforces), `docs/product-owner/role-charter.md` (the acceptance distinction explained in the final section below)

---

## What this is, and who owns it

The Definition of Done is the checklist a backlog item must pass before it can be called "Done" — a shared quality bar, not a matter of individual judgment on a given day. It belongs to the whole team (Product Owner, developer, designer), not to the Product Owner alone, and it should be revisited and adjusted in retrospectives (see `docs/product-owner/working-cadence.md`) as the team learns what's actually working. What's below is a first draft, built from the specific gaps and requirements already identified across the existing documentation — not a generic checklist copied from elsewhere.

---

## The checklist

A backlog item is **Done** when all of the following are true:

### 1. Functional correctness
- [ ] The item's behavior matches its `docs/FRD.md` requirement(s) and the corresponding entry in `docs/FSD.md` — including the **edge cases and validation rules**, not just the primary/happy-path behavior. (`docs/FSD.md` repeatedly documents specific edge cases — e.g. FR-116's stale-quarter labeling, FR-403's missing-district-price handling — that exist precisely because "the happy path works" was judged insufficient on this project.)
- [ ] Every validation rule specified in `docs/FSD.md` is enforced **server-side**, not only in the browser. This is called out explicitly because `docs/FSD.md` flags it as a real, repeated risk (FR-120's consent checkbox, FR-208's portal access control) — a client-side-only check is not a completed requirement, it's a decoration that a motivated user can bypass.

### 2. Visual and responsive fidelity
- [ ] Matches the design tokens in `docs/design-handoff.md` Section 1 — no ad hoc colors, spacing, or radius values invented during implementation.
- [ ] Verified at all three required breakpoints: 1440px (desktop), 1080px (the point where the desktop nav collapses to the burger menu), and 700px (the point where multi-column layouts drop to one column).
- [ ] If the item touches a component listed in `docs/design-handoff.md` Section 4, it uses that component rather than a one-off recreation of similar-looking markup.

### 3. States
- [ ] Every state the item can realistically be in has been considered: loading, empty, error, and populated, per the specific screen entry in `docs/design-handoff.md` Section 2. That table exists specifically to name which states currently have no design — an item touching one of those screens is not Done if it ships only the populated state and silently drops the others.
- [ ] Where a state genuinely doesn't apply (e.g. a static page with no data fetch), that's a deliberate decision, not an oversight — worth a one-line note in the PR/commit so the next person doesn't wonder whether it was missed.

### 4. Accessibility baseline
- [ ] Interactive elements are keyboard-operable.
- [ ] Focus states are visible. `docs/design-handoff.md` flags that **no disabled or focus-visible state exists anywhere in the current build** — an item is not Done if it perpetuates that gap on new interactive elements rather than closing it (see PBI-073 in `docs/product-owner/product-backlog.md`, which exists specifically to retrofit this).
- [ ] Images (including placeholder images) have appropriate alt text.

### 5. Data integrity
- [ ] If the item involves a status or verification field with more than one possible value, an unset/blank value never silently displays as the most favorable status (the pattern already established for documentation status in FR-112: unset defaults to "Pending," never "Verified"). Apply the same discipline to any new status field.
- [ ] If the item surfaces a number derived from CMS-editable data, it's computed live from that data at request/build time — never hardcoded, never a value that could silently drift out of sync with the CMS.

### 6. Analytics and observability
- [ ] If the item is one of the two events specified in FR-408 (price-check completion, advisor call booked), the corresponding Plausible goal fires correctly and has been manually verified in a preview environment, not just assumed from the code.
- [ ] No new console errors or warnings introduced.

### 7. Deployability
- [ ] Reviewable on a Vercel preview deployment before merging — not just working "on my machine."
- [ ] Documentation updated if the item's real, implemented behavior diverges from what `docs/FRD.md` or `docs/FSD.md` currently say. Those documents should stay a living, accurate reference, not a historical snapshot of the original plan.

---

## Definition of Done vs. Product Owner acceptance — two separate gates, on purpose

Meeting every item above makes something **Done** in the team's shared quality sense. It does not automatically make it **Accepted**. These are deliberately kept as two distinct gates:

- **Definition of Done** answers: *was this built well, completely, and to the team's quality standard?* Any team member can verify this against the checklist above.
- **Product Owner acceptance** answers: *does this actually solve the problem it was meant to solve, against the acceptance criteria in the relevant backlog item or user story?* Only the Product Owner (or someone explicitly delegated that authority) makes this call.

It's entirely possible for something to be Done and still not Accepted — technically correct, responsive, accessible, and well-tested, but still not quite the right thing, because a requirement was misunderstood or a real-world constraint only became clear once it was in front of someone. That's not a failure of either gate; it's why both exist. Rejecting a Done item at acceptance should trigger a new or revised backlog item, not a reopening of an argument about whether the original work met the Definition of Done — those are different questions, and conflating them tends to make both gates weaker.
