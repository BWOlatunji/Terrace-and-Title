# Design Handoff — Terrace & Title Web App

**This document is a design specification, not a Figma file.** Figma files can't be generated directly from code — there is no automated, lossless path from CSS to Figma components, variants, and auto-layout. What follows is everything a designer needs to rebuild this UI in Figma quickly and accurately: every token, every screen with its states, a region-by-region layout description of each one, a full component inventory with variants, and a recommended import workflow (Section 5) for getting geometry into Figma fast as a starting scaffold — which should then be rebuilt as real components using this document as the source of truth, not trusted as final output.

The source of truth behind every value in this document is the working prototype at `/index.html` in this repo. If anything here and the live prototype ever disagree, the prototype is correct and this document needs updating.

---

## 1. Design tokens

### 1.1 Color

| Token | Hex | Used for |
|---|---|---|
| Navy | `#0F2D52` | Primary brand color. All headings, primary buttons, dark section backgrounds (market intelligence band, market hub header, portal login side panel, footer), price-history chart line on light backgrounds |
| Navy Light | `#1A4174` | Hover state for navy primary buttons and links |
| Champagne Gold | `#C8A96A` | Secondary brand color, reserved for data and evidence — verification seal border/accent, gold CTA buttons, lead chart series (prime index line, district bar chart fills), eyebrow labels on dark backgrounds, price-check result panel border and tint, "current" stage in the deal tracker, footer column headings |
| Gold Light | `#DDC596` | Hover state for gold buttons; footer tagline text color |
| Green | `#2E6B4A` | Positive signal only — QoQ price deltas, "Verified" status words and dots, "Verified Partner" developer badge, completed deal-tracker stages, "Verified"/"Advisor Assigned" status pills |
| Terracotta | `#B86A4F` | Honesty/caution signal — eyebrow labels on light backgrounds, "Verification in progress" seal, disclaimer warning mark, portal sign-out link, "Action Required" status pill |
| Slate | `#4E5B68` | Default body copy color |
| Micro Grey | `#8A93A0` | Micro-label text color only (the smallest uppercase labels) |
| Mist | `#F5F7FA` | Alternating section backgrounds, page-header bands, disclaimer/callout box backgrounds, report-card background |
| Paper | `#FBF8F3` | Hero background, portal login form-column background, mobile drawer background |
| White | `#FFFFFF` | Card and page background |
| Hairline 08 | `rgba(0,0,0,0.08)` | Lightest dividers (e.g. between stat cells, list items) |
| Hairline 10 | `rgba(0,0,0,0.10)` | Standard card/component borders |
| Hairline 15 | `rgba(0,0,0,0.15)` | Input field borders |

**Placeholder-image texture (not a brand color — a system convention):** every photograph in the product is a diagonal-stripe placeholder rather than a real image, since no photography exists yet. Light contexts use `#E6EAEE` / `#EEF1F5` in a repeating 45°-ish diagonal stripe; dark contexts (the listing-detail cover image) use `#0C2645` / `#123457` the same way, with a monospace caption naming what the real photo should be (e.g. "listing photograph — Maitama plot, wide crop"). **Recreate this pattern in Figma as an actual component, not a placeholder you'll forget to swap** — it's a deliberate, permanent part of the visual language until real photography exists, not a "to-do."

### 1.2 Typography

Four families, each with exactly one job. None of them substitute for each other.

| Family | Role | Weights in use | Notes |
|---|---|---|---|
| **Source Serif 4** | All headings (H1–H4), the wordmark, advisor/client names, the footer tagline, portal greeting | 500 (default/large), 600 (small headings and bold emphasis), 600 italic (footer tagline, portal-login statement) | This is the only serif in the system. It should always read as calm and editorial, never decorative. |
| **Geist** | Body copy, UI labels, form fields, buttons, nav links, non-numeric table cells | 400 (body), 500 (nav links), 600 (buttons, emphasis) | The default, load-bearing sans. Should be invisible — never draw attention to itself. |
| **Manrope** | Eyebrow labels and micro-labels **only** — never body copy, never headings | 700 (micro-labels), 800 (eyebrows, footer headings) | Always uppercase, always letter-spaced (see table below). This is the smallest type on the page by design. |
| **IBM Plex Mono** | Every number, with zero exceptions — prices, ₦/sqm, sizes, dates, chart axis labels, table figures, status words, portal stat values | 400–600 | This is the single strongest visual signal of the brand's data-led positioning. If a number is set in anything other than this family, it's a bug, not a stylistic choice. |

