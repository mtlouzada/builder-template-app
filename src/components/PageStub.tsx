type Props = {
  title: string
  pr: string
  blocks?: string[]
}

export function PageStub({ title, pr, blocks }: Props) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-8">
      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-fg">
        {pr}
      </div>
      <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-fg">
        Page body lands in this PR. Scaffold (PR #0) only ships routing + chrome
        + theming.
      </p>
      {blocks && blocks.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {blocks.map((b) => (
            <span
              key={b}
              className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[12px] text-muted-fg"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
