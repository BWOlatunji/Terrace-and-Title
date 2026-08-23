import type { CollectionConfig } from 'payload'

// FR-312. Uses local disk storage for now; swaps to the Cloudflare R2
// adapter in PBI-005 without any change to how other collections
// reference this one.
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Recommended for accessibility, not hard-required — see docs/FSD.md FR-312.',
      },
    },
  ],
  upload: true,
}
