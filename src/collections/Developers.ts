import type { CollectionConfig } from 'payload'

// FR-307. Developer partners have no direct system access of their own —
// see docs/user-stories.md, the note at the top of the "Developer Partner"
// role section. Every field here is maintained by staff on the partner's
// behalf.
export const Developers: CollectionConfig = {
  slug: 'developers',
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
      name: 'delivered',
      type: 'text',
      label: 'Track record',
      admin: {
        description: 'e.g. "14 estates delivered since 2011"',
      },
    },
    {
      name: 'onSchedule',
      type: 'text',
      label: 'Delivery reliability',
      admin: {
        description: 'e.g. "96% handovers on schedule"',
      },
    },
    {
      name: 'verifiedPartner',
      type: 'checkbox',
      defaultValue: false,
      label: 'Verified Partner',
      admin: {
        description:
          'Should only be checked once the FR-103 developer-standing check has actually been completed — see docs/product-owner/open-questions.md OQ-011.',
      },
    },
  ],
}
