import { ArrowUpRight, Check, Hourglass, Info } from 'lucide-react'

import { cn } from '@/lib/utils'

export type VotingPowerScenario = 'none' | 'delegated' | 'incoming' | 'eligible'

const COPY: Record<
  VotingPowerScenario,
  { icon: React.ReactNode; title: string; body: string }
> = {
  none: {
    icon: <Info className="h-4 w-4" />,
    title: "You can't vote on this proposal",
    body: 'You held 0 tokens at the snapshot block.',
  },
  delegated: {
    icon: <ArrowUpRight className="h-4 w-4" />,
    title: 'Your votes are delegated',
    body: 'Your voting power is delegated to 0xabc…1234. They vote on your behalf.',
  },
  incoming: {
    icon: <Hourglass className="h-4 w-4" />,
    title: 'Incoming delegation',
    body: 'An incoming delegation will become active in ~2 days.',
  },
  eligible: {
    icon: <Check className="h-4 w-4" />,
    title: 'You can vote',
    body: 'You hold 4 tokens, eligible to vote on this proposal.',
  },
}

export function VotingPowerExplainer({
  scenario = 'eligible',
  className,
}: {
  scenario?: VotingPowerScenario
  className?: string
}) {
  const c = COPY[scenario]
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-md border border-accent/25 bg-accent/5 px-4 py-3.5',
        className
      )}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent-strong">
        {c.icon}
      </div>
      <div>
        <div className="text-sm font-semibold">{c.title}</div>
        <div className="mt-0.5 text-[13px] text-muted-fg">{c.body}</div>
      </div>
    </div>
  )
}
