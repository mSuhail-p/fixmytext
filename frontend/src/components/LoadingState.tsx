type LoadingStateProps = {
  label?: string
}

export function LoadingState({
  label = 'Improving your text with AI…',
}: LoadingStateProps) {
  return (
    <div
      className="flex h-full min-h-48 flex-col justify-between p-2 animate-fade-in"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-cyan">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-cyan shrink-0" />
          <p className="text-xs font-medium tracking-wide animate-pulse-glow">{label}</p>
        </div>

        {/* Skeleton Shimmer lines */}
        <div className="flex flex-col gap-2.5 pt-2">
          <div className="h-4 w-11/12 rounded bg-line/60 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-line/50 animate-pulse" style={{ animationDelay: '150ms' }} />
          <div className="h-4 w-9/12 rounded bg-line/40 animate-pulse" style={{ animationDelay: '300ms' }} />
          <div className="h-4 w-3/5 rounded bg-line/30 animate-pulse" style={{ animationDelay: '450ms' }} />
        </div>
      </div>

      <p className="text-[11px] text-muted/60 text-right pt-4">
        AI is crafting the optimal draft…
      </p>
    </div>
  )
}

