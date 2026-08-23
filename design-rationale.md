# Terrace & Title — Design System Rationale

This document accompanies the clickable prototype at `index.html`. It explains the *why* behind the system, not the *what* — the screens speak for themselves.

## The core bet: data is the trust device, not the product

Terrace & Title sells advisory, not a listings portal. But nobody trusts an advisor they haven't vetted, and in Nigerian real estate the usual proof points — glossy renders, "verified" badges with no evidence behind them — have been devalued by overuse. So the system inverts the usual funnel: **pricing data is public on every page, never behind a sign-up gate**, and its job is to earn enough credibility that the reader will book a call. The call is the only thing being sold. This is why the price-check tool hands over a real number before asking for anything, why the market hub's full table is visible without a login, and why every data-heavy band ends in "speak to an advisor" rather than "download" or "sign up."

## The mark: a monogram, not a wordmark stand-in

The logo is a gold-and-navy "T" motif built from the same two structural colors as everything else, which is why it drops into the header, the mobile drawer, and the navy footer without ever needing a reversed or mono variant — the gold reads on navy, the navy reads on white, and the shape (a roofline over twin verticals) echoes the skyline-and-house language the rest of the system already leans on for real estate without resorting to a literal house icon. It sits beside the "Terrace & Title" wordmark rather than replacing it, so the lockup still carries the full name at every size — the mark is a signature, not a rebrand.

## Type: four families, one job each

- **Source Serif 4** carries every heading. It's the one place the brand is allowed to feel like an institution rather than a product — editorial weight, not corporate sans. It replaced Playfair Display for the same reason Playfair was chosen in the first place: a text serif with real optical weight at large sizes, but Source Serif 4's slightly sturdier, less decorative letterforms read as calmer and more contemporary against the gold-and-navy mark, and its variable-font italic (used for the footer tagline and the portal login statement) is a true cut rather than a mechanical slant.
- **Geist** does the invisible work: body copy, labels, form fields, buttons. It should never be noticed. It replaced Inter as the house grotesk mainly for its slightly more geometric, less humanist skeleton — a small shift that keeps the UI feeling closer to the mono numerals it sits beside, without asking the reader to consciously register a font change.
- **Manrope**, uppercase and heavily tracked, is reserved for eyebrows and micro-labels. It's the smallest font on the page by design — a whisper of taxonomy, not a shout.
- **IBM Plex Mono** is the load-bearing decision in this system. Every number — naira figures, ₦/sqm, sizes, dates, chart axes — is set in it, with nothing else competing for that treatment. In a market where sellers round numbers to sound impressive, a monospaced figure reads as *measured*, not marketed. It is the single strongest visual signal that this firm treats data as evidence, and it's applied with zero exceptions so the pattern stays legible.

## Color: navy for trust, gold for evidence, terracotta for honesty

Navy is the institutional base — headings, primary actions, the portal shell. Gold is reserved for data itself: the verification seal, chart lead-series, CTA on data-heavy bands. It never appears as pure decoration, so when it shows up the reader has learned to expect a number or a claim worth checking. Green is earned, not default — it only marks a positive delta or a cleared verification stage. Terracotta is the system's honesty color: warning marks, "verification in progress" seals, and the sign-out link all sit in the same warm, slightly uncomfortable red-brown, because admitting a title search isn't finished yet is the same *kind* of move as flagging a disclaimer. Two supporting neutrals — a warm paper tone for the portal login and hero backgrounds, and a muted grey for micro-labels — round out the palette without opening it up.

## 2px radius: architectural, not app-like

Every corner in this system is nearly square. That's a deliberate rejection of the rounded, friendly-SaaS default that most fintech and proptech products reach for. Real estate at this price point is closer to private banking than to a consumer app — the geometry says "survey plan," not "onboarding flow."

## The verification seal is a claim with three receipts

Rather than a single trust badge, the system breaks verification into three numbered, inspectable stages (document search, physical inspection, developer standing) and *shows the same seal component in a pending state* when a title hasn't cleared. This is the clearest expression of the brand voice brief — educational and confident because it explains its own process, never pushy because it says "not yet" out loud when that's the truth.

## Diaspora buyers shaped three specific decisions

Because a meaningful share of the audience cannot physically visit a plot, "virtual inspection" isn't a footnote — it's a first-class option on the contact form (with a line explaining exactly how a surveyor-led video walkthrough works), a timezone field sits next to the preferred-date picker, and the portal dashboard leads with a five-stage deal tracker precisely because a buyer managing a purchase from London or Houston needs to see where a document-chain step is stuck without calling to ask.

## Navigation had to solve mobile from zero

The brief was explicit that the source site has no mobile nav at all. The burger drawer here is full-width, on the paper background (not an overlay scrim), and carries the complete nav list plus both header CTAs — nothing is dropped on the way down to a phone.

## What's deliberately thin

About, Services, and the three secondary portal screens are built but intentionally lighter — same components, less bespoke content — because the brief prioritized the seven screens that carry the actual sales argument. Any nav destination outside the built set (Careers, Press, FAQs, etc.) resolves to a labelled placeholder inside the full site shell rather than a dead link or blank page.
