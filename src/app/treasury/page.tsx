import { PageStub } from '@/components/PageStub'

export default function TreasuryPage() {
  return (
    <PageStub
      title="Treasury"
      pr="PR #5"
      blocks={[
        'PageHeader (title + treasury address)',
        'KPI cards: TotalValue · ETHBalance · TotalAuctionSales',
        'Chart: AuctionRevenue',
        'Chart: ProposalActivity',
        'Chart: MemberActivity',
        'TokenHoldings table',
        'NFTHoldings grid',
      ]}
    />
  )
}
