import type { CollectionConfig } from 'payload'

// FR-303. Six Abuja districts at launch (Maitama, Asokoro, Jabi, Gwarinpa,
// Lugbe, Kuje) — but this collection, not a hardcoded list, is the real
// source of truth. Adding a new district is a content change, not a code
// change (see docs/walkthrough-for-developer.md Section 7, Recipe 4).
export const Districts: CollectionConfig = {
  slug: 'districts',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Prime', value: 'prime' },
        { label: 'Suburban', value: 'suburban' },
      ],
      admin: {
        description:
          'Drives the two-series prime-vs-suburban chart on Home and the index figures on the Market Hub (FR-104, FR-402).',
      },
    },
  ],
}
