'use client'

import { useState } from 'react'
import { SplitsClient } from '@0xsplits/splits-sdk'
import { usePublicClient, useWalletClient } from 'wagmi'

import { daoConfig } from '@/lib/dao.config'
import { IMMUTABLE_CONTROLLER, type SplitConfig } from '@/lib/splits-utils'

export interface UseSplitCreationResult {
  createSplit: (config: SplitConfig) => Promise<string | null>
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  error: Error | null
  splitAddress: string | null
  txHash: string | null
  reset: () => void
}

export function useSplitCreation(): UseSplitCreationResult {
  const [isPending, setIsPending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [splitAddress, setSplitAddress] = useState<string | null>(null)
  const [txHash, setTxHash] = useState<string | null>(null)

  const publicClient = usePublicClient({ chainId: daoConfig.chainId })
  const { data: walletClient } = useWalletClient({ chainId: daoConfig.chainId })

  const createSplit = async (config: SplitConfig): Promise<string | null> => {
    if (!walletClient || !publicClient) {
      const err = new Error('Wallet not connected')
      setError(err)
      setIsError(true)
      return null
    }

    setIsPending(true)
    setIsError(false)
    setError(null)
    setIsSuccess(false)
    setSplitAddress(null)
    setTxHash(null)

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const splitsClient = new SplitsClient({
        chainId: daoConfig.chainId,
        publicClient: publicClient as any,
        walletClient: walletClient as any,
        includeEnsNames: false,
      })

      const response = await splitsClient.splitV1.createSplit({
        recipients: config.recipients.map((r) => ({
          address: r.address,
          percentAllocation: r.percentAllocation,
        })),
        distributorFeePercent: config.distributorFeePercent,
        controller: IMMUTABLE_CONTROLLER,
      })

      const addr = response.splitAddress
      const hash = response.event?.transactionHash ?? null
      setSplitAddress(addr)
      setTxHash(hash)
      setIsSuccess(true)
      return addr
    } catch (err) {
      const e = err instanceof Error ? err : new Error('Failed to create split')
      setError(e)
      setIsError(true)
      return null
    } finally {
      setIsPending(false)
    }
  }

  const reset = () => {
    setIsPending(false)
    setIsSuccess(false)
    setIsError(false)
    setError(null)
    setSplitAddress(null)
    setTxHash(null)
  }

  return { createSplit, isPending, isSuccess, isError, error, splitAddress, txHash, reset }
}
