import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// FR-302. The core content type. Field shape matches docs/FSD.md's FR-302
// and FR-112 specs directly, including the documentation-status defaults
// (FR-112: an unset status must default to "Pending", never "Verified").
export const Listings: CollectionConfig = {
  slug: 'listings',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'district', 'category', 'status', 'pricePerSqm'],
  },
  access: {
    // Public reads are filtered to published listings at the query level
    // (FR-106/FR-110) — this collection-level rule only prevents drafts
    // from being readable via a crafted API request that skips that filter.
    read: ({ req: { user } }) => {
      if (user) return true
      return { status: { equals: 'published' } }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated from the title (FR-409) — not editable directly.',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Residential Land', value: 'residential-land' },
        { label: 'Developed Residence', value: 'developed-residence' },
        { label: 'Commercial Plot', value: 'commercial-plot' },
      ],
    },
    {
      name: 'district',
      type: 'relationship',
      relationTo: 'districts',
      required: true,
    },
    {
      name: 'size',
      type: 'number',
      required: true,
      min: 1,
      label: 'Size (sqm)',
    },
    {
      name: 'pricePerSqm',
      type: 'number',
      required: true,
      min: 1,
      label: '₦/sqm',
    },
    {
      name: 'price',
      type: 'number',
      min: 0,
      admin: {
        readOnly: true,
        description: 'Computed as size × ₦/sqm on save — not entered directly.',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        description:
          'A listing is only ever publicly visible when Published (FR-106, FR-110).',
      },
    },
    {
      name: 'plan',
      type: 'checkbox',
      defaultValue: false,
      label: 'Payment plan available',
    },
    {
      name: 'docs',
      type: 'group',
      label: 'Documentation status',
      fields: [
        {
          name: 'cofo',
          type: 'select',
          label: 'Certificate of Occupancy (C of O)',
          defaultValue: 'pending',
          required: true,
          options: [
            { label: 'Verified', value: 'verified' },
            { label: 'In progress', value: 'progress' },
            { label: 'Pending', value: 'pending' },
          ],
        },
        {
          name: 'survey',
          type: 'select',
          label: 'Survey plan',
          defaultValue: 'pending',
          required: true,
          options: [
            { label: 'Verified', value: 'verified' },
            { label: 'In progress', value: 'progress' },
            { label: 'Pending', value: 'pending' },
          ],
        },
        {
          name: 'registry',
          type: 'select',
          label: 'Registry search',
          defaultValue: 'pending',
          required: true,
          options: [
            { label: 'Verified', value: 'verified' },
            { label: 'In progress', value: 'progress' },
            { label: 'Pending', value: 'pending' },
          ],
        },
        {
          name: 'deed',
          type: 'select',
          label: 'Deed of assignment',
          defaultValue: 'pending',
          required: true,
          options: [
            { label: 'Verified', value: 'verified' },
            { label: 'In progress', value: 'progress' },
            { label: 'Pending', value: 'pending' },
          ],
        },
      ],
    },
    {
      name: 'useCase',
      type: 'richText',
      editor: lexicalEditor(),
      label: 'Projected use case',
    },
    {
      name: 'advisor',
      type: 'relationship',
      relationTo: 'advisors',
    },
    {
      name: 'developer',
      type: 'relationship',
      relationTo: 'developers',
    },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
    },
  ],
  hooks: {
    beforeValidate: [
      // FR-409: auto-generate a URL-safe slug from the title, appending a
      // numeric suffix on collision so two listings can never collide
      // (see docs/FSD.md FR-409's edge case).
      async ({ data, originalDoc, req }) => {
        if (!data) return data

        const titleChanged = data.title && data.title !== originalDoc?.title
        if (!data.slug || titleChanged) {
          const base = (data.title ?? originalDoc?.title ?? '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')

          let candidate = base
          let suffix = 2
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const existing = await req.payload.find({
              collection: 'listings',
              where: {
                and: [
                  { slug: { equals: candidate } },
                  ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
                ],
              },
              limit: 1,
            })
            if (existing.totalDocs === 0) break
            candidate = `${base}-${suffix}`
            suffix += 1
          }
          data.slug = candidate
        }

        return data
      },
      // Keep `price` as a stored, queryable value derived from size × ₦/sqm,
      // rather than computing it on every read.
      ({ data }) => {
        if (!data) return data
        if (typeof data.size === 'number' && typeof data.pricePerSqm === 'number') {
          data.price = data.size * data.pricePerSqm
        }
        return data
      },
    ],
  },
}
