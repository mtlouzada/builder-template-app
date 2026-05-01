'use client'

import {
  ChainStoreProvider,
  createChainStore,
  createDaoStore,
  DaoStoreProvider,
} from '@buildeross/stores'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { useMemo } from 'react'
import { SWRConfig } from 'swr'
import { WagmiProvider } from 'wagmi'

import { getDaoConfig } from '@/config'
import { config } from '@/utils/clientConfig'

import '@rainbow-me/rainbowkit/styles.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchInterval: 5000,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  const daoConfig = getDaoConfig()
  const chainStore = useMemo(() => createChainStore(daoConfig.chain), [daoConfig.chain])
  const daoStore = useMemo(
    () => createDaoStore(daoConfig.addresses),
    [daoConfig.addresses]
  )

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <ChainStoreProvider store={chainStore}>
              <DaoStoreProvider store={daoStore}>
                <SWRConfig value={{}}>{children}</SWRConfig>
              </DaoStoreProvider>
            </ChainStoreProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </NextThemesProvider>
  )
}