**Letter-spacing by use** (Manrope only):

| Element | Size | Letter-spacing |
|---|---|---|
| Eyebrow label | 12px | 0.22em |
| Micro-label | 11px | 0.14em |
| Footer column heading | 12px | 0.18em |
| Logo sub-label ("Real Estate Advisory") | 9px | 0.20em |
| Developer "Verified Partner" badge | 10px | 0.10em |

**Heading size scale** (Source Serif 4):

| Context | Size (desktop) | Size (mobile, <700px) |
|---|---|---|
| Hero H1 | 64px | 40px |
| Listing detail cover H1 | 42px | — (fluid, no fixed override) |
| Page-header band H1 / Market Hub H1 | 38px | — |
| Section H2 | 30–34px | — |
| Placeholder-page H1 | 30px | — |
| Portal dashboard H1 | 32px | — |
| Detail block H3 | 22px | — |
| Card title H3 (listing cards) | 20–21px | — |
| Small headings H4 (verify cards, sidebar cards) | 15–19px | — |

**Body and data sizes:**

| Context | Size |
|---|---|
| Base body text | 16px |
| Hero lede paragraph | 17px |
| Standard paragraph / form copy | 14–15px |
| Small print (disclaimers, sub-labels) | 12.5–13.5px |
| Mono table/list figures | 13–15px |
| Mono stat-card values | 18–22px |
| Mono hero-card / data-strip figures | 26–30px |
| Mono price-check big result figure | **44px** — the single largest number on the entire site, by design |

### 1.3 Spacing

| Token | Value | Use |
|---|---|---|
| Container max-width | 1280px | All page content |
| Container side padding | 24px | |
| Section vertical padding (standard) | 88px top/bottom | Most full-width sections |
| Section vertical padding (tight) | 64px top/bottom | Price-check CTA band, and any section marked "tight" |
| Section vertical padding (mobile, <700px) | 56px top/bottom | All sections |
| Page-header band padding | 56px top/bottom | |
| Card padding | 22–40px, varies by card weight (listing card body 22px → contact form card 40px) | See per-component notes in Section 4 |
| Grid/layout gaps | 20–56px, varies by layout density (stat rows 20px → two-column page layouts 48–56px) | |
| Small internal gaps | 6–16px | Icon-to-text, form-field stacking |

### 1.4 Border radius

