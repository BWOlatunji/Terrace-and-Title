/* Based on Payload's generated blank-template layout, corrected to match
   the actual exports of @payloadcms/next@3.88.0 (installed) rather than
   the package's main-branch/pre-release API — see the FR-scaffold commit
   history for context. Do not hand-edit casually; if Payload's own
   generator produces a different shape on a future upgrade, prefer that. */
import config from '@payload-config'
import '@payloadcms/next/css'
import type { Metadata } from 'next'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, metadata as payloadMetadata, RootLayout } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from './admin/importMap.js'
import './custom.css'

export const metadata: Metadata = payloadMetadata

type Args = {
  children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
