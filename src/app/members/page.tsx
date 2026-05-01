import type { Metadata } from 'next'

import { MembersTable } from '@/components/dao/MembersTable'
import { MEMBERS, PRESETS } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'Members',
}

export default function MembersPage() {
  const preset = PRESETS.builder
  return (
    <MembersTable
      members={MEMBERS}
      totalMembers={preset.members}
      activeMembers={preset.activeMembers}
    />
  )
}
