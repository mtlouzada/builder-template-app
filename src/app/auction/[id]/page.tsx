import { ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import Link from 'next/link'

import { AuctionArt } from '@/components/dao/AuctionArt'
import { BidForm } from '@/components/dao/BidForm'
import { BidHistory } from '@/components/dao/BidHistory'
import { TimeAlert } from '@/components/dao/TimeAlert'
import { VotingPowerExplainer } from '@/components/dao/VotingPowerExplainer'
import { cn } from '@/lib/utils'
import { daoConfig } from '@/lib/dao.config'
import { AUCTION, PRESETS } from '@/lib/mockData'

const CHAIN_NAMES: Record<number, string> = {
  1: 'Ethereum',
  10: 'Optimism',
  8453: 'Base',
  7777777: 'Zora',
}

type Params = Promise<{ id: string }>

export default async function AuctionPage({ params }: { params: Params }) {
  const { id } = await params
  const tokenId = Number.isFinite(parseInt(id, 10)) ? parseInt(id, 10) : AUCTION.tokenId

  // Mock — real app would derive from subgraph: latest token id and per-token data.
  const preset = PRESETS.builder
  const tokenLabel = daoConfig.name.split(' ')[0]
  const topBid = AUCTION.recentBids[0]
  const isLatest = tokenId === AUCTION.tokenId
  const minBid = (topBid.amount * 1.02).toFixed(3)
  const chainName = CHAIN_NAMES[daoConfig.chainId] ?? `Chain ${daoConfig.chainId}`

  return (
    <div className="flex flex-col gap-6">
      <TimeAlert icon={<Clock className="h-4 w-4" />} dismissible>
        Auction for {tokenLabel} #{tokenId} ends in 17h 54m.
      </TimeAlert>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_0.85fr]">
        <div>
          <Tabs />
          <div className="aspect-square overflow-hidden rounded-xl border border-border">
            <AuctionArt palette={preset.artworkPalette} />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-3">
          <AuctionNav tokenId={tokenId} isLatest={isLatest} date={AUCTION.date} />

          <h1 className="font-display text-[clamp(36px,5vw,56px)] font-extrabold leading-[1.04] tracking-[-0.025em]">
            {tokenLabel} #{tokenId}
          </h1>

          <div className="my-2 grid grid-cols-2 gap-4">
            <Kv label="Top bid" value={`${topBid.amount} ETH`} />
            <Kv label="Top bidder" value={topBid.addr} mono />
            <Kv label="Ends in" value="17h 54m" />
            <Kv label="Min next bid" value={`${minBid} ETH`} />
          </div>

          <BidForm
            topBid={topBid.amount}
            network={chainName}
            balanceEth={1.284}
            enableComment={daoConfig.features.bidComments}
          />

          <VotingPowerExplainer scenario="eligible" />
        </div>
      </div>

      <section className="rounded-xl border border-border bg-surface px-6 py-[22px]">
        <div className="mb-4">
          <h2 className="text-xl font-bold tracking-tight">Bid history</h2>
        </div>
        <BidHistory bids={AUCTION.recentBids} />
      </section>
    </div>
  )
}

function Tabs() {
  return (
    <div className="mb-4 flex gap-4 border-b border-border">
      <button
        className="-mb-px border-b-2 border-fg px-0 py-2.5 text-sm font-semibold text-fg"
        aria-current="page"
      >
        Auction
      </button>
      <button
        type="button"
        disabled
        className="-mb-px border-b-2 border-transparent px-0 py-2.5 text-sm font-semibold text-muted-fg disabled:opacity-50"
        title="Coming soon"
      >
        Chart
      </button>
    </div>
  )
}

function AuctionNav({
  tokenId,
  isLatest,
  date,
}: {
  tokenId: number
  isLatest: boolean
  date: string
}) {
  const prevId = tokenId - 1
  return (
    <div className="flex items-center gap-2.5">
      {prevId >= 0 ? (
        <Link
          href={`/auction/${prevId}`}
          aria-label="Previous auction"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-fg hover:bg-surface-3"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <button
          aria-label="Previous auction"
          disabled
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-fg opacity-30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      <button
        aria-label="Next auction"
        disabled={isLatest}
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-fg',
          isLatest ? 'opacity-30' : 'hover:bg-surface-3'
        )}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      {isLatest && (
        <span className="rounded-full border border-border bg-surface-2 px-2.5 py-0.5 text-xs font-medium">
          Latest auction
        </span>
      )}
      <span className="ml-auto text-[12.5px] text-muted-fg">{date}</span>
    </div>
  )
}

function Kv({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[12.5px] text-muted-fg">{label}</div>
      <div
        className={cn(
          'text-[17px] font-bold leading-tight text-fg',
          mono && 'font-mono text-sm'
        )}
      >
        {value}
      </div>
    </div>
  )
}
