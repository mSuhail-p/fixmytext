import type { KeyboardEvent } from 'react'

type TextEditorProps = {
  value: string
  onChange: (value: string) => void
  maxLength: number
  disabled: boolean
  onSubmit?: () => void
}

export function TextEditor({
  value,
  onChange,
  maxLength,
  disabled,
  onSubmit,
}: TextEditorProps) {
  const remaining = maxLength - value.length
  const isNearLimit = remaining <= 200

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault()
      if (onSubmit && value.trim()) {
        onSubmit()
      }
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <div className="flex shrink-0 items-center justify-between">
        <label htmlFor="draft-textarea" className="text-sm font-medium text-ink">
          Your draft
        </label>
        {value ? (
          <button
            type="button"
            onClick={() => onChange('')}
            disabled={disabled}
            className="text-xs text-muted hover:text-ink transition-colors focus-visible:outline-none focus-visible:underline disabled:opacity-50"
            aria-label="Clear draft text"
          >
            Clear
          </button>
        ) : null}
      </div>

      <textarea
        id="draft-textarea"
        value={value}
        disabled={disabled}
        maxLength={maxLength}
        placeholder="Paste or type the text you want to improve… (Ctrl + Enter to submit)"
        aria-label="Your draft text"
        aria-describedby="char-counter"
        onKeyDown={handleKeyDown}
        className="min-h-40 w-full flex-1 resize-none rounded-lg border border-line bg-surface/80 px-3.5 py-3 text-sm leading-6 text-ink outline-none placeholder:text-muted/60 focus:border-accent focus:bg-surface focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-60 transition-all"
        onChange={(event) => onChange(event.target.value)}
      />

      <div className="flex shrink-0 items-center justify-between text-xs text-muted">
        <span className="hidden sm:inline text-[11px] opacity-70">
          Tip: Press <kbd className="rounded border border-line bg-surface px-1 text-[10px]">Ctrl</kbd> + <kbd className="rounded border border-line bg-surface px-1 text-[10px]">Enter</kbd> to submit
        </span>
        <span
          id="char-counter"
          className={`ml-auto font-mono transition-colors ${
            isNearLimit ? 'text-amber-400 font-semibold' : 'text-muted'
          }`}
        >
          {remaining.toLocaleString()} chars remaining
        </span>
      </div>
    </div>
  )
}