**One rule, two exceptions.** Every card, button, input, and image uses `2px` — deliberately architectural, not the rounded "friendly SaaS" default. The only elements allowed to be fully round are:
1. **Pills and badges** (status words, filter chips, mode-select chips, the verification seal, portal nav's active-state pill) — `999px` / `99px`.
2. **Perfect circles** (avatar placeholders, the small colored dot inside a seal, deal-tracker stage dots) — `50%`.

If you find yourself wanting a radius between 2px and fully-round anywhere else, that's a sign the component doesn't belong in this system as drawn — flag it rather than picking a number.

### 1.5 Shadow

Shadows are a scarce resource in this system — used only on hover, and only on cards that are actually clickable, plus three static exceptions listed below.

| Use | Value |
|---|---|
| Listing card, hover only | `0 16px 36px rgba(15,45,82,0.14)` |
| Hero overhanging card *(static — the one deliberate exception, since it needs to visually separate from the image behind it at rest)* | `0 14px 40px rgba(15,45,82,0.16)` |
| Portal active nav pill *(static, very subtle)* | `0 1px 3px rgba(15,45,82,0.08)` |
| Deal-tracker "current" stage — a halo ring, not a drop shadow | `0 0 0 4px rgba(200,169,106,0.22)` |

### 1.6 Motion

There is no animation system in this product beyond plain CSS transitions on hover/state-change — no keyframe animations, no scroll-triggered reveals, no page-transition choreography. Be precise about this when rebuilding: **a "title-verified stamp" reveal animation does not currently exist anywhere in the build.** If that's wanted, it's new design work to scope, not something to reverse-engineer from what's here. What *does* exist:

| Interaction | Behavior |
|---|---|
| Button / link hover | Background or border color change, `150ms ease` |
| Listing card hover | Shadow fades in + card lifts `2px` (`translateY(-2px)`), `180ms ease` |
| Nav link hover/active | Gold underline appears, no transition specified (instant) |
| Contact page tab switch | Instant show/hide of the inspection-only field group — no fade or slide |
| Mode-select chip click | Instant background/border swap to the selected state |
| Filter rail change | Instant re-render of the results list — no loading state, no transition |
| Mobile drawer open/close | Instant show/hide (`display:none` ↔ flex) — **no slide-in transition currently exists**; this would be a reasonable enhancement to design but should be treated as new, not assumed |
| Price-check form submit | Instant re-render of the result panel |

---

## 2. Screen inventory

| # | Screen | Purpose | States that currently exist | States NOT yet designed (flag for new work) |
|---|---|---|---|---|
| 1 | Home | Establish credibility via data, funnel to an advisor call | Populated (only) | Loading, empty (n/a — always has content) |
| 2 | Opportunities | Browse/filter verified listings | Populated; **Empty ("No opportunities match these filters")** | Loading skeleton, error |
| 3 | Listing Detail | Build trust in one specific plot, convert to callback/inspection | Populated | Loading, "listing not found," error |
| 4 | Market Intelligence Hub | Publish the full quarterly dataset | Populated | Loading, error, "no data for this quarter yet" |
| 5 | Price Check | Self-serve estimate tool | Populated (form always shows a result — currently defaults to the first district on load, never truly empty) | Loading (while computing), error |
| 6 | Contact / Inspection | Capture a lead | Form (default); **success state (button label swap)** | Validation-error state, loading/submitting state |
| 7 | Portal Login | Authenticate an existing client | Form (default) | Invalid-credentials error, loading state, "account not found" |
| 8 | About | Brand story, credibility | Populated | — |
| 9 | Services | Service-line overview | Populated | — |
| 10 | Portal Dashboard | Deal status + market watchlist for a signed-in client | Populated | Loading, empty (client with no active deal), error |
| 11 | Portal Inquiries | List a client's own inquiry history | Populated | Loading, **empty (no inquiries yet)**, error |
| 12 | Portal Documents | List + upload documents for a deal | Populated | Loading, empty, upload-in-progress, upload-error |
| 13 | Placeholder / "Coming soon" | Catch-all for any nav destination not yet built | Populated (this *is* the empty/stub state, by design) | — |
| — | Header (persistent) | Global nav | Default; scrolled (94% opacity + blur, always active since sticky) | — |
| — | Mobile drawer (persistent) | Mobile nav | Closed (default), open | — |
| — | Footer (persistent) | Global nav, tagline, newsletter capture | Default; **subscribed (button label swap)** | — |

**Read this table literally when scoping Figma work:** several "states" columns are short because this is a static prototype with hardcoded, always-successful data — it has never had to render a loading spinner or a network failure, because it never makes a real network request. Once this becomes a real data-driven app (Next.js + Payload, per the tech stack), *every* screen that fetches data needs a loading state and an error state designed, even though none exists to copy today. Treat the "not yet designed" column as this handoff's actual punch list for the designer, not a minor footnote.

---

## 3. Screen-by-screen layout

Each screen below is described top-to-bottom (or, for multi-column layouts, main-column-then-sidebar), naming the actual component in parentheses so it's traceable to Section 4.

### Persistent: Header
- Full-width, sticky to top, `76px` tall, white at `94%` opacity with backdrop blur — stays translucent-blurred at all scroll positions (no separate "scrolled" visual state beyond the blur being permanently active once you can see through it to page content).
- Left: **Logo lockup** — mark image (36×36px) + Source Serif 4 wordmark "Terrace & Title" (gold ampersand, italic) + Manrope micro sub-label "Real Estate Advisory" below, indented to align under the wordmark.
- Center-right: six **nav links** (Home / Opportunities / Market Intelligence / About / Services / Contact), gold underline on hover/active.
- Far right: "Client Portal" text link, "Speak to an Advisor" primary navy button (small size).
- Below 1080px: nav links and the two right-hand items disappear; a **burger button** (three lines) appears in their place.

### Persistent: Mobile drawer
- Full-viewport overlay, paper background (not a dark scrim over the page — a full opaque replacement).
- Top row: logo lockup (left), close "×" button (right).
- Nav links stacked vertically, large Source Serif 4 (28px), no underline styling.
- Below the nav: a hairline divider, "Client Portal" link, and the full-width "Speak to an Advisor" button.

### Persistent: Footer
- Navy background, always.
- Top row (4 columns): brand column (logo lockup in white/gold + italic tagline "Invest with confidence. Own with pride."), then three link columns ("Explore," "Company," "Resources") each under a gold Manrope heading.
- Middle strip: "Quarterly Market Note" heading + one line of copy, beside an inline email-capture form (input + "Subscribe" button in gold).
- Bottom bar: copyright text (left), "Abuja, Federal Capital Territory, Nigeria" in mono (right), separated by a hairline above.

### 1. Home
1. **Hero** (paper background) — two columns. Left: gold eyebrow, two-line 64px headline, lede paragraph, two CTAs (primary + outline). Right: portrait **placeholder image**, with a **hero card** overhanging its bottom-left edge (white, static shadow) containing the **verification seal**, a large mono figure ("1,240"), and a micro caption.
2. **Data strip** — full-width white band, hairline top/bottom border, 4 equal cells separated by hairline dividers: each a micro-label, a large mono figure, and a colored delta line.
3. **Verification band** (white) — terracotta eyebrow, H2, then 3 equal **verification stage cards** (numbered 01/02/03, gold top rule) in a row, closed by a mist **note box** with no icon, just copy.
4. **Market intelligence band** (navy) — gold eyebrow, H2, then two columns: left is a legend (two swatches) above a **line chart** (gold solid "Prime index" vs. white dashed "Suburban index"); right is a micro-label above a **bar-track list** (one row per district, label + progress-bar + mono value). Closed by a centered gold CTA button.
5. **Featured opportunities** (white) — terracotta eyebrow + H2, then a 3-up grid of **listing cards** (vertical variant).
6. **Price-check CTA** (mist, tight padding) — centered: eyebrow, H2, single gold button. No supporting image or chart — deliberately the simplest band on the page.

### 2. Opportunities
1. **Page-header band** (mist) — terracotta eyebrow, H1 with an inline mono result count ("6 verified opportunities across...").
2. **Two-column layout**, gap 36px:
   - Left: **filter rail** — sticky, 264px, white bordered card. Category select, District select, Price range (two number inputs side by side), three checkboxes ("Title verified only," "Payment plan available," "Below district average"), then a full-width outline "Reset filters" button.
   - Right: a **results bar** (mono result count left, sort dropdown right) above a vertical stack of **listing cards (horizontal variant)** — 212px image, content column, three labelled mono stats in a row.
3. **Empty state** (real, already built): centered copy "No opportunities match these filters." with an inline text-link "Reset filters."

### 3. Listing Detail
1. **Cover** — 440px tall placeholder image (dark variant), bottom-up navy gradient scrim. Over the scrim: verification seal, H1 (title), mono location line.
2. **Two-column layout** (main + 380px sticky sidebar), gap 56px:
   - **Main column, top to bottom:**
     - **Stats strip** — 4-cell bordered card: Price (+ payment-plan note), ₦/sqm (+ "at/above/below district average" read), Size, Status.
     - "Price history — [District]" — a full-width **line chart**, single navy series.
     - "Projected use case" — plain prose paragraph.
     - "Documentation" — a 2-column **table** (Document / Status), 4 rows (C of O, Survey plan, Registry search, Deed of assignment), each status a colored **status-word pill**.
     - **Disclaimer box** — mist background, terracotta warning mark, small print.
   - **Sidebar, top to bottom:**
     - **Advisor card** — avatar circle + name + patch, then a 3-field callback form (name, phone, best time), primary button, and below the card a secondary outline "Book an inspection" button.
     - **Developer card** — green "Verified Partner" badge, developer name, two labelled stat rows (track record, delivery reliability).

### 4. Market Intelligence Hub
1. **Header band** (navy, full-width) — gold eyebrow, H1 ("Q2 2026 Abuja district report"), then a 4-cell index row (Prime index, Suburban index, Median plot size, Sample size), each a micro-label over a large mono value, hairline-divided.
2. **Two-column layout** (gap 56px):
   - Left: H3 "Pricing by district" + a full **price table** (District / Land ₦/sqm / Residential ₦/sqm / QoQ), one row per district, QoQ in green.
   - Right sidebar, stacked cards: a mist **report card** ("the full report is issued through an advisor, not downloaded" + primary button — the CTA is explicitly *not* a download), a white card listing 3 education **article links** (arrow icon, no thumbnail), and a standalone outline button to the Price Check tool.

### 5. Price Check
1. **Page-header band** (mist).
2. **Two-column layout** (400px form + flexible result column):
   - Left: bordered **form card** — District select, Property type select, optional Size input, full-width primary submit button.
   - Right, generated on load and on every form change:
     - **Result panel** — gold border, gold-tinted background, eyebrow (district + type), the **44px mono figure** (the largest number in the product), a green delta, and a light-axis **line chart** below it.
     - **Two-up cards**: "Estimated range at [size] sqm," "Live listings in [district]."
     - **Navy CTA strip** — heading + subcopy left, gold "Book a 20-minute call" button right.
     - Small-print disclaimer paragraph, no box around it (distinct from the listing-detail disclaimer, which *is* boxed).

### 6. Contact / Inspection
1. **Page-header band** (mist).
2. **Two-column layout** (flexible form + 320px sidebar):
   - Left: bordered **contact card**, 40px padding (the most generous card padding in the system). Two **tabs** ("General inquiry" / "Book an inspection," underline-style, no icons). Shared fields in a 2-column grid (name, phone/WhatsApp, email, location select). Inspection tab reveals (hairline-divided): property select, date, a row of **mode-select chips** (In person / Virtual walkthrough / Representative attends), timezone select, and a mist **virtual-walkthrough note**. Below all fields: a consent checkbox row, then the primary submit button (not full-width — left-aligned).
   - Right: a single **sidebar card** — "Office" heading, address in body copy, direct phone/email in **mono**, and a response-time commitment line.

### 7. Portal Login
- **No site header or footer** — this screen replaces the entire page chrome.
- Two-column, full-viewport split:
  - Left (paper background): logo lockup, H2 "Welcome back," email field, password field, full-width primary "Sign in" button, a "New client? Speak to an advisor" line, and a "← Back to main site" link below everything.
  - Right (navy background, hidden below 1080px): a large italic H2 statement, and two **stat figures** stacked (label under each mono value) — no chart, no image, just typography.

### 8. About
1. **Page-header band** (mist).
2. **Two-column grid** — two paragraphs of prose (left) beside a landscape **placeholder image** (right).
3. **About-stats strip** — 3-cell bordered row directly under the grid (Years active / Transactions advised / Districts covered).
4. **Values section** (mist background) — H2 + 3-up grid of plain **service-style cards** (no icons — title + one line each), reusing the same card shape as the Services page rather than introducing a new one.

### 9. Services
1. **Page-header band** (mist).
2. **3-up grid** of 6 **service cards** — terracotta eyebrow "Service," H3 title, one paragraph.
3. **Closing CTA band** (navy, centered) — H2 + single gold button.

### 10. Portal Dashboard
- Sits inside the **portal shell** (see below), not the main site chrome.
1. H1 greeting ("Good afternoon, Efe.").
2. **3-up stat card row** (Active inquiries / Properties shortlisted / Documents pending — micro-label + mono value each).
3. **Two-column panel layout** (1.4fr : 1fr):
   - Left: **deal tracker panel** — H3 naming the property, then a 5-stage horizontal stepper (Inquiry → Inspection → Documents → Offer → Transfer): each stage is a dot + connecting line + label; cleared stages are green, the current stage is gold with a halo ring, remaining stages are grey. Below the stepper, a one-line mist **blocking-reason note**.
   - Right: **watchlist panel** — district name + green QoQ delta on one line, a large mono price below, and a small **line chart** underneath.

### 11. Portal Inquiries
- Inside the portal shell.
1. H1 "Inquiries."
2. A single bordered panel containing a **record list** — one row per inquiry, divided by hairlines: title + meta line (date, type) on the left, a colored **status pill** on the right (New = gold, In Review = solid navy, Advisor Assigned = green, Closed = grey).

### 12. Portal Documents
- Inside the portal shell.
1. H1 "Documents."
2. Same **record list** pattern as Inquiries, with document-specific status pills (Verified = green, Pending = gold, Action Required = terracotta).
3. Below it, a separate **upload card** (dashed border) — document-type select, a dashed **drop area** ("Drag a file here, or click to browse"), and a small primary "Upload document" button.

### 13. Placeholder / "Coming soon"
- Sits inside the **full main-site chrome** (header + footer still present) — this is the one rule that matters most about this screen: an unbuilt page never drops the shell.
- Single centered mist card: terracotta eyebrow "Coming soon," H1 (the page name, title-cased from its URL), one line of body copy, an outline "Back to home" button.

### Portal shell (wraps screens 10–12)
- Replaces the main site header/footer entirely.
- **Top bar** — white, 66px tall: logo lockup (left), "← Back to main site" link (right).
- **Body** — two columns: a 212px **sidebar** (mist background, not white) containing "Signed in as [Name]," then a vertical nav list where the active item renders as a **white pill** against the mist background, and a terracotta "Sign out" link pinned below the nav; then the main content column, generously padded (44px/40px).
- Below 1080px: sidebar collapses to a horizontal scrolling nav bar at the top of the content instead of a left column; the "Signed in as" label is dropped to save space.

---

## 4. Component library

| Component | Variants / states | Appears on |
|---|---|---|
| **Button** | Primary (navy), Gold, Outline (navy border/text), Outline-light (white border, for dark backgrounds), Text link (terracotta, underlined); modifiers: block (full-width), sm (compact) | Everywhere. **Gap to flag:** no disabled or focus-visible state is styled anywhere in the current build |
| **Logo lockup** | Full (mark + wordmark + sub-label) used in header/footer; mark + wordmark only (no sub-label) used in mobile drawer and portal chrome | Header, mobile drawer, footer, portal top bar, portal login |
| **Nav link** | Default, hover/active (gold underline) | Header, mobile drawer, footer link columns |
| **Eyebrow label** | Gold (on dark), Terracotta (on light), Navy | Section intros throughout |
| **Micro-label** | Single style, grey | Stat cells, form labels, small captions |
| **Verification seal** | Verified (green dot, gold dashed border, "Title verified"), Pending (terracotta dot/border/text, "Verification in progress") | Listing cards, listing detail cover, home hero card |
| **Placeholder image** | Light variant, dark variant; always paired with a mono caption | Every image slot in the product |
| **Listing card — vertical** | Single variant | Home featured grid |
| **Listing card — horizontal** | Single variant | Opportunities list |
| **Data cell / stat pattern** | Appears with slightly different markup as: home data-strip cell, listing-detail stats-strip cell, market-hub index-cell, portal stat-card, about-stats cell, portal-login stat figure — **all are the same underlying pattern (micro-label + big mono value + optional delta) and should be built as one Figma component with variants**, not six separate ones | Home, Listing Detail, Market Hub, Portal Dashboard, About, Portal Login |
| **Line chart** | Dark-background axis style vs. light-background axis style; solid series vs. dashed series; single- or dual-series | Market band (home), Listing Detail, Price Check, Portal Dashboard watchlist |
| **Sparkline** | Single style, tiny inline | Listing cards |
| **Bar-track row** | Single style (label + progress-bar + mono value) | Home market band district comparison |
| **Verification stage card** | Numbered 01/02/03, gold top rule | Home verification band |
| **Table** | Documentation table (2-col, status pills); Price table (4-col, district data) | Listing Detail, Market Hub |
| **Status word / pill** | Status-word (Verified/In progress/Pending — used in the doc table); Pill (Gold/Navy/Green/Grey/Terracotta — used in portal record lists); Dev-badge (green "Verified Partner") — **three separate pill components with overlapping but not identical color logic; worth consolidating into one pill component with a color prop when rebuilt** | Listing Detail, Portal Inquiries, Portal Documents, Listing Detail sidebar |
| **Filter rail** | Single variant | Opportunities |
| **Form field** | Text input, select, textarea, date input, number input, checkbox — all share one label + input visual style | Contact, Price Check, Listing Detail sidebar, Portal Login, Portal Documents upload |
| **Tabs** | Two-tab underline style, no icons | Contact page |
| **Mode-select chip** | Default, selected (filled navy) | Contact page inspection tab |
| **Sidebar card** | Generic bordered white container — reused directly (not just visually similar) as the advisor card, developer card, office card, report card, and price-check form card | Listing Detail, Market Hub, Contact, Price Check |
| **Disclaimer box** | Single variant, mist background, terracotta mark | Listing Detail |
| **CTA strip (navy)** | Single variant, heading+copy left / button right | Price Check |
| **Deal tracker (stepper)** | 3 stage states: done (green), current (gold + halo), remaining (grey) — no off-the-shelf equivalent, must be custom-built | Portal Dashboard |
| **Watchlist card** | Single variant | Portal Dashboard |
| **Record list item** | Shared pattern, differs only in which pill-color set applies | Portal Inquiries, Portal Documents |
| **Upload card** | Single variant | Portal Documents |
| **Footer newsletter form** | Single variant, dark | Footer |
| **Burger button / mobile drawer** | Closed, open | Header (<1080px) |

---

## 5. Recommended Figma import workflow

There is no plugin that turns arbitrary CSS custom properties, media queries, and hand-written SVG charts into clean Figma variables, components, and variants — anything that promises a perfect one-shot conversion will produce flattened, non-editable geometry at best. The realistic workflow:

1. **Use [html.to.design](https://html.to.design)** (by divRIOTS) as a geometry-only starting scaffold, not a final import. It's the most actively maintained HTML/CSS → Figma plugin and works two ways:
   - **Live URL mode** — point it at a hosted version of the prototype (even a throwaway static host or a Vercel preview once the real Next.js app exists) and it will import a given page's real, rendered DOM.
   - **Browser-extension capture mode** — with the companion Chrome extension, capture whatever is currently rendered in an open browser tab. **This is the mode you need for this prototype specifically**, because `index.html` is a single-page app using hash-based client-side routing (`#opportunities`, `#listing?id=1`, etc.) rather than distinct server URLs — a plain URL-mode crawl will only ever discover the Home screen. Instead: open the prototype locally, click to each of the 13 screens one at a time, and run a capture at each one. Do the same at 1440px and again at 375px viewport width to pull in both the desktop and mobile geometry.
2. **After each import, throw away the layer names and structure html.to.design generates**, and rebuild using this document: create Figma **Variables** for every token in Section 1.1 (colors) and 1.4 (the single radius value), **Text Styles** for every row in the 1.2 typography tables, and **Effect Styles** for the four shadow values in 1.5. The import is only useful for getting spacing and proportions right at a glance — treat its actual layers as tracing paper, not a deliverable.
3. **Build the Section 4 component list as real Figma components with variants** (especially the button, pill, and data-cell patterns flagged above as currently-inconsistent-in-code) rather than recreating each one-off instance separately — this is a chance to *improve* on the code's repetition, not just mirror it.
4. Once the real Next.js application exists (post-scaffold), re-run step 1 in **live URL mode** against real deployed routes instead of the static prototype — genuinely distinct URLs per screen will capture far more reliably than hash-routing capture-by-hand, and is worth re-doing even if the static-prototype import already happened.
5. Import `logo.png` directly as an image asset — it's a fixed raster mark, not something to redraw as vector.
