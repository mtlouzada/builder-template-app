'use client'

import { governorAbi } from '@buildeross/sdk/contract'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useChainId,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'

import { VotingPowerExplainer } from '@/components/dao/VotingPowerExplainer'
import { Button } from '@/components/ui/button'
import { daoConfig } from '@/lib/dao.config'
import { cn } from '@/lib/utils'

type Choice = 'for' | 'against' | 'abstain'

const SUPPORT: Record<Choice, number> = {
  against: 0,
  for: 1,
  abstain: 2,
}

type Props = {
  proposalIdHash: `0x${string}`
  /** Wallet's voting power at the proposal's snapshot block. Resolved from
   * the connected wallet in a follow-up; for now, callers pass a static
   * estimate or 0. The form gates on this. */
  votingPower?: number
  initialChoice?: Choice | null
  /** Whether voting is open (proposal is in active state). */
  active?: boolean
}

export function VotePanel({
  proposalIdHash,
  votingPower = 0,
  initialChoice = null,
  active = true,
}: Props) {
  const [choice, setChoice] = useState<Choice | null>(initialChoice)
  const [reason, setReason] = useState('')

  const { address, isConnected } = useAccount()
  const connectedChainId = useChainId()
  const { openConnectModal } = useConnectModal()
  const { switchChain, isPending: isSwitching } = useSwitchChain()

  const onWrongChain = isConnected && connectedChainId !== daoConfig.chainId

  const {
    writeContract,
    data: txHash,
    isPending: isWriting,
    error: writeError,
    reset: resetWrite,
  } = useWriteContract()

  const {
    isLoading: isMining,
    isSuccess: isMined,
    error: mineError,
  } = useWaitForTransactionReceipt({ hash: txHash })

  // Clear the choice form on successful mine after a beat.
  useEffect(() => {
    if (!isMined) return
    const t = setTimeout(() => {
      setChoice(null)
      setReason('')
      resetWrite()
    }, 2400)
    return () => clearTimeout(t)
  }, [isMined, resetWrite])

  const submit = () => {
    if (!choice) return
    writeContract({
      address: daoConfig.addresses.governor as `0x${string}`,
      abi: governorAbi,
      functionName: 'castVoteWithReason',
      args: [proposalIdHash, BigInt(SUPPORT[choice]), reason],
    })
  }

  const phase: 'idle' | 'connect' | 'switch' | 'sign' | 'mine' | 'done' | 'error' =
    !isConnected
      ? 'connect'
      : onWrongChain
        ? 'switch'
        : isWriting
          ? 'sign'
          : isMining
            ? 'mine'
            : isMined
              ? 'done'
              : writeError || mineError
                ? 'error'
                : 'idle'

  return (
    <aside className="sticky top-20 flex flex-col gap-3.5 rounded-xl border border-border bg-surface px-6 py-[22px]">
      <h3 className="text-base font-bold">Cast your vote</h3>
      <VotingPowerExplainer
        scenario={
          !isConnected
            ? 'none'
            : votingPower > 0
              ? 'eligible'
              : 'none'
        }
      />

      <div className="grid grid-cols-3 gap-2">
        <ChoiceBtn
          label="For"
          active={choice === 'for'}
          onClick={() => setChoice('for')}
          color="for"
          disabled={!active || phase === 'sign' || phase === 'mine'}
        />
        <ChoiceBtn
          label="Against"
          active={choice === 'against'}
          onClick={() => setChoice('against')}
          color="against"
          disabled={!active || phase === 'sign' || phase === 'mine'}
        />
        <ChoiceBtn
          label="Abstain"
          active={choice === 'abstain'}
          onClick={() => setChoice('abstain')}
          color="abstain"
          disabled={!active || phase === 'sign' || phase === 'mine'}
        />
      </div>

      <textarea
        rows={3}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Optional reason…"
        disabled={!active || phase === 'sign' || phase === 'mine'}
        className="w-full resize-y rounded-md border border-border bg-surface px-3 py-2.5 text-[13px] outline-none focus:border-accent disabled:opacity-60"
      />

      {phase === 'connect' ? (
        <Button onClick={() => openConnectModal?.()} className="w-full">
          Connect wallet to vote
        </Button>
      ) : phase === 'switch' ? (
        <Button
          onClick={() => switchChain({ chainId: daoConfig.chainId })}
          className="w-full"
          disabled={isSwitching}
        >
          {isSwitching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          Switch to {chainNameOf(daoConfig.chainId)}
        </Button>
      ) : (
        <Button
          onClick={submit}
          disabled={!active || !choice || phase === 'sign' || phase === 'mine'}
          className="w-full"
        >
          {phase === 'sign' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Confirm in wallet…
            </>
          )}
          {phase === 'mine' && (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          )}
          {phase === 'done' && 'Vote submitted ✓'}
          {(phase === 'idle' || phase === 'error') && 'Submit vote'}
        </Button>
      )}

      {phase === 'error' && (
        <div className="text-[12.5px] text-destructive">
          {parseWriteError(writeError ?? mineError)}
        </div>
      )}

      {address && (
        <div className="text-[12.5px] text-muted-fg">
          Voting as <strong className="font-mono">{short(address)}</strong>
          {votingPower > 0 && (
            <>
              {' '}
              · <strong className="font-semibold">{votingPower} votes</strong>
            </>
          )}
        </div>
      )}
    </aside>
  )
}

function ChoiceBtn({
  label,
  active,
  onClick,
  color,
  disabled,
}: {
  label: string
  active: boolean
  onClick: () => void
  color: 'for' | 'against' | 'abstain'
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'rounded-md border border-border bg-surface px-2 py-2.5 text-[13px] font-semibold text-fg transition-colors hover:bg-surface-2 disabled:opacity-50',
        active &&
          color === 'for' &&
          'border-vote-for bg-vote-for/15 text-vote-for',
        active &&
          color === 'against' &&
          'border-vote-against bg-vote-against/15 text-vote-against',
        active &&
          color === 'abstain' &&
          'border-border-strong bg-surface-2 text-fg'
      )}
    >
      {label}
    </button>
  )
}

function short(addr: string) {
  if (!addr || addr.length < 10) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`
}

function chainNameOf(id: number): string {
  return (
    {
      1: 'Ethereum',
      10: 'Optimism',
      8453: 'Base',
      7777777: 'Zora',
    }[id] ?? `Chain ${id}`
  )
}

function parseWriteError(err: unknown): string {
  if (!err) return 'Something went wrong.'
  const msg = err instanceof Error ? err.message : String(err)
  if (/User rejected|user rejected/i.test(msg)) return 'Transaction rejected.'
  if (/insufficient funds/i.test(msg)) return 'Insufficient funds for gas.'
  // Strip viem boilerplate after the first newline.
  return msg.split('\n')[0]
}
