import type { CollectionConfig } from 'payload'

// FR-306.
export const Advisors: CollectionConfig = {
  slug: 'advisors',
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
    },
    {
      name: 'patch',
      type: 'text',
      label: 'Patch / title',
      admin: {
        description: 'e.g. "Senior Advisor, Prime Districts"',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
