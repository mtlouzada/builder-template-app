import type { Metadata } from 'next'

import { ProposalsListView } from '@/components/dao/ProposalsListView'
import { PROPOSALS } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'Proposals',
}

export default function ProposalsPage() {
  return <ProposalsListView proposals={PROPOSALS} />
}
