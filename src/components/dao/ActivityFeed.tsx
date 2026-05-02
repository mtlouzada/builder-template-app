import Link from 'next/link'

const DOT: Record<string, string> = {
  bid: 'bg-accent',
  vote: 'bg-success',
  prop: 'bg-warning',
}

export type ActivityFeedItem = {
  type: 'bid' | 'vote' | 'prop'
  who: string
  what: string
  timeAgo: string
  href?: string
}

export function ActivityFeed({ items }: { items: ActivityFeedItem[] }) {
  if (items.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-surface-2 px-4 py-6 text-center text-sm text-muted-fg">
        No recent activity yet.
      </div>
    )
  }
  return (
    <ul className="flex flex-col gap-3">
      {items.map((a, i) => {
        const body = (
          <>
            <span
              className={`mt-2 h-2 w-2 rounded-full ${DOT[a.type] ?? 'bg-muted-fg'}`}
            />
            <div>
              <div>
                <strong className="font-semibold">{a.who}</strong>{' '}
                <span className="text-muted-fg">{a.what}</span>
              </div>
              <div className="text-[12.5px] text-muted-fg">{a.timeAgo}</div>
            </div>
          </>
        )
        return (
          <li key={i} className="grid grid-cols-[12px_1fr] items-start gap-3 text-sm">
            {a.href ? (
              <Link
                href={a.href}
                className="contents text-fg transition-opacity hover:opacity-80"
              >
                {body}
              </Link>
            ) : (
              body
            )}
          </li>
        )
      })}
    </ul>
  )
}
