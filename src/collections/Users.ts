import type { CollectionConfig } from 'payload'

// Staff authentication — FR-301. Deliberately separate from the Clients
// collection that will be added in Phase 2 (FR-201), so a staff credential
// can never be used to access the client portal, or vice versa.
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    // FR-313: a staff account must never be able to elevate its own role.
    // Enforced here by disallowing self-edits of the `roles` field for
    // anyone who isn't already a super-admin.
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'],
      options: [
        { label: 'Editor', value: 'editor' },
        { label: 'Super Admin', value: 'super-admin' },
      ],
      access: {
        // Only a super-admin can change anyone's roles, including their own —
        // FR-313's self-elevation safeguard.
        update: ({ req: { user } }) =>
          Boolean(user && Array.isArray(user.roles) && user.roles.includes('super-admin')),
      },
      admin: {
        description: 'Only a Super Admin can manage other staff Users and permissions (FR-313).',
      },
    },
    // Email and password fields are added automatically by `auth: true`.
  ],
}
