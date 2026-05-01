import { PageStub } from '@/components/PageStub'

export default function AboutPage() {
  return (
    <PageStub
      title="About"
      pr="PR #7"
      blocks={[
        'DAOHeaderCard (logo + 4 stat tiles + chain)',
        'MissionPanel',
        'Founders cards',
        'DelegatesPreview',
        'ContractsList',
      ]}
    />
  )
}
