type ErrorStateProps = {
  message: string
  onDismiss: () => void
}

export function ErrorState({ message, onDismiss }: ErrorStateProps) {
  return (
    <div
      className="flex items-start justify-between gap-3 rounded-lg border border-red-500/40 bg-red-950/50 p-3.5 text-sm text-red-100 shadow-lg backdrop-blur-sm animate-fade-in shrink-0"
      role="alert"
      aria-atomic="true"
    >
      <div className="flex items-start gap-2.5 min-w-0">
        <svg className="h-5 w-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="leading-5 text-red-100">{message}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error message"
        className="shrink-0 rounded-md p-1 text-red-300 hover:bg-red-900/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

