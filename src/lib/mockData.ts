export type MockPreset = {
  name: string
  tagline: string
  chain: string
  chainColor: string
  logoStyle: 'stripes' | 'tv' | 'leaf'
  logoColor: string
  accent: string
  radius: number
  font: string
  displayFont: string
  treasuryEth: number
  treasuryUsd: number
  auctionSales: number
  members: number
  totalSupply: number
  activeMembers: number
  artworkPalette: [string, string, string]
}

export const PRESETS: Record<'builder' | 'gnars' | 'verdant', MockPreset> = {
  builder: {
    name: 'Builder',
    tagline: 'Powering Onchain Communities.',
    chain: 'Base',
    chainColor: '#0052ff',
    logoStyle: 'stripes',
    logoColor: '#0052ff',
    accent: '#2563eb',
    radius: 12,
    font: 'Geist',
    displayFont: 'Geist',
    treasuryEth: 15.5925,
    treasuryUsd: 36003.45,
    auctionSales: 4.40346,
    members: 181,
    totalSupply: 658,
    activeMembers: 47,
    artworkPalette: ['#ff4d4d', '#000000', '#ffffff'],
  },
  gnars: {
    name: 'Gnars DAO',
    tagline: 'Nounish Open S',
    chain: 'Base',
    chainColor: '#0052ff',
    logoStyle: 'tv',
    logoColor: '#f5d447',
    accent: '#f5d447',
    radius: 8,
    font: 'Geist',
    displayFont: 'Londrina Solid',
    treasuryEth: 6.7728,
    treasuryUsd: 35827.47,
    auctionSales: 15.4727,
    members: 1011,
    totalSupply: 6001,
    activeMembers: 312,
    artworkPalette: ['#7dd3fc', '#fbbf24', '#a3e635'],
  },
  verdant: {
    name: 'Verdant',
    tagline: 'A regenerative onchain commons.',
    chain: 'Base',
    chainColor: '#0052ff',
    logoStyle: 'leaf',
    logoColor: '#16a34a',
    accent: '#16a34a',
    radius: 16,
    font: 'Geist',
    displayFont: 'Geist',
    treasuryEth: 24.118,
    treasuryUsd: 56103.21,
    auctionSales: 38.221,
    members: 412,
    totalSupply: 1244,
    activeMembers: 98,
    artworkPalette: ['#a7f3d0', '#0f766e', '#fef3c7'],
  },
}

export type ProposalStatus =
  | 'active'
  | 'pending'
  | 'executed'
  | 'defeated'
  | 'cancelled'

export type MockProposal = {
  id: number
  title: string
  status: ProposalStatus
  date: string
  proposer: string
  forVotes: number
  againstVotes: number
  abstainVotes: number
  quorum: number
  requested: { eth: number; usdc: number }
  endsLabel: string
}

export const PROPOSALS: MockProposal[] = [
  {
    id: 63,
    title: 'Update links and add description',
    status: 'cancelled',
    date: 'Apr 29, 2026',
    proposer: '0x1cD0…Eef21',
    forVotes: 0,
    againstVotes: 0,
    abstainVotes: 0,
    quorum: 24,
    requested: { eth: 0, usdc: 0 },
    endsLabel: '—',
  },
  {
    id: 62,
    title: 'Updated description and added links',
    status: 'pending',
    date: 'Apr 29, 2026',
    proposer: '0xE2E…6A2E1',
    forVotes: 0,
    againstVotes: 0,
    abstainVotes: 0,
    quorum: 24,
    requested: { eth: 0, usdc: 0 },
    endsLabel: 'Starts in 25 hours',
  },
  {
    id: 61,
    title: 'Enhance the Official Builder Template and Upstream Feature Batches',
    status: 'active',
    date: 'Apr 26, 2026',
    proposer: 'r4topunk.eth',
    forVotes: 38,
    againstVotes: 4,
    abstainVotes: 2,
    quorum: 24,
    requested: { eth: 4.0, usdc: 0 },
    endsLabel: 'Ends in 2 days',
  },
  {
    id: 60,
    title: 'Establish the Nouns Builder Fund on Artizen',
    status: 'executed',
    date: 'Apr 03, 2026',
    proposer: 'haxixe.eth',
    forVotes: 56,
    againstVotes: 1,
    abstainVotes: 0,
    quorum: 24,
    requested: { eth: 12, usdc: 0 },
    endsLabel: '18 days ago',
  },
  {
    id: 59,
    title: 'Tech Pod Residency Tapering to 50 Percent',
    status: 'executed',
    date: 'Mar 04, 2026',
    proposer: '0x4f2…91Cd',
    forVotes: 41,
    againstVotes: 9,
    abstainVotes: 3,
    quorum: 24,
    requested: { eth: 0, usdc: 18000 },
    endsLabel: '47 days ago',
  },
  {
    id: 58,
    title: 'Builder Nouns The Documentary',
    status: 'defeated',
    date: 'Feb 11, 2026',
    proposer: '0xaa…12fe',
    forVotes: 12,
    againstVotes: 38,
    abstainVotes: 5,
    quorum: 24,
    requested: { eth: 8, usdc: 0 },
    endsLabel: '—',
  },
]

