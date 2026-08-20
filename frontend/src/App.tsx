import { useState } from 'react'
import { ErrorState } from './components/ErrorState'
import { Layout } from './components/Layout'
import { ModeSelector } from './components/ModeSelector'
import { ResultPanel } from './components/ResultPanel'
import { TextEditor } from './components/TextEditor'
import { rewriteText } from './services/api'
import { MAX_DRAFT_LENGTH, type WritingMode } from './types/writing'

export default function App() {
  const [text, setText] = useState('')
  const [mode, setMode] = useState<WritingMode>('professional')
  const [result, setResult] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleImprove() {
    const trimmed = text.trim()
    if (!trimmed) {
      setError('Enter some text to improve.')
      return
    }
    if (trimmed.length > MAX_DRAFT_LENGTH) {
      setError(`Text must be at most ${MAX_DRAFT_LENGTH} characters.`)
      return
    }

    setError(null)
    setIsLoading(true)
    setResult('')

    try {
      const response = await rewriteText(trimmed, mode)
      setResult(response.result)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while processing your request.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout>
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden">
        {error ? (
          <ErrorState message={error} onDismiss={() => setError(null)} />
        ) : null}

        <div className="grid min-h-0 flex-1 gap-4 overflow-hidden lg:grid-cols-2">
          <section className="flex min-h-0 flex-col gap-4 overflow-hidden rounded-xl border border-line bg-card p-4">
            <ModeSelector
              value={mode}
              onChange={setMode}
              disabled={isLoading}
            />
            <TextEditor
              value={text}
              onChange={setText}
              maxLength={MAX_DRAFT_LENGTH}
              disabled={isLoading}
              onSubmit={handleImprove}
            />
            <div className="mt-auto pt-2 shrink-0 flex items-center justify-between gap-3 border-t border-line/60">
              <span className="text-[11px] text-muted hidden sm:inline">
                Ready to improve notes into structured text
              </span>
              <button
                type="button"
                onClick={handleImprove}
                disabled={isLoading || !text.trim()}
                className="ml-auto rounded-lg bg-accent px-5 py-2 text-sm font-semibold text-canvas hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 shadow-md hover:shadow-accent/25 disabled:cursor-not-allowed disabled:opacity-50 transition-all flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-canvas" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Improving…</span>
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Improve Text</span>
                  </>
                )}
              </button>
            </div>
          </section>

          <ResultPanel result={result} isLoading={isLoading} />
        </div>
      </div>
    </Layout>
  )
}

