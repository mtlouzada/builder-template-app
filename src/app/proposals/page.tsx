import { PageStub } from '@/components/PageStub'

export default function ProposalsPage() {
  return (
    <PageStub
      title="Proposals"
      pr="PR #3"
      blocks={[
        'SearchInput',
        'StatusFilter (popover)',
        'CreateProposalButton',
        'ProposalCard (×N) — number, title, status, vote bar, requested',
        'EmptyState',
      ]}
    />
  )
}