export type MockBid = {
  addr: string
  amount: number
  time: string
  comment: string | null
}

export const AUCTION = {
  tokenId: 765,
  date: 'March 21, 2026',
  endsAt: Date.now() + 1000 * 60 * 60 * 18,
  recentBids: [
    { addr: '0xBB…3C26', amount: 0.42, time: '12 min ago', comment: 'lfg builder' },
    { addr: 'haxixe.eth', amount: 0.38, time: '34 min ago', comment: null },
    { addr: '0x4f2…91Cd', amount: 0.35, time: '1 h ago', comment: 'first bid 🫡' },
  ] as MockBid[],
}

export type ActivityType = 'bid' | 'vote' | 'prop'

export const ACTIVITY: Array<{
  type: ActivityType
  who: string
  what: string
  time: string
}> = [
  {
    type: 'bid',
    who: '0xBB…3C26',
    what: 'placed a bid of 0.42 ETH on Builder #765',
    time: '12 min ago',
  },
  {
    type: 'vote',
    who: 'haxixe.eth',
    what: 'voted FOR proposal #61',
    time: '1 h ago',
  },
  {
    type: 'prop',
    who: 'r4topunk.eth',
    what: 'created proposal #61',
    time: '5 d ago',
  },
  {
    type: 'bid',
    who: '0x4f2…91Cd',
    what: 'placed a bid of 0.35 ETH on Builder #765',
    time: '1 h ago',
  },
  {
    type: 'vote',
    who: '0xE2E…6A2E1',
    what: 'voted AGAINST proposal #58',
    time: '2 mo ago',
  },
]

export type MockMember = {
  ens: string | null
  addr: string
  votes: number
  pct: number
  joined: string
  active: boolean
}

export const MEMBERS: MockMember[] = [
  { ens: 'haxixe.eth', addr: '0xE2E…6A2E1', votes: 24, pct: 3.65, joined: 'Mar 13, 2024', active: true },
  { ens: 'r4topunk.eth', addr: '0x4f2…91Cd', votes: 18, pct: 2.74, joined: 'Apr 02, 2024', active: true },
  { ens: null, addr: '0xBB…3C26', votes: 14, pct: 2.13, joined: 'Apr 15, 2024', active: true },
  { ens: 'gnarlyvlad.eth', addr: '0x9b8…1a45', votes: 12, pct: 1.82, joined: 'May 03, 2024', active: true },
  { ens: null, addr: '0xaa1…2bf3', votes: 11, pct: 1.67, joined: 'May 21, 2024', active: false },
  { ens: 'builder.eth', addr: '0x0001…0001', votes: 10, pct: 1.52, joined: 'Jun 11, 2024', active: true },
  { ens: null, addr: '0xcd4…99e2', votes: 9, pct: 1.37, joined: 'Jul 02, 2024', active: false },
  { ens: 'noggles.eth', addr: '0x77a…5512', votes: 8, pct: 1.21, joined: 'Jul 19, 2024', active: true },
  { ens: null, addr: '0x55b…2200', votes: 7, pct: 1.06, joined: 'Aug 05, 2024', active: false },
  { ens: null, addr: '0x12c…4f01', votes: 7, pct: 1.06, joined: 'Aug 22, 2024', active: true },
]

export const CONTRACTS = [
  { label: 'NFT', addr: '0xe8af882f2f5c7958023d710ac0e2344070099432' },
  { label: 'Auction House', addr: '0x6A8289Ad5Cf685C8753a47Ff7FaF7A22A04D6FCe' },
  { label: 'Governor', addr: '0x6623D2A904297a5ed9c8A4b613c4b584F8428CeF' },
  { label: 'Treasury', addr: '0xcF325a4C7891221624988185211b0798A0f904C10' },
  { label: 'Metadata', addr: '0xaEF0ca909bAaEe9A8f8400D77c0a0a9bB18f766c' },
  { label: 'Escrow Delegate', addr: '0x98bc10924a2D0A81c9C2056b84cE084b71D9D1cF' },
]

export const CHART_AUCTION = [3.2, 2.1, 1.8, 1.4, 2.6, 3.4, 2.2, 2.8, 3.1, 3.6, 4.2, 4.8]
export const CHART_PROPOSALS = [3, 4, 2, 5, 4, 6, 5, 7, 4, 6, 7, 5]
export const CHART_MEMBERS = [22, 28, 24, 31, 18, 26, 30, 27, 33, 24, 29, 35, 31, 28]
