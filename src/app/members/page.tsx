import { PageStub } from '@/components/PageStub'

export default function MembersPage() {
  return (
    <PageStub
      title="Members"
      pr="PR #6"
      blocks={[
        'PageHeader + Search',
        'MembersTable: avatar/ENS, address, votes, vote%, joined, ActiveBadge',
        'ExportCSV',
        'Pagination',
      ]}
    />
  )
}
