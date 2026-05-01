import type { AddressType, CHAIN_ID } from '@buildeross/types'

import { DAO_CONFIG as ONCHAIN_CONFIG } from '@/config/dao'

export type DaoTheme = {
  accent: string
  radius: number
  font: string
  displayFont: string
  defaultMode: 'light' | 'dark' | 'system'
}

export type DaoFeatures = {
  auctionChart: boolean
  treasuryAnalytics: boolean
  membersDirectory: boolean
  bidComments: boolean
  timeBasedAlerts: boolean
}

export type DaoSocials = Partial<{
  twitter: string
  farcaster: string
  discord: string
  github: string
  website: string
}>

export type DaoConfig = {
  name: string
  tagline: string
  image: string
  chainId: CHAIN_ID
  addresses: {
    token: AddressType
    auction: AddressType
    governor: AddressType
    treasury: AddressType
    metadata: AddressType
    escrowDelegate?: AddressType
  }
  theme: DaoTheme
  features: DaoFeatures
  socials: DaoSocials
}

export const daoConfig: DaoConfig = {
  name: ONCHAIN_CONFIG.name,
  tagline: 'Powering Onchain Communities.',
  image: ONCHAIN_CONFIG.image,
  chainId: ONCHAIN_CONFIG.chain.id,
  addresses: {
    token: ONCHAIN_CONFIG.addresses.token,
    auction: ONCHAIN_CONFIG.addresses.auction,
    governor: ONCHAIN_CONFIG.addresses.governor,
    treasury: ONCHAIN_CONFIG.addresses.treasury,
    metadata: ONCHAIN_CONFIG.addresses.metadata,
  },
  theme: {
    accent: '#2563eb',
    radius: 12,
    font: 'Geist',
    displayFont: 'Geist',
    defaultMode: 'system',
  },
  features: {
    auctionChart: true,
    treasuryAnalytics: true,
    membersDirectory: true,
    bidComments: true,
    timeBasedAlerts: true,
  },
  socials: {},
}
