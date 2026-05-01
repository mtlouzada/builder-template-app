'use client'

import { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'

type Props = {
  topBid: number
  /** Increment factor — Builder default 1.02 (2%). */
  minIncrementPct?: number
  /** Connected wallet ETH balance, displayed for user awareness. */
  balanceEth?: number
  /** Network name for the footer (e.g. "Base"). */
  network?: string
  /** When false, the form is shown but Place Bid is disabled with a hint. */
  wrongNetwork?: boolean
  /** Whether to surface the optional onchain comment field (140 chars). */
  enableComment?: boolean
}

export function BidForm({
  topBid,
  minIncrementPct = 1.02,
  balanceEth = 1.284,
  network = 'Base',
  wrongNetwork = false,
  enableComment = true,
}: Props) {
  const [bid, setBid] = useState('')
  const [comment, setComment] = useState('')

  const minBid = useMemo(() => (topBid * minIncrementPct).toFixed(3), [topBid, minIncrementPct])
  const numeric = parseFloat(bid)
  const belowMin = !Number.isNaN(numeric) && numeric < parseFloat(minBid)
  const overBalance =
    !Number.isNaN(numeric) && balanceEth !== undefined && numeric > balanceEth
  const canSubmit = !!bid && !belowMin && !overBalance && !wrongNetwork

  return (
    <div className="flex flex-col gap-2.5 rounded-md border border-border bg-surface-2 p-4">
      <div className="flex gap-2">
        <div className="flex flex-1 items-center rounded-md border border-border bg-surface px-3 transition-[box-shadow,border-color] focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <input
            type="text"
            inputMode="decimal"
            placeholder={`${minBid} or more`}
            value={bid}
            onChange={(e) => setBid(e.target.value)}
            className="flex-1 border-0 bg-transparent py-2.5 text-sm outline-none"
          />
          <span className="text-[13px] font-semibold text-muted-fg">ETH</span>
        </div>
        <Button disabled={!canSubmit}>Place bid</Button>
      </div>

      {enableComment && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Optional onchain comment (140 chars)"
            maxLength={140}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-[13px] outline-none focus:border-accent"
          />
          <span className="text-[12.5px] text-muted-fg">{comment.length}/140</span>
        </div>
      )}

      <div className="text-[12.5px] text-muted-fg">
        {wrongNetwork ? (
          <span className="text-warning">Wrong network — switch to {network}.</span>
        ) : belowMin ? (
          <span className="text-warning">Bid must be at least {minBid} ETH.</span>
        ) : overBalance ? (
          <span className="text-warning">Bid exceeds wallet balance ({balanceEth} ETH).</span>
        ) : (
          <>
            Balance: {balanceEth} ETH · Network: {network} ✓
          </>
        )}
      </div>
    </div>
  )
}
