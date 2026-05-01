# Builder Community Site Template

A forkable, fully-themed Next.js template for any [Builder DAO](https://nouns.build).
Drop in your contract addresses, customize a few keys in `dao.config.ts`, deploy to Vercel.
You get a polished community site with light + dark themes, governance UI, treasury
analytics, and a member directory — out of the box.

> 🎨 **Designed under [Milestone 1 of the Builder Community Site Template proposal](https://nouns.build/dao/base/0xe8af882f2f5c79580230710ac0e2344070099432/761)**.
> See the [Scope map](#scope-map-template-vs-upstream) below for what lives in this
> template versus what is proposed upstream into the `@buildeross/*` packages.

## What you get

| Page | Route | What's on it |
|---|---|---|
| Dashboard | `/` | Hero, live auction spotlight, activity feed, recent proposals, treasury KPIs + chart |
| Auction | `/auction/[id]` | Artwork, bid form (with on-chain comment), bid history, voting-power explainer |
| Proposals | `/proposals` | Filterable card grid with embedded vote bars + status badges |
| Proposal | `/proposals/[id]` | Description, transactions, sticky vote panel |
| Treasury | `/treasury` | KPI cards + 3 analytics charts + token & NFT holdings |
| Members | `/members` | Sortable holder/delegate table with CSV export |
| About | `/about` | Mission, founders, smart-contract list with copy-to-clipboard |

Plus:

- **Light + dark** themes via `next-themes`
- **Theme tokens** as CSS variables (`--accent`, `--radius`, `--bg/surface/fg`, vote palette)
- **Tweaks panel** in dev — cycle DAO presets (Builder · Gnars · Verdant), pick accent
  color, swap display font, drag radius — proves the same shell carries any DAO's identity
- **`@buildeross/*` SDK + hooks** for chain reads, subgraph queries, and types

## Stack

Next.js 15 (App Router) · React 19 · Tailwind v4 · `wagmi` + RainbowKit · `next-themes`
· `@buildeross/sdk` for the Builder subgraph · TypeScript everywhere.

---

## Quick start

### 1. Install dependencies

```bash
pnpm install
```

### 2. Environment

```bash
cp sample.env .env.local
```

Open `.env.local` and fill in:

| Var | Required | Where to get it |
|---|---|---|
| `NEXT_PUBLIC_NETWORK_TYPE` | yes | `"mainnet"` or `"testnet"` |
| `NEXT_PUBLIC_CHAIN_ID` | yes | `1` (Ethereum) · `8453` (Base) · `10` (Optimism) · `7777777` (Zora) |
| `NEXT_PUBLIC_DAO_TOKEN_ADDRESS` | yes | Your DAO's token contract |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | yes | Free at [cloud.reown.com](https://cloud.reown.com) |
| `PINATA_API_KEY` | yes (proposal create) | [Pinata](https://pinata.cloud) JWT for IPFS uploads |
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | optional | [Alchemy](https://alchemy.com) — improves RPC reliability |

Optional features (off by default — flip the disable flag to enable):

| Var | Purpose |
|---|---|
| `NEXT_PUBLIC_DISABLE_TENDERLY_SIMULATION` | `false` to enable proposal simulation. Requires `TENDERLY_*` keys + `NEXT_PUBLIC_TENDERLY_RPC_KEY`. |
| `NEXT_PUBLIC_DISABLE_AI_SUMMARY` | `false` to enable AI tx summaries. Requires `AI_GATEWAY_API_KEY` + `AI_MODEL`. |
| `REDIS_URL` | enables rate-limit + AI summary caching. |

### 3. Fetch your DAO's on-chain config

```bash
pnpm fetch-dao
```

This resolves the auction / governor / treasury / metadata addresses from your token,
generates a favicon from your DAO's image, and writes `src/config/dao.ts`.

### 4. Run

```bash
pnpm dev
```

Open <http://localhost:3000>.

---

## Fork checklist

Following these in order ships a re-skinned, re-deployed site for your DAO in under
20 minutes:

- [ ] **Fork or clone** this repo into your DAO's GitHub org
- [ ] `pnpm install`
- [ ] **Set the 5 required env vars** in `.env.local` — chain id, token address,
      WalletConnect project id, Pinata JWT, and (recommended) an Alchemy key
- [ ] `pnpm fetch-dao` — resolves your contract addresses + favicon
- [ ] **Open `src/lib/dao.config.ts`** and override the theme block:
      - `accent` — your DAO's primary brand color (any CSS color)
      - `displayFont` — `Geist` · `Londrina Solid` · `IBM Plex Sans` · `Fraunces` · or
        any Google Font you wire into `app/layout.tsx`
      - `radius` — 0 (sharp) → 20 (round); cards/inputs/buttons all derive from this
      - `defaultMode` — `'light'` · `'dark'` · `'system'`
- [ ] **Edit `tagline`** in `dao.config.ts` (the hero subtitle)
- [ ] **Drop a logo** into `public/` and replace `<DaoLogo>` usage in
      `src/components/Header.tsx` and `src/app/about/page.tsx` with `<Image>`
- [ ] **Edit the About copy** in `src/app/about/page.tsx` — mission, founders,
      contract list. The smart-contract addresses come from `mockData.ts` for now;
      swap the import to use your live `dao.config.ts.addresses` once you have them
- [ ] **Toggle features** in `dao.config.ts.features` (e.g. set `bidComments: false`
      to hide the on-chain bid comment field)
- [ ] **Test in dev** — open the Tweaks panel (gear icon, bottom-right) to preview
      light/dark + accent live before committing
- [ ] **Deploy to Vercel** — see [Deploy](#deploy-to-vercel) below
- [ ] **Update `socials`** in `dao.config.ts` (twitter, farcaster, discord, github,
      website) — surfaces in the footer

That's it. The Tweaks panel is dev-only (gated by `NODE_ENV !== 'production'`); your
live site renders exactly what's in `dao.config.ts`.

---

## Theming & config surface

Everything a forking DAO can change lives in **one file**:

```ts
// src/lib/dao.config.ts

export const daoConfig: DaoConfig = {
  // ── Identity ────────────────────────────────
  name: 'Your DAO',
  tagline: 'A regenerative onchain commons.',
  image: 'ipfs://...',                  // logo / OG image

  // ── Onchain ─────────────────────────────────
  chainId: 8453,                         // 1 · 8453 · 10 · 7777777
  addresses: {
    token, auction, governor, treasury, metadata,
  },

  // ── Theme ───────────────────────────────────
  theme: {
    accent: '#2563eb',                   // primary brand color
    radius: 12,                          // 0 (sharp) → 20 (round)
    font: 'Geist',                       // body font
    displayFont: 'Geist',                // hero / display headings
    defaultMode: 'system',               // 'light' | 'dark' | 'system'
  },

  // ── Optional features (flip off what you don't need) ──
  features: {
    auctionChart: true,
    treasuryAnalytics: true,
    membersDirectory: true,
    bidComments: true,
    timeBasedAlerts: true,
  },

  socials: {
    twitter: '@yourdao',
    farcaster: 'yourdao',
    discord: 'https://discord.gg/...',
    github: 'https://github.com/yourdao',
    website: 'https://yourdao.com',
  },
}
```

Theme tokens themselves (the actual color values) live in
`src/app/globals.css` under `:root` and `[data-theme='dark']`. The Tailwind v4
`@theme` block exposes them as utilities (`bg-accent`, `text-muted-fg`,
`border-border-strong`, etc.).

---

## Deploy to Vercel

### One-click

1. Push your fork to GitHub
2. Import it on [vercel.com/new](https://vercel.com/new)
3. Add the same env vars from `.env.local` to the Vercel project
4. Deploy — Vercel runs `pnpm build` which pre-runs `pnpm fetch-dao`

### Manual

```bash
pnpm build && pnpm start
```

The build pipeline:

1. **`prebuild`** runs `pnpm fetch-dao` — pulls your DAO's onchain config from the chain
2. **`build`** runs `next build` (App Router, server components compiled)
3. **`start`** serves at port 3000

### Custom domain

Set up the domain in Vercel, point your DNS at it, done — no extra config in this
template.

---

## Scope map: template vs upstream

What's already in this template versus what is proposed upstream into the official
`@buildeross/*` packages (per the [milestone proposal](#)).

| Item | Lands in | Notes |
|---|---|---|
| Dashboard page | **Template** | Replaces redirect-to-token. |
| Members page | **Template** | Promotes embedded About table to its own route. |
| Treasury KPI cards + analytics | **Template UI** · upstream chart pkg | Visuals here; reusable chart package proposed in batch 2. |
| Proposal cards w/ VoteBar | **Template** | New visual; uses existing Builder data. |
| Theme tokens / dark mode | **Template** | CSS-vars layer over zord defaults. |
| Setup & deploy docs | **Template README** | Fork-to-launch checklist + per-DAO config snippets (this doc). |
| Voting Power Explainer | **Upstream batch 1** | Component will live in `@buildeross/proposal-ui`; template just consumes it. |
| Vote Metrics suite | **Upstream batch 1** | Same as above. |
| Active Member Detection | **Upstream batch 1** | New hook in `@buildeross/hooks`. |
| Time-Based Alerts | **Upstream batch 1** | Stand-alone component. |
| Bid form UX + on-chain comments | **Upstream batch 2** | Patches `@buildeross/auction-ui`; needs SDK hook. |
| Treasury analytics package | **Upstream batch 2** | New `@buildeross/treasury-analytics` package. |
| 0xSplits in proposal wizard | **Upstream batch 2** | Patches `@buildeross/create-proposal-ui`. |

The template currently ships its own implementations of the Upstream batch 1 / 2 items
(VoteBar, VotingPowerExplainer, TimeAlert, BidForm, etc.) so it works standalone today.
As the upstream packages absorb these, the template will switch to consuming them, and
forks get the upgrade for free with a `pnpm up @buildeross/*`.

---

## Available scripts

| Script | What it does |
|---|---|
| `pnpm dev` | Next.js dev server (port 3000) |
| `pnpm fetch-dao` | Resolves on-chain DAO config + writes `src/config/dao.ts` |
| `pnpm build` | Production build (auto-runs `fetch-dao` first) |
| `pnpm start` | Production server |
| `pnpm type-check` | `tsc --noEmit` |
| `pnpm lint` | type-check + ESLint with `--fix` |

---

## Project structure

```
src/
├── app/                  # App Router pages + API routes
│   ├── api/              # Pinata · simulate · AI summary
│   ├── auction/[id]/
│   ├── proposals/
│   │   └── [id]/
│   ├── treasury/
│   ├── members/
│   ├── about/
│   ├── globals.css       # Tailwind v4 + CSS-var theme tokens
│   ├── layout.tsx        # Root layout, fonts, providers
│   ├── providers.tsx     # wagmi, RainbowKit, react-query, next-themes
│   └── page.tsx          # Dashboard
├── components/
│   ├── ui/               # shadcn-style atoms (Button)
│   ├── dao/              # DAO-specific composites (VoteBar, BidForm…)
│   ├── DaoLogo.tsx
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── TweaksPanel.tsx   # Dev-only theme tweak floater
├── lib/
│   ├── dao.config.ts     # 👈 the single config file every fork edits
│   ├── mockData.ts       # Stand-in data for pages until live wiring
│   └── utils.ts          # cn()
├── services/             # Pinata · simulation · Redis
└── config/
    ├── dao.ts            # Auto-generated by fetch-dao — don't edit
    └── types.ts
```

---

## License

Apache 2.0 — see [license.md](./license.md).
