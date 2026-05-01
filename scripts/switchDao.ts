#!/usr/bin/env npx tsx
/* eslint-disable no-console */

/**
 * Labrat helper: flip the local environment to a different Builder DAO without
 * hand-editing .env.local. Updates env vars + theme overrides + regenerates
 * src/config/dao.{json,ts} via the existing fetchDaoAddresses script.
 *
 * Usage:
 *   pnpm switch-dao <preset>
 *
 *   pnpm switch-dao gnars       — Gnars DAO on Base
 *   pnpm switch-dao builder     — Builder DAO on Base
 *
 * After switching, restart `pnpm dev` for the new DAO to take effect.
 */

import { spawnSync } from 'child_process'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

type Preset = {
  label: string
  chainId: number
  networkType: 'mainnet' | 'testnet'
  tokenAddress: string
  // Visual overrides — applied to dao.theme.json so the template re-skins
  // immediately on next dev reload.
  tagline?: string
  theme: {
    accent: string
    radius: number
    displayFont: string
  }
}

const PRESETS: Record<string, Preset> = {
  builder: {
    label: 'Builder DAO',
    chainId: 8453,
    networkType: 'mainnet',
    tokenAddress: '0xe8af882f2f5c79580230710ac0e2344070099432',
    tagline: 'Powering Onchain Communities.',
    theme: { accent: '#2563eb', radius: 12, displayFont: 'Geist' },
  },
  gnars: {
    label: 'Gnars DAO',
    chainId: 8453,
    networkType: 'mainnet',
    tokenAddress: '0x880fb3cf5c6cc2d7dfc13a993e839a9411200c17',
    tagline: 'Nounish Open Source Action Sports Brand experiment.',
    theme: { accent: '#f5d447', radius: 8, displayFont: 'Londrina Solid' },
  },
}

function parseArgs() {
  const args = process.argv.slice(2)
  const presetName = args[0]
  if (!presetName || presetName === '--help' || presetName === '-h') {
    console.log('Usage: pnpm switch-dao <preset>')
    console.log('')
    console.log('Presets:')
    for (const [key, p] of Object.entries(PRESETS)) {
      console.log(
        `  ${key.padEnd(10)} — ${p.label} (chain ${p.chainId}, ${p.tokenAddress})`
      )
    }
    process.exit(presetName ? 0 : 1)
  }
  const preset = PRESETS[presetName]
  if (!preset) {
    console.error(`❌ Unknown preset: ${presetName}`)
    console.error(`   Available: ${Object.keys(PRESETS).join(', ')}`)
    process.exit(1)
  }
  return { name: presetName, preset }
}

/**
 * Update .env.local in place. Preserves any keys we don't manage and
 * overwrites the DAO-targeting ones. Creates the file if missing.
 */
function updateEnv(preset: Preset) {
  const envPath = join(process.cwd(), '.env.local')
  const sample = join(process.cwd(), 'sample.env')
  const seed = existsSync(envPath)
    ? readFileSync(envPath, 'utf8')
    : existsSync(sample)
      ? readFileSync(sample, 'utf8')
      : ''

  const overrides: Record<string, string> = {
    NEXT_PUBLIC_NETWORK_TYPE: `"${preset.networkType}"`,
    NEXT_PUBLIC_CHAIN_ID: `"${preset.chainId}"`,
    NEXT_PUBLIC_DAO_TOKEN_ADDRESS: `"${preset.tokenAddress}"`,
  }

  const lines = seed.split('\n')
  const seen = new Set<string>()
  const out: string[] = []
  for (const line of lines) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=/)
    if (m && overrides[m[1]] !== undefined) {
      out.push(`${m[1]}=${overrides[m[1]]}`)
      seen.add(m[1])
    } else {
      out.push(line)
    }
  }
  for (const k of Object.keys(overrides)) {
    if (!seen.has(k)) out.push(`${k}=${overrides[k]}`)
  }
  writeFileSync(envPath, out.join('\n'))
  console.log(`✅ .env.local updated`)
}

function writeThemeOverrides(preset: Preset) {
  const path = join(process.cwd(), 'src/config/dao.theme.json')
  writeFileSync(
    path,
    JSON.stringify(
      {
        tagline: preset.tagline,
        accent: preset.theme.accent,
        radius: preset.theme.radius,
        displayFont: preset.theme.displayFont,
      },
      null,
      2
    )
  )
  console.log(`✅ Theme overrides written to ${path}`)
}

function runFetchDao() {
  console.log('')
  console.log('🔄 Running pnpm fetch-dao...')
  console.log('')
  const result = spawnSync('pnpm', ['fetch-dao'], { stdio: 'inherit' })
  if (result.status !== 0) {
    console.error('❌ fetch-dao failed')
    process.exit(result.status ?? 1)
  }
}

function main() {
  const { name, preset } = parseArgs()
  console.log(`🔁 Switching template to ${preset.label} (preset: ${name})`)
  updateEnv(preset)
  writeThemeOverrides(preset)
  runFetchDao()
  console.log('')
  console.log('🎉 Switched. Restart `pnpm dev` for the new DAO to take effect.')
}

main()
