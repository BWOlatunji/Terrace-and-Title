import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Listings } from './collections/Listings'
import { Districts } from './collections/Districts'
import { PriceQuarters } from './collections/PriceQuarters'
import { Advisors } from './collections/Advisors'
import { Developers } from './collections/Developers'
import { Articles } from './collections/Articles'
import { Inquiries } from './collections/Inquiries'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Listings,
    Districts,
    PriceQuarters,
    Advisors,
    Developers,
    Articles,
    Inquiries,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      // DATABASE_URI is our own documented convention (see
      // docs/walkthrough-for-developer.md); DATABASE_URL is what Vercel's
      // native Neon integration injects automatically and doesn't let us
      // rename — supporting both means one codebase works in either
      // environment without hand-duplicating the variable.
      connectionString: process.env.DATABASE_URI || process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
