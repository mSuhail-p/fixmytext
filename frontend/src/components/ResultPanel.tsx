import { useState } from 'react'
import { LoadingState } from './LoadingState'

type ResultPanelProps = {
  result: string
  isLoading: boolean
}

export function ResultPanel({ result, isLoading }: ResultPanelProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for clipboard write fail
      const textArea = document.createElement('textarea')
      textArea.value = result
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-line bg-card p-4">
      <div className="flex shrink-0 items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-medium text-ink">Improved text</h2>
          <span className="h-1.5 w-1.5 rounded-full bg-cyan/80" aria-hidden="true" />
        </div>
        {result && !isLoading ? (
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-md border border-line bg-canvas/40 px-2.5 py-1 text-xs font-medium text-muted hover:bg-canvas hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/60 transition-colors"
            title="Copy to clipboard"
            aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-emerald-400 font-medium">Copied!</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        ) : null}
      </div>
      <div className="mt-3 min-h-0 flex-1 overflow-auto">
        {isLoading ? (
          <LoadingState />
        ) : result ? (
          <div className="animate-fade-in rounded-lg bg-surface/40 p-3 sm:p-4 border border-line/40">
            <p className="whitespace-pre-wrap text-sm leading-6 text-ink selection:bg-accent/30 selection:text-white">
              {result}
            </p>
          </div>
        ) : (
          <div className="flex h-full min-h-48 flex-col items-center justify-center gap-2 p-6 text-center text-muted">
            <div className="rounded-full bg-surface p-3 border border-line/60 text-muted/70">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-ink/80">No output generated yet</p>
            <p className="max-w-xs text-xs text-muted/70">
              Enter your draft text on the left, pick a writing tone, and click <strong className="text-muted">Improve Text</strong>.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

