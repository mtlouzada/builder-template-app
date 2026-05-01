import { PageStub } from '@/components/PageStub'

export default function ProposalDetailPage() {
  return (
    <PageStub
      title="Proposal detail"
      pr="PR #4"
      blocks={[
        'Breadcrumbs + StatusBadge + Number',
        'Title + Proposer + DatesRow',
        'VoteSummaryBar',
        'DescriptionMarkdown',
        'TransactionsList',
        'VotePanel (sticky)',
        'VotesTable',
      ]}
    />
  )
}
