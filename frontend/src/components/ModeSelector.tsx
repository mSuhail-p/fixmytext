import {
  WRITING_MODE_LABELS,
  WRITING_MODES,
  type WritingMode,
} from '../types/writing'

type ModeSelectorProps = {
  value: WritingMode
  onChange: (mode: WritingMode) => void
  disabled: boolean
}

export function ModeSelector({ value, onChange, disabled }: ModeSelectorProps) {
  return (
    <fieldset className="flex flex-col gap-2 border-0 p-0 m-0" disabled={disabled}>
      <legend className="text-sm font-medium text-ink flex items-center justify-between w-full">
        <span>Writing mode</span>
        <span className="text-xs text-muted font-normal hidden sm:inline">Select output tone</span>
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Writing mode selector">
        {WRITING_MODES.map((mode) => {
          const selected = mode === value
          return (
            <button
              key={mode}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={`Writing mode: ${WRITING_MODE_LABELS[mode]}`}
              onClick={() => onChange(mode)}
              className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 disabled:cursor-not-allowed disabled:opacity-50 ${
                selected
                  ? 'border border-accent bg-accent/20 text-ink shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                  : 'border border-line bg-surface/80 text-muted hover:border-muted/60 hover:text-ink hover:bg-surface'
              }`}
            >
              {WRITING_MODE_LABELS[mode]}
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

