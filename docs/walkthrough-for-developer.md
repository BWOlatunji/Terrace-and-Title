# Developer Walkthrough — Terrace & Title Web App

*Explain it like I'm 5. Written for someone who can already write some code, but has never touched Next.js, Payload CMS, or Postgres before.*

> **Where this document sits in time:** the Phase 1 scaffold now exists — the application boots, the design tokens are wired into Tailwind, and all nine collections are defined in code (see `docs/product-owner/product-backlog.md`, Epic A/PBI-001–003). What's described below matches that real structure. The public-facing pages themselves (Home, Opportunities, Listing Detail, and the rest) are still ahead — right now the `(site)` route group contains one placeholder page proving the wiring works, not the finished screens. If this document and the real repo ever disagree, the repo is correct and this document needs fixing, not the other way round.

---

## 1. What is this app, in one paragraph

Terrace & Title's web app is the online home of a real estate advisory firm in Abuja, Nigeria. Its job is to publish trustworthy, regularly-updated property price data for six Abuja districts, show a small number of verified property listings with their title-document status made visible rather than hidden, let a visitor estimate what a plot in a given district is worth, and then turn all of that credibility into one action: booking a call with a human advisor. A second, later phase adds a private "portal" area where existing clients can log in and track the paperwork on a property they're actually buying. Nothing about pricing is ever hidden behind a signup — the data is the proof, and the advisor call is the product.

---

## 2. The big picture

Think of the whole system as a restaurant. You (the visitor) sit at a table and order food. You never walk into the kitchen yourself — a waiter takes your order back, the kitchen cooks it using ingredients from the pantry, and the waiter brings the finished plate back to you. Every technical piece below maps onto a role in that restaurant, and I'll define each unfamiliar term the first time it comes up.

```
 YOU (on a phone or laptop)
       │
       │ 1. You type terraceandtitle.com and hit Enter
       ▼
 ┌───────────────────────────┐
 │         BROWSER            │   Chrome, Safari, etc. — the "dining room."
 │                             │   It only knows how to display what it's handed.
 └─────────────┬───────────────┘
               │ 2. Browser asks the internet for the page
               ▼
 ┌─────────────────────────────────────────────────────────────────┐
 │                  NEXT.JS  (hosted on Vercel)                     │
 │                                                                   │
 │  ┌───────────────────────┐        ┌───────────────────────────┐  │
 │  │      FRONTEND           │        │        BACKEND             │  │
 │  │  (what you see —        │◄──────►│  (Payload CMS logic,       │  │
 │  │   the "dining room       │  3.    │   running inside the       │  │
 │  │   layout," built in       │  the    │   same Next.js app —      │  │
 │  │   React)                 │  waiter │   the "kitchen")           │  │
 │  └───────────────────────┘  takes   └──────────────┬────────────┘  │
 │                              the order              │               │
 └──────────────────────────────────────────────────┼───────────────┘
                                                       │ 4. "Fetch me every
                                                       │    verified listing
                                                       │    in Maitama"
                                                       ▼
                                    ┌────────────────────────────────┐
                                    │     POSTGRESQL DATABASE          │
                                    │  (Neon, via Vercel Storage)      │
                                    │                                  │
                                    │  The actual filing cabinet.       │
                                    │  Every listing, price entry,      │
                                    │  and inquiry lives here as        │
                                    │  rows in labeled drawers.         │
                                    └────────────────────────────────┘

        Two more rooms down the hall, used only when a specific
        order calls for them:

 ┌───────────────────────────┐        ┌───────────────────────────┐
 │      CLOUDFLARE R2           │      │         RESEND               │
 │  A separate storage closet    │      │  The restaurant's phone —     │
 │  for photos and uploaded       │      │  used to call/email a         │
 │  documents. Kept apart from     │      │  customer after they place    │
 │  the filing cabinet because      │      │  an order (a form submission). │
 │  images are big and don't        │      │                                │
 │  belong mixed in with data.       │      │                                │
 └───────────────────────────┘        └───────────────────────────┘
```

A few terms from that diagram, defined once, used from here on without re-explaining:

