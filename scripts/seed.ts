/**
 * Seeds the database with realistic Abuja-specific sample data — the same
 * fictional content already used throughout index.html, docs/FSD.md,
 * docs/user-stories.md, and docs/use-cases.md, so the project describes one
 * consistent fictional reality rather than several.
 *
 * This is demo/reference data, not real content. Every record it creates
 * should be replaced with real listings, real advisors, and real developer
 * partnerships before launch — see docs/project-overview.md, Section 11
 * ("Advisor names, photos, and contact details in the prototype are
 * illustrative, not real staff").
 *
 * Usage: npm run seed
 * Safe to run only once against a fresh database — see the guard below.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function richText(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, version: 1 }],
          direction: 'ltr' as const,
          format: '' as const,
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

const QUARTERS = ["Q4 '25", "Q1 '26", "Q2 '26", "Q3 '26"]

// Land figures below are fictional but no longer hand-guessed — each district's
// current-quarter (Q3 '26) value is anchored to the real median ₦/sqm computed
// from a real Abuja land-listings dataset (nigeriapropertycentre.com, pooled
// across Q2+Q3 2026, outlier-flagged rows excluded, n=35–186 per district).
// This is NOT real listing data being republished — no listing, agency name,
// phone number, or ad copy from that dataset appears anywhere in this product;
// only the aggregate price statistic informs the anchor. The 4-quarter trend
// leading up to each anchor is a smooth, plausible synthetic progression built
// backward from the anchor using each district's original QoQ growth-rate
// assumption — the real per-quarter medians themselves were too noisy at this
// granularity to use directly (see the review that produced this data, not
// duplicated in comments here). `residential` uses each district's original
// residential/land ratio applied to the new anchor, since the source dataset
// is pure land and has no independent developed-residential benchmark.
const DISTRICT_DEFS = [
  { name: 'Maitama', tier: 'prime' as const, land: 1045588, residential: 977066, trend: [934908, 970434, 1007310, 1045588] },
  { name: 'Asokoro', tier: 'prime' as const, land: 784722, residential: 709799, trend: [720227, 741114, 762606, 784722] },
  { name: 'Jabi', tier: 'suburban' as const, land: 501567, residential: 465741, trend: [444608, 462837, 481813, 501567] },
  { name: 'Gwarinpa', tier: 'suburban' as const, land: 144444, residential: 137471, trend: [137726, 139930, 142169, 144444] },
  { name: 'Lugbe', tier: 'suburban' as const, land: 49938, residential: 44797, trend: [42894, 45124, 47470, 49938] },
  { name: 'Kuje', tier: 'suburban' as const, land: 15000, residential: 13421, trend: [12348, 13175, 14058, 15000] },
]

const ADVISOR_DEFS = [
  { key: 'adaeze', name: 'Adaeze Okonkwo', patch: 'Senior Advisor, Prime Districts', phone: '+234 803 555 0142' },
  { key: 'chidi', name: 'Chidi Umeh', patch: 'Advisor, Diaspora Clients', phone: '+234 803 555 0187' },
  { key: 'ifeoma', name: 'Ifeoma Bello', patch: 'Advisor, Commercial & Mixed-Use', phone: '+234 803 555 0219' },
]

const DEVELOPER_DEFS = [
  { key: 'northbridge', name: 'Northbridge Development Co.', delivered: '14 estates delivered since 2011', onSchedule: '96% handovers on schedule' },
  { key: 'crestline', name: 'Crestline Estates', delivered: '9 estates delivered since 2014', onSchedule: '92% handovers on schedule' },
  { key: 'lakeview', name: 'Lakeview Frontier Ltd', delivered: '6 estates delivered since 2017', onSchedule: '89% handovers on schedule' },
  { key: 'capitalreach', name: 'Capital Reach Properties', delivered: '11 estates delivered since 2013', onSchedule: '94% handovers on schedule' },
]

// pricePerSqm below is rescaled from the original fictional value by the
// same factor its district's PriceQuarters anchor moved (see DISTRICT_DEFS
// above), so each listing stays plausibly close to its district average
// rather than reading as randomly over/under-priced after the anchor update.
const LISTING_DEFS = [
  {
    title: 'Diplomatic Close Plot', category: 'residential-land' as const, district: 'Maitama',
    size: 512, pricePerSqm: 1020000, plan: true, advisor: 'adaeze', developer: 'northbridge',
    useCase: "A 512 sqm plot inside Maitama's diplomatic zone, positioned for a private residence or embassy-adjacent lease. Structures in this axis have cleared upward of ₦950,000 per sqm on resale within 24 months of a completed build.",
    docs: { cofo: 'verified', survey: 'verified', registry: 'verified', deed: 'verified' } as const,
  },
  {
    title: 'Asokoro Hillside Residence', category: 'developed-residence' as const, district: 'Asokoro',
    size: 465, pricePerSqm: 785000, plan: false, advisor: 'chidi', developer: 'crestline',
    useCase: 'A completed five-bedroom residence with staff quarters and a private drive, finished in 2023. Suited to owner-occupation or a diplomatic-adjacent lease — comparable Asokoro leases run ₦18m–₦24m per annum.',
    docs: { cofo: 'verified', survey: 'verified', registry: 'verified', deed: 'verified' } as const,
  },
  {
    title: 'Jabi Waterfront Commercial Plot', category: 'commercial-plot' as const, district: 'Jabi',
    size: 323, pricePerSqm: 473000, plan: true, advisor: 'ifeoma', developer: 'lakeview',
    useCase: 'Fronting the Jabi Lake axis with retail and hospitality precedent nearby. Registry search on the parent title is underway — we do not advise a deposit until it clears.',
    docs: { cofo: 'verified', survey: 'verified', registry: 'progress', deed: 'pending' } as const,
  },
  {
    title: 'Gwarinpa Family Estate Plot', category: 'residential-land' as const, district: 'Gwarinpa',
    size: 644, pricePerSqm: 141000, plan: true, advisor: 'adaeze', developer: 'northbridge',
    useCase: 'A corner plot in a gated Gwarinpa estate with existing road and drainage infrastructure already in place. Common among first-time diaspora buyers building toward retirement or rental income.',
    docs: { cofo: 'verified', survey: 'verified', registry: 'verified', deed: 'verified' } as const,
  },
  {
    title: 'Lugbe Growth Corridor Plot', category: 'residential-land' as const, district: 'Lugbe',
    size: 328, pricePerSqm: 43000, plan: true, advisor: 'chidi', developer: 'capitalreach',
    useCase: "Positioned along the airport road growth corridor, ahead of the district's five-year infrastructure plan. Entry-level pricing for investors building a first Abuja position.",
    docs: { cofo: 'verified', survey: 'verified', registry: 'verified', deed: 'verified' } as const,
  },
  {
    title: 'Kuje Frontier Acreage', category: 'residential-land' as const, district: 'Kuje',
    size: 718, pricePerSqm: 16000, plan: false, advisor: 'ifeoma', developer: 'capitalreach',
    useCase: "A larger frontier plot suited to a phased self-build or land-banking position ahead of Kuje's projected road expansion.",
    docs: { cofo: 'verified', survey: 'verified', registry: 'verified', deed: 'verified' } as const,
  },
]

const ARTICLE_DEFS = [
  {
    title: 'C of O vs R of O: what diaspora buyers confuse most',
    body: "A Certificate of Occupancy (C of O) is issued directly by the state; a Right of Occupancy (R of O) is what a local government area grants ahead of full state conversion. Buyers from abroad often assume the two are interchangeable — they are not, and the difference affects what a title actually guarantees.",
  },
  {
    title: "How Governor's Consent works — and why it takes time",
    body: "Any transfer of land already under a Certificate of Occupancy requires the sitting Governor's Consent before the deed of assignment is valid. The process routes through the Land Registry and can take weeks, which is why a firm timeline before consent is granted should be treated as an estimate, not a promise.",
  },
  {
    title: 'Reading a survey plan before you commit',
    body: 'A survey plan shows beacon coordinates, plot dimensions, and whether the parcel has been excised from a larger gazetted holding. Matching it against the physical plot — not just the paperwork — is the second of our three verification stages.',
  },
]

async function main() {
  const payload = await getPayload({ config })

  const existing = await payload.find({ collection: 'districts', limit: 1 })
  if (existing.totalDocs > 0) {
    console.log('Districts already has data — aborting to avoid duplicate seeding.')
    console.log('This script is intended for a fresh database. Clear the tables first if you want to re-seed.')
    process.exit(1)
  }

  console.log('Seeding districts...')
  const districts: Record<string, { id: string | number }> = {}
  for (const d of DISTRICT_DEFS) {
    districts[d.name] = await payload.create({
      collection: 'districts',
      data: { name: d.name, tier: d.tier },
    })
  }

  console.log('Seeding price-quarters...')
  for (const d of DISTRICT_DEFS) {
    const residentialTrend = d.trend.map((v) => Math.round(v * (d.residential / d.land)))
    for (let i = 0; i < QUARTERS.length; i++) {
      const qoq = i === 0 ? undefined : Number((((d.trend[i] - d.trend[i - 1]) / d.trend[i - 1]) * 100).toFixed(1))
      await payload.create({
        collection: 'price-quarters',
        data: {
          district: Number(districts[d.name].id),
          quarter: QUARTERS[i],
          land: d.trend[i],
          residential: residentialTrend[i],
          qoq,
        },
      })
    }
  }

  console.log('Seeding advisors...')
  const advisors: Record<string, { id: string | number }> = {}
  for (const a of ADVISOR_DEFS) {
    advisors[a.key] = await payload.create({
      collection: 'advisors',
      data: { name: a.name, patch: a.patch, phone: a.phone },
    })
  }

  console.log('Seeding developers...')
  const developers: Record<string, { id: string | number }> = {}
  for (const dv of DEVELOPER_DEFS) {
    developers[dv.key] = await payload.create({
      collection: 'developers',
      data: { name: dv.name, delivered: dv.delivered, onSchedule: dv.onSchedule, verifiedPartner: true },
    })
  }

  console.log('Seeding listings...')
  const listings: Record<string, { id: string | number }> = {}
  for (const l of LISTING_DEFS) {
    listings[l.title] = await payload.create({
      collection: 'listings',
      data: {
        title: l.title,
        category: l.category,
        district: Number(districts[l.district].id),
        size: l.size,
        pricePerSqm: l.pricePerSqm,
        status: 'published',
        plan: l.plan,
        docs: l.docs,
        useCase: richText(l.useCase),
        advisor: Number(advisors[l.advisor].id),
        developer: Number(developers[l.developer].id),
      },
    })
  }

  console.log('Seeding articles...')
  for (const a of ARTICLE_DEFS) {
    await payload.create({
      collection: 'articles',
      data: { title: a.title, slug: slugify(a.title), body: richText(a.body) },
    })
  }

  console.log('Seeding inquiries...')
  const inquiryDefs = [
    {
      type: 'inspection' as const, listing: 'Jabi Waterfront Commercial Plot', status: 'advisor-assigned' as const,
      mode: 'virtual' as const, timezone: 'GMT/BST (UK)', preferredDate: '2026-08-09', advisor: 'ifeoma',
    },
    {
      type: 'general' as const, listing: undefined, status: 'closed' as const,
      mode: undefined, timezone: undefined, preferredDate: undefined, advisor: undefined,
    },
    {
      type: 'inspection' as const, listing: 'Gwarinpa Family Estate Plot', status: 'in-review' as const,
      mode: 'representative' as const, timezone: 'GMT/BST (UK)', preferredDate: '2026-07-25', advisor: 'adaeze',
    },
    {
      type: 'general' as const, listing: undefined, status: 'closed' as const,
      mode: undefined, timezone: undefined, preferredDate: undefined, advisor: undefined,
    },
  ]
  for (const iq of inquiryDefs) {
    await payload.create({
      collection: 'inquiries',
      data: {
        type: iq.type,
        name: 'Efe Omorogbe',
        phone: '+44 7700 900142',
        email: 'efe.omorogbe@example.com',
        basedIn: 'United Kingdom',
        listing: iq.listing ? Number(listings[iq.listing].id) : undefined,
        preferredDate: iq.preferredDate,
        mode: iq.mode,
        timezone: iq.timezone,
        consent: true,
        status: iq.status,
        advisor: iq.advisor ? Number(advisors[iq.advisor].id) : undefined,
      },
    })
  }

  console.log('Seed complete: 6 districts, 24 price-quarters, 3 advisors, 4 developers, 6 listings, 3 articles, 4 inquiries.')
  console.log('Not seeded: users (create your own via /admin), media (no real photography yet).')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
