# Backlog Ordering Rationale

**Related documents:** `docs/product-owner/product-backlog.md` (the order this document explains), `docs/product-owner/product-goal.md`, `docs/BRD.md` (business objectives referenced throughout)

---

## Why this document exists separately from the backlog itself

An ordered list without stated reasoning is just an opinion with extra confidence. Ordering the Product Backlog is one of the Product Owner's real accountabilities — not a mechanical sort, a judgment call — and judgment calls should be inspectable, not asserted. Everything below is the reasoning that produced the order in `docs/product-owner/product-backlog.md`. **Where the incoming Product Owner's judgment differs from mine, the backlog should change, not this document's reasoning be forced to fit it.** Treat disagreement with any of this as a normal, expected outcome of a second qualified person looking at the same tradeoffs — not as an error to correct back to what's written here.

---

## The four factors used to order this backlog

Standard practice, applied consistently below:
1. **Dependency** — does other work literally require this to exist first?
2. **Value against the Product Goal** — does this directly move the three fulfillment conditions in `docs/product-owner/product-goal.md`, or is it supporting/enabling work?
3. **Risk reduction** — does building this early surface a problem (technical, legal, operational) while there's still time to react to it?
4. **Learning speed** — does building this early let real people (Bilikisu, stakeholders, early visitors) start generating real signal sooner, even before the product is "finished"?

No item in the backlog was ordered on a single factor alone — most of the reasoning below is several of these stacking in the same direction.

---

## Epic-by-epic reasoning

### Epic A (Foundation & Infrastructure) leads, despite shipping zero visible features
Pure dependency logic — nothing in Epics B through I can be built, previewed, or deployed without it. This isn't really a "priority" decision at all; it's closer to a physical constraint. The one item worth flagging inside this epic: **PBI-003 (core collection schemas) matters more than its plain description suggests.** Defining the Listings schema this early — even before any admin UI to manage it exists — is what quietly unblocks Epic C's Inspection Booking form (FR-121), which needs a working "select a property" dropdown. Without this sequencing insight, a reasonable plan might accidentally schedule Lead Capture before any Listings data model exists to reference, and stall on a dependency nobody flagged in advance.

### Epic B (Home & Credibility) before Epic C (Lead Capture)
Close call, and worth stating as one. The case for Home first: it's the first thing anyone building or reviewing the site will actually look at, and getting the brand's core visual/data claim right early gives the team a working reference point for every later screen's tone. The case for Lead Capture first would be: it's literally where BO-1 is realized, and Home's featured-listings section (FR-105) doesn't have anything real to feature until listings exist anyway. **I ordered Home first because it's cheap, fast, and low-risk relative to Lead Capture (which has real validation-and-email-delivery complexity), and because "look right" matters disproportionately for a brand whose entire pitch is credibility.** If the incoming Product Owner weighs "prove the lead-capture mechanism works" higher than "look finished early," swapping these two epics is entirely reasonable and low-cost to do.

### Epic C (Lead Capture) before Epic D (Market Intelligence / Price Check)
Both are core to BO-1/BO-2. Lead Capture goes first because it's the narrower, more self-contained piece of work (two forms, one collection, one email hook) compared to Price Check's live computation logic (FR-404) and the fuller Market Hub dataset — and because having *some* working conversion mechanism live, even before the richest data surfaces exist, means real inquiries (and therefore SM-2 signal) can start accumulating sooner. This is a **learning-speed** call more than a value call — both epics matter equally to the Product Goal, but one produces usable signal faster.

### Epic E (Content Operations Enablement) before Epic F (Opportunities & Listing Detail)
This is the least obvious ordering choice in the backlog, so it deserves the most explanation. Public-facing listing browsing (Epic F) is intuitively "more important" — it's the part of the site that looks and feels like a real estate site. But **Epic F is useless without real data behind it, and Epic E is what lets staff start entering that real data.** Sequencing Epic E first means Bilikisu and the content team can begin populating real listings, real districts, and real quarterly pricing *while the developer is still building the public Opportunities/Listing Detail pages* — instead of the more common failure mode where the public pages get finished first and then sit empty for weeks waiting on content that nobody could start entering yet. This is a deliberate parallelization move, not a statement that admin tooling matters more than the public product.

### Epic F before Epic G (Supporting Admin & Content Population)
FR-306/FR-307/FR-308 (Advisors, Developers, Articles admin) matter, but they support secondary content on the pages Epic F builds — there's limited value in being able to manage Advisor records before the sidebar that displays them exists. PBI-066 (full real-content population, replacing every prototype placeholder) sits at the end of this epic specifically because it depends on essentially everything above it being buildable first.

### Epic H (Navigation, Responsive & Polish) this late
Nav and the placeholder-page pattern (FR-126) are used by literally every other epic, which might argue for building them very early. They're placed here instead because a burger menu and a "coming soon" page are both small, fast, low-risk pieces of work that don't block anything else from being *built* — only from looking fully polished in a demo. Building them late is a calculated bet that developer time is better spent on data-bearing features first and connective-tissue polish once there's more to connect. **If early stakeholder demos matter more than raw build velocity, pull PBI-070/071 forward — this is one of the more overridable calls in this document.**

### Epic I (Launch Readiness) last, with two exceptions worth pulling forward
Most of this epic genuinely can't start until the product is functionally complete — you can't do a final server-side-validation QA pass on forms that don't exist yet. Two items are the exception and are flagged as such directly in the backlog: **PBI-082 (pointing the domain at Vercel)** has zero technical dependency on anything else being built — registrar/DNS control is already confirmed as held by Terrace & Title, so this could be done well ahead of the rest of Epic I rather than waiting until launch week. **PBI-080/081 (legal review)** similarly doesn't need to wait for a finished product; the disclaimer and policy language can be drafted and reviewed in parallel with development, and probably should be, given legal review timelines are outside the team's control.

### Epic J (Client Portal) is not ordered at all
This isn't an oversight — see `docs/product-owner/product-goal.md`. Ordering Phase 2 work in detail now would imply a level of certainty about *when* Phase 2 starts that the team explicitly doesn't have (it's activity-triggered, not date-triggered). Detailed backlog ordering for Epic J should happen as its own planning exercise once the trigger condition is close to being met, not be inherited unchanged from a plan made before any real client data existed to plan against.

---

## Where I'd most want the incoming Product Owner to sanity-check my judgment

Named explicitly, not buried:
1. **Home before Lead Capture (Epic B vs C)** — a Product Owner more focused on proving the funnel end-to-end quickly than on early polish should seriously consider swapping these.
2. **Content-ops admin before public browsing (Epic E vs F)** — the parallelization logic is sound, but it assumes Bilikisu is ready and available to start entering real content the moment Epic E ships. If that's not actually true yet, the value of this sequencing evaporates and Epic F should probably move up.
3. **Nav/polish this late (Epic H)** — if early, frequent stakeholder demos are important for keeping confidence and buy-in through an 8-week build, a rougher-but-more-demoable version of nav/polish pulled earlier might be worth the tradeoff against raw feature velocity.