- **Frontend** — the part of the app that draws pixels on your screen and reacts to clicks. This is the "dining room": what the customer actually sees and touches.
- **Backend** — the part of the app that does the thinking, remembers things, and decides what's allowed. This is the "kitchen": the customer never sees it directly, only its output.
- **Framework** — a pre-built toolkit that hands you the common, boring parts of building software so you don't reinvent them. Buying a flat-pack furniture kit instead of milling your own lumber. **Next.js** is our frontend-and-backend framework; **Payload CMS** is our backend/content-management framework, and it runs *inside* Next.js rather than as a separate restaurant next door.
- **Database** — the filing cabinet. A structured place where information is stored in labeled drawers (called **tables**) so it can be found again later. Ours is **PostgreSQL** ("Postgres" for short), run by a provider called **Neon** and provisioned through Vercel's own dashboard rather than as a separate account.
- **Server** — an always-on computer somewhere else (in our case, run by Vercel) that sits waiting for requests like "give me the homepage" and answers them. You never see it; you only see what it sends back.
- **API** ("Application Programming Interface") — the waiter. A defined, agreed way for two pieces of software to ask each other for things without needing to understand each other's internals. When the frontend wants listings, it doesn't touch the database itself — it asks the backend, which is the only one allowed near the filing cabinet.
- **CMS** ("Content Management System") — a system that gives non-developers a form-based way to add or edit content (a new listing, a new quarter's prices) without touching code. **Payload** is ours — it's the kitchen's recipe binder *and* the pantry organizer in one.

---

## 3. The folders, one by one

This is the folder structure we are building to, in the order a new developer actually needs to understand it — not alphabetical order.

```
terrace-and-title/                (the repo root — also where index.html, logo.png, and
│                                   docs/ from the earlier design phase still live)
├── package.json               ← the shopping list: every external library the project needs
├── .env.local                 ← secrets (passwords, API keys) — never committed to git
├── next.config.ts             ← settings for Next.js itself, wrapped with Payload's own
│                                  `withPayload()` — this is what wires the two together
├── tailwind.config.ts         ← the brand's design tokens (colors, radius, fonts) as code
├── tsconfig.json               ← TypeScript settings, including the `@/*` and
│                                  `@payload-config` shortcuts used throughout src/
│
└── src/                        ← almost everything else lives here — this is Payload's own
    │                              standard convention, not a choice specific to us
    │
    ├── payload.config.ts       ← the master control file: wires Payload to Postgres and
    │                              every collection (see below)
    │
    ├── collections/            ← the blueprints for every "drawer" in the filing cabinet
    │   ├── Listings.ts
    │   ├── Districts.ts
    │   ├── PriceQuarters.ts
    │   ├── Advisors.ts
    │   ├── Developers.ts
    │   ├── Articles.ts
    │   ├── Inquiries.ts
    │   ├── Media.ts
    │   └── Users.ts
    │
    └── app/                    ← every page and backend route, using Next.js's
        │                          "App Router" (the routing system this framework uses —
        │                          the folder structure itself IS the URL structure)
        │
        ├── (site)/             ← a "route group": a folder whose name is in parentheses,
        │   │                      which Next.js uses to organize files WITHOUT it becoming
        │   │                      part of the actual web address. Purely for our own tidiness.
        │   ├── layout.tsx       ← the outer frame every public page sits inside — this is
        │   │                      where the four brand fonts are loaded and wired to
        │   │                      Tailwind (see Section 7, Recipe 2)
        │   ├── globals.css      ← Tailwind's base styles
        │   ├── page.tsx         → terraceandtitle.com/  — currently a placeholder proving
        │   │                      the scaffold works, not the real Home page yet (that's
        │   │                      PBI-010 in the backlog)
        │   │
        │   │   (not yet built — each becomes its own folder here as its backlog item
        │   │    is picked up: opportunities/, market/, price-check/, about/, services/,
        │   │    contact/, and a (portal)/ route group for Phase 2)
        │   │
        │   └── actions/         ← Server Actions: functions that run on the backend but
        │                           can be called directly from a form on the frontend,
        │                           without us hand-building an API route for every form.
        │                           (More on this in Section 5. Not yet built.)
        │
        └── (payload)/           ← auto-generated by Payload itself. This is where the
            ├── admin/            /admin editing interface lives, and where Payload's own
            └── api/              API routes live. We configure it once and otherwise leave
                                   it alone (see Section 8) — every file in here starts with
                                   a comment saying exactly that.
```

**`components/` and `lib/` don't exist yet.** They'll appear under `src/` the moment the first reusable piece of UI or helper function is written — no need to scaffold empty folders ahead of time.

**Why this order matters for learning it:** `package.json` and `.env.local` first because nothing runs without them. `src/collections/` next because they define *what data exists* — everything else is either displaying that data or collecting more of it. `src/app/` next because that's where you'll spend most of your day-to-day time. Everything under `(payload)/` last, and mostly to be skipped over — it's generated, not written.

---

## 4. How to run this on your computer

Follow these in order. Each step says what to do if it fails.

**Step 1 — Install Node.js.**
Node.js is the program that lets JavaScript run outside a browser, on your own computer — it's what actually executes all this code. Install version 20 or later from nodejs.org.
*If it fails:* run `node -v` in your terminal afterward. If you see a version number starting with anything below 20, uninstall and reinstall using the current LTS ("Long-Term Support") release.

**Step 2 — Get the code onto your computer.**
```bash
git clone <repository-url>
cd terrace-and-title
```
*If `git clone` fails with a permissions error,* you likely haven't been added as a collaborator on the repository yet — ask whoever manages the GitHub organization to add your account.

**Step 3 — Install the project's dependencies.**
A **dependency** is a piece of code someone else wrote that our project relies on instead of rewriting from scratch (Next.js and Payload are both dependencies). `package.json` is the shopping list; this command does the actual shopping.
```bash
npm install
```
This downloads everything listed in `package.json` into a folder called `node_modules`. It can take a couple of minutes the first time.
*If it fails* with an error mentioning a specific package, first try deleting the `node_modules` folder and the `package-lock.json` file, then run `npm install` again. If it still fails, check that your Node.js version matches what Step 1 asked for.

**Step 4 — Set up your secrets file.**
Copy the example environment file:
```bash
cp .env.example .env.local
```
An **environment variable** is a piece of configuration (usually a password or a key) that lives *outside* the code, so it can differ between your computer and the live site, and so it never gets accidentally committed to git and leaked publicly. Open `.env.local` and fill in:

| Variable | What it is | Where to get it |
|---|---|---|
| `DATABASE_URI` | The address and password for our Postgres database | Vercel dashboard → the project → Storage tab → the Neon database → "Connection string" |
| `PAYLOAD_SECRET` | A random password Payload uses to encrypt admin sessions | Make up any long random string yourself for local dev |
| `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Credentials for the photo/document storage closet | Cloudflare dashboard → R2 → "Manage API tokens" |
| `RESEND_API_KEY` | Lets the app send confirmation emails | resend.com dashboard → API Keys |

*If you don't have access to any of these accounts,* ask whoever administers the project's Vercel, Cloudflare, and Resend accounts to invite you or hand you dev-only credentials — don't use production keys on your own machine.

**Step 5 — Set up your database.**
Our Postgres database runs on **Neon**, but it's provisioned *through* Vercel rather than as a separate neon.tech account — Vercel's dashboard has a "Storage" tab where you connect a database from a list of partners, and Neon is one of them. Provisioning it this way means one bill, one dashboard, and environment variables that get wired into the app automatically, instead of a second, separate account to manage. In the Vercel project's Storage tab, connect a Neon database (the free tier is enough for local development). Neon's standout feature is **branching**: like a git branch, but for your database — you can spin up an isolated copy of the whole filing cabinet for testing, then throw it away, without touching the real one. Once it's connected, copy the connection string into `DATABASE_URI` from Step 4.

**Step 6 — Create the database's structure.**
```bash
npm run migrate
```
A **schema** is the blueprint of what the filing cabinet's drawers look like — which drawers exist, and what kind of information goes in each one. A **migration** is a saved, replayable set of instructions for changing that blueprint (e.g. "add a new drawer called Districts") without losing anything already filed. This command reads our collection files (see Section 3) and builds the matching tables in your database.
*If it fails* with a connection error, double check `DATABASE_URI` in `.env.local` — this is the single most common thing to get wrong on a first setup.

**Step 7 — Start the app.**
```bash
npm run dev
```
This starts a local server on your own computer. Leave this terminal window running.
*If it fails* saying "port 3000 already in use," something else on your computer is already using that address — either close that other program, or run `npm run dev -- -p 3001` to use a different port.

**Step 8 — Open it in your browser.**
Go to `http://localhost:3000` — that should show the homepage. Go to `http://localhost:3000/admin` and you'll be prompted to create the first admin user, since the database is empty. Do that, and you're in the CMS.

---

## 5. How a single feature works, start to finish

Three real features, each traced from a user's click all the way down to the database and back.

### Feature A — The "Book an inspection" lead-capture form

1. **The browser (`app/(site)/contact/page.tsx`)** renders the Contact page, which includes a `<ContactForm>` component from `components/`. This is a **Client Component** — meaning, unusually for this framework, it runs a little bit of JavaScript *in the visitor's browser* (to switch between the "General inquiry" and "Book an inspection" tabs instantly, without reloading the page).
2. The visitor fills in their name, phone, chooses "Book an inspection," picks a property, a date, and a mode (in person / virtual / representative), and clicks **Send inquiry**.
3. That button submission is wired to a **Server Action** — a function written in `app/actions/createInquiry.ts` that *looks* like a normal function you call from the frontend, but Next.js actually runs it on the server, not in the browser. This is what saves us from hand-building a traditional API route for every single form on the site.
4. Inside `createInquiry.ts`, we call Payload's built-in method to create a new record: `payload.create({ collection: 'inquiries', data: {...} })`.
5. Payload validates the data against the blueprint in `collections/Inquiries.ts` (e.g. checks that `email` looks like an email) and, if it's valid, writes a new row into the `inquiries` table in Postgres.
6. Once that write succeeds, a **hook** defined in `collections/Inquiries.ts` — a small function Payload automatically runs "after this record is created" — fires an email through Resend: a confirmation to the visitor, and a notification to the assigned advisor. (Note: "hook" here means "a function that runs automatically when something happens," which is a different meaning from a *webhook*, which is one system calling another system's API over the internet — Meta's WhatsApp integration in Phase 2 will be a webhook.)
7. The Server Action returns a success message back to the browser, and the Client Component swaps the button's label to "Sent — an advisor will reach out shortly," exactly as the static prototype already does.
8. Separately, that same new row is now sitting in the `inquiries` table, which is also what powers the **Inquiries** list in the client portal later — the public form and the portal are reading and writing the same filing-cabinet drawer.

### Feature B — The Opportunities filter rail

1. A visitor goes to `/opportunities`. `app/(site)/opportunities/page.tsx` is a **Server Component** (the default in this framework — it runs on the server, before anything is sent to the browser). It calls `payload.find({ collection: 'listings', where: { status: { equals: 'published' } } })` to fetch every published listing directly from Postgres.
2. That full list of listings is handed, as a prop, to a Client Component called `<FilterableListings>`. This is the one part of the page that needs to run in the browser, because filtering (by category, district, price range, checkboxes) has to feel instant as the visitor clicks — no round trip to the server for every checkbox toggle.
3. `<FilterableListings>` keeps the currently-selected filters in **state** (React's term for "a value the component remembers and re-renders itself when it changes") and re-filters the already-fetched array in memory every time a filter changes — the same logic as the static prototype's `wireOpportunitiesFilters` function, just running inside React instead of hand-written DOM manipulation.
4. Nothing is written back to the database in this feature — it's pure read-and-display, which is why it's safe and fast to do entirely in the browser once the initial list has been fetched.

### Feature C — An advisor updates a quarter's prices, and the live site changes

This is the feature that makes the "data is the product" claim real, so it's worth tracing carefully.

1. An advisor logs into `/admin` (Payload's auto-built editing interface) and opens the custom "Quarterly Prices" grid view (see Section 7, recipe 4, for how this view gets built).
2. They update Maitama's land price for Q3 2026 and click Save.
3. Payload writes the change to the `price_quarters` table in Postgres.
4. A hook on `collections/PriceQuarters.ts`, defined for exactly this purpose, calls a Next.js function called `revalidateTag('market-data')`. **Revalidation** is how this framework invalidates its own cache — normally, to keep pages fast, Next.js *remembers* (caches) a rendered page instead of rebuilding it on every single visit; revalidation is the signal that says "actually, throw away what you remembered, the underlying data changed."
5. The next time anyone requests the Home page, the Market Hub, or the Price Check tool — all of which are tagged `market-data` when they fetch — Next.js rebuilds that page fresh from Postgres instead of serving the old cached version.
6. The advisor did not touch a single line of code, and no one had to redeploy the app. That's the entire point of putting the data in a CMS instead of hardcoding it in a JavaScript file, the way the original static prototype did.

---

## 6. Where things live — glossary

| Concept | Plain-English explanation | File(s) |
|---|---|---|
| Collection | A blueprint for one "drawer" of data (e.g. all Listings) | `collections/*.ts` |
| Route / page | One URL a visitor can go to | `app/**/page.tsx` |
| Route group | A folder in parentheses that organizes files without becoming part of the URL | `app/(site)/`, `app/(portal)/` |
| Server Component | Code that runs on the server before the page is sent to the browser (the default) | most files in `app/` |
| Client Component | Code that runs in the visitor's own browser, for instant interactivity | files starting with `"use client"`, mostly in `components/` |
| Server Action | A function you call like normal code, but which actually runs on the server — used for form submissions | `app/actions/*.ts` |
| Middleware | A checkpoint that inspects a request before it's allowed to reach a page — used to check "is this visitor logged in?" before letting them see the portal | `middleware.ts` (added in Phase 2) |
| Hook (Payload) | A function Payload runs automatically after something happens to a record (e.g. "after an Inquiry is created, send an email") | inside each file in `collections/` |
| Webhook | One system calling another system's API automatically when an event happens (different from a Payload hook above) | Phase 2, WhatsApp integration |
| Migration | A saved, replayable instruction for changing the database's structure | auto-generated, in a `migrations/` folder |
| Environment variable | A secret or setting kept outside the code | `.env.local` (never committed) |
| Design token | A named value (a color, a radius, a font) used consistently instead of hardcoding it everywhere | `tailwind.config.ts` |

---

## 7. Common things you'll need to change

**Recipe 1 — Add a new field to a listing (e.g. "number of bedrooms")**
1. Open `collections/Listings.ts`.
2. Find the `fields: [...]` array and add a new entry, e.g. `{ name: 'bedrooms', type: 'number' }`.
3. Save the file. Payload will detect the change next time you run the dev server and prompt you to generate a migration:
   ```bash
   npx payload migrate:create
   ```
4. Run `npx payload migrate` to apply it to your local database.
5. Add the new field to wherever it should display — most likely `components/ListingCard.tsx` or the listing detail page.

**Recipe 2 — Change a brand color**
1. Open `tailwind.config.ts`.
2. Find the `colors` section — every color from the design system (`navy`, `gold`, `terracotta`, etc.) is defined once, here.
3. Change the hex value. Because every component references the *name* (`navy`) rather than a hardcoded hex code, the color updates everywhere it's used automatically.
4. Do **not** hunt through individual component files looking for hex codes to change by hand — if you find one, that's a bug (see Section 8), not a place to make your edit.

**Recipe 3 — Add a brand-new page**
1. Decide the URL, e.g. `/faqs`.
2. Create a new folder `app/(site)/faqs/` containing a `page.tsx` file.
3. Export a React component from that file — this becomes the page's content.
4. Add a link to it wherever it should appear in navigation (`components/SiteHeader.tsx` and/or `components/SiteFooter.tsx`).

**Recipe 4 — Add a new Abuja district**
1. Log into `/admin`, go to the **Districts** collection, and click "Create New."
2. Fill in the name and tier (prime/suburban).
3. Go to **PriceQuarters** and add an entry linking that new district to the current quarter's numbers.
4. Nothing in the code needs to change — districts are data, not code, which is the entire reason they live in a collection instead of a hardcoded list.

**Recipe 5 — Build a custom admin view (e.g. the quarterly pricing grid)**
1. Create a new React component, e.g. `components/admin/PricingGridView.tsx`.
2. In `payload.config.ts`, under `admin.components.views`, register it against a URL inside `/admin`.
3. Inside the component, use Payload's REST or Local API to read and write `PriceQuarters` records in bulk, the same way any other part of the app would.
4. This is more advanced than the other recipes — pair with someone who's built a Payload custom view before the first time.

---

## 8. What NOT to touch, and why

- **Anything inside `app/(payload)/`.** This is generated and managed by Payload itself when you configure it in `payload.config.ts`. Hand-editing these files is like rewriting a library's internal code instead of just using it — your changes will likely be overwritten, and worse, may silently break the admin panel.
- **The `migrations/` folder's existing files.** Once a migration has run against the real production database, editing that file after the fact doesn't "fix" anything already applied — it just makes your local migration history disagree with production's. If a past migration was wrong, write a *new* migration that corrects it, and never delete or edit an old one that's already been deployed.
- **`payload-types.ts` (or similarly named auto-generated type file).** This file is regenerated automatically from your collection definitions and describes their shape to TypeScript. Hand-editing it is pointless — your edit will vanish the next time it regenerates. If a type looks wrong, the fix belongs in `collections/`, not here.
- **`.env.local` — never commit it.** It should already be listed in `.gitignore` (a file that tells git which files to ignore). If you ever see `.env.local` show up in `git status` as a file about to be committed, stop and figure out why before proceeding — a leaked database password or API key is a serious problem, not a minor one.
- **`package-lock.json`.** This file pins the *exact* version of every dependency so that everyone on the team, and the production server, all install identical code. Don't hand-edit it; let `npm install` manage it. If you need to intentionally upgrade a dependency, use `npm update <package-name>` and commit the resulting change.
- **Postgres tables directly.** Never connect to the production database with a SQL tool and edit rows by hand, even for a "quick fix." Any change to real data should go through Payload (either the admin panel or a script that uses Payload's API), so that hooks fire correctly (e.g. so an email doesn't fail to send because a row appeared without going through the normal creation path) and so there's a record of who changed what and when.
