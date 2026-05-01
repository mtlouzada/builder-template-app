import type { MockBid } from '@/lib/mockData'

export function BidHistory({ bids }: { bids: MockBid[] }) {
  if (bids.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border bg-surface-2 px-4 py-6 text-center text-sm text-muted-fg">
        No bids yet — be the first.
      </div>
    )
  }
  return (
    <ul className="flex flex-col gap-3">
      {bids.map((b, i) => (
        <li
          key={i}
          className="flex items-start justify-between rounded-md bg-surface-2 px-4 py-3.5"
        >
          <div>
            <div className="text-[17px] font-bold text-fg">{b.amount} ETH</div>
            <div className="font-mono text-xs text-muted-fg">
              {b.addr} · {b.time}
            </div>
            {b.comment && (
              <div className="mt-1.5 text-[13px] italic text-fg-2">
                &ldquo;{b.comment}&rdquo;
              </div>
            )}
          </div>
          {i === 0 && (
            <span className="rounded-full border border-border bg-accent/15 px-2 py-0.5 text-[11.5px] font-semibold uppercase tracking-wider text-accent-strong">
              Top bid
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
