import { PageStub } from '@/components/PageStub'

export default function AuctionPage() {
  return (
    <PageStub
      title="Auction"
      pr="PR #2"
      blocks={[
        'AuctionImage + ChartTabs',
        'PrevNext + LatestBadge + Date',
        'Title #N + WinningBid + HeldBy',
        'BidForm (amount + comment + min-increment)',
        'TimeRemaining + EndingSoonAlert',
        'BidHistory',
        'VotingPowerExplainer',
      ]}
    />
  )
}
