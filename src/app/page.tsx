import { daoConfig } from '@/lib/dao.config'

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-border bg-surface p-8">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-fg">
          Scaffold · PR #0
        </div>
        <h1 className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
          {daoConfig.name}
        </h1>
        <p className="mt-2 max-w-xl text-[17px] text-muted-fg">{daoConfig.tagline}</p>
        <p className="mt-6 text-sm text-muted-fg">
          App Router + Tailwind v4 + theme tokens are wired up. Header, footer,
          tweaks panel (bottom-right, dev-only), and dark mode are live. Page
          bodies land in the next PRs.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {[
          { label: 'Dashboard', href: '/', stub: 'PR #1' },
          { label: 'Auction', href: '/auction/765', stub: 'PR #2' },
          { label: 'Proposals', href: '/proposals', stub: 'PR #3' },
          { label: 'Proposal detail', href: '/proposals/61', stub: 'PR #4' },
          { label: 'Treasury', href: '/treasury', stub: 'PR #5' },
          { label: 'Members', href: '/members', stub: 'PR #6' },
          { label: 'About', href: '/about', stub: 'PR #7' },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-md border border-border bg-surface p-4"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-muted-fg">
              {item.stub}
            </div>
            <div className="mt-1 font-semibold">{item.label}</div>
            <div className="font-mono text-[12px] text-muted-fg">{item.href}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
