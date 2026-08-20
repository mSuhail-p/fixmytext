import type { ReactNode } from 'react'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative flex min-h-svh w-full flex-col overflow-y-auto bg-canvas text-ink lg:h-svh lg:overflow-hidden">
      {/* Background gradients */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(34,211,238,0.08),transparent_50%)]"
        aria-hidden="true"
      />

      <div className="relative flex min-h-0 flex-1 flex-col">
        <header className="shrink-0 border-b border-line/80 bg-surface/80 backdrop-blur-md sticky top-0 z-20">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-[0.18em] text-cyan uppercase">
                  AI Writing Assistant
                </span>
                <span className="inline-flex items-center rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent border border-accent/30">
                  v1.0
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink">
                fixmytext
              </h1>
            </div>
            <p className="hidden md:block max-w-sm text-right text-xs text-muted">
              Transform rough thoughts into polished prose with instant AI rewriting.
            </p>
          </div>
        </header>
        <main className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

