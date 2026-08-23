// Placeholder only — proves the scaffold, Tailwind theme, and font wiring
// all work end to end. The real Home page (hero, data strip, verification
// band, market chart, featured listings — FR-101 through FR-105) is
// PBI-010 through PBI-013 in docs/product-owner/product-backlog.md,
// Epic B, and is not part of this scaffolding pass.
export default function HomePlaceholder() {
  return (
    <main className="mx-auto flex min-h-screen max-w-container flex-col items-start justify-center gap-6 px-6">
      <span className="font-label text-xs font-extrabold uppercase tracking-[0.22em] text-terracotta">
        Scaffold running
      </span>
      <h1 className="font-heading text-5xl font-medium text-navy">Terrace &amp; Title</h1>
      <p className="max-w-lg font-sans text-base text-slate">
        Next.js, Payload CMS, and the brand&rsquo;s design tokens are wired up. The real Home page
        content is separate backlog work — see{' '}
        <code className="rounded bg-mist px-1.5 py-0.5 font-mono text-sm text-navy">
          docs/product-owner/product-backlog.md
        </code>
        , Epic B.
      </p>
      <div className="flex items-center gap-4 rounded border border-hairline-10 bg-mist px-4 py-3 font-mono text-sm text-navy">
        <span>₦412,000</span>
        <span className="text-green">+3.8%</span>
      </div>
    </main>
  )
}
