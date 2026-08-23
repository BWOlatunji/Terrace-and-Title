import type { CollectionConfig } from 'payload'

// FR-120 / FR-121 / FR-309. One collection serves both the public
// General-Inquiry and Inspection-Booking forms and the staff triage queue —
// see docs/use-cases.md UC-02 for the full submission flow.
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'status', 'advisor', 'createdAt'],
  },
  access: {
    // Public visitors can create (submit a form) but never read, update,
    // or delete — only authenticated staff can do that. Portal clients get
    // their own scoped access rule in Phase 2 (FR-208).
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Inspection', value: 'inspection' },
        { label: 'Callback (from a listing)', value: 'callback' },
      ],
    },
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full name',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone / WhatsApp',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'basedIn',
      type: 'text',
      label: 'Where are you based?',
    },
    {
      name: 'listing',
      type: 'relationship',
      relationTo: 'listings',
    },
    {
      name: 'preferredDate',
      type: 'date',
      label: 'Preferred inspection date',
      admin: {
        condition: (data) => data?.type === 'inspection',
        description: 'Must be today or later — validated in the Server Action, not just here.',
      },
    },
    {
      name: 'mode',
      type: 'select',
      label: 'Inspection mode',
      admin: {
        condition: (data) => data?.type === 'inspection',
      },
      options: [
        { label: 'In person', value: 'in-person' },
        { label: 'Virtual walkthrough', value: 'virtual' },
        { label: 'Representative attends', value: 'representative' },
      ],
    },
    {
      name: 'timezone',
      type: 'text',
      admin: {
        condition: (data) => data?.type === 'inspection',
      },
    },
    {
      name: 'consent',
      type: 'checkbox',
      required: true,
      defaultValue: false,
      admin: {
        description: 'Must be true to submit — enforced server-side (FR-120).',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Review', value: 'in-review' },
        { label: 'Advisor Assigned', value: 'advisor-assigned' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'advisor',
      type: 'relationship',
      relationTo: 'advisors',
      label: 'Assigned advisor',
    },
  ],
}
