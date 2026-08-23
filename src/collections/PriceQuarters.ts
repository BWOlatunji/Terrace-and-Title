import type { CollectionConfig } from 'payload'

// FR-304 / FR-305. This is the single most important collection in the
// product — it's the actual content of the "data is the product" claim.
// A district+quarter pair must be unique (see the compound index below),
// per the edge case documented in docs/FSD.md FR-304: a duplicate entry
// should update the existing record, not silently create a conflicting
// second one.
export const PriceQuarters: CollectionConfig = {
  slug: 'price-quarters',
  admin: {
    useAsTitle: 'quarter',
    defaultColumns: ['district', 'quarter', 'land', 'residential', 'qoq'],
    description:
      'Updated every quarter by the named data owner (see docs/project-overview.md Section 9). PBI-305 will add a bulk-entry grid view so all six districts can be updated in one screen instead of one record at a time.',
  },
  access: {
    read: () => true,
  },
  indexes: [
    {
      fields: ['district', 'quarter'],
      unique: true,
    },
  ],
  fields: [
    {
      name: 'district',
      type: 'relationship',
      relationTo: 'districts',
      required: true,
    },
    {
      name: 'quarter',
      type: 'text',
      required: true,
      admin: {
        description: 'Fixed format, e.g. "Q2 2026".',
      },
    },
    {
      name: 'land',
      type: 'number',
      required: true,
      min: 0,
      label: 'Land ₦/sqm',
    },
    {
      name: 'residential',
      type: 'number',
      required: true,
      min: 0,
      label: 'Residential ₦/sqm',
    },
    {
      name: 'qoq',
      type: 'number',
      label: 'QoQ change (%)',
      admin: {
        description:
          'Quarter-over-quarter percentage change versus this district\'s prior quarter entry.',
      },
    },
  ],
}
