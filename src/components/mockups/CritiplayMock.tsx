import { LayoutGrid } from 'lucide-react'

/**
 * Interactive Workspace UI Mockup from Stitch (Project 03).
 */
export function CritiplayMock() {
  return (
    <div className="flex h-full w-full select-none flex-col justify-between bg-gradient-to-tr from-stone-900 via-neutral-900 to-neutral-800 p-3.5 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-5">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <LayoutGrid className="h-3 w-3 text-white/60 sm:h-3.5 sm:w-3.5" />
          <span className="font-mono text-[9px] tracking-wider text-white/50 sm:text-[10px]">
            CRITIPLAY // WORKSPACE
          </span>
        </div>
        <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[8px] text-white/40 sm:text-[9px]">
          LARAVEL REST + REACT
        </span>
      </div>

      {/* Main interactive mock */}
      <div className="my-auto space-y-2 py-2 font-mono sm:space-y-2.5">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
          <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-2.5 sm:space-y-1.5 sm:p-3">
            <div className="flex items-center justify-between">
              <span className="text-[8px] text-white/40 sm:text-[9px]">WORKFLOW</span>
              <span className="text-[8px] font-bold text-emerald-400 sm:text-[9px]">CONNECTED</span>
            </div>
            <p className="font-display text-xs font-bold text-white sm:text-sm">Interactive Session</p>
            <div className="text-[9px] text-white/50 sm:text-[10px]">Tokens &amp; reactive UI context</div>
          </div>
          <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-2.5 sm:space-y-1.5 sm:p-3">
            <div className="flex items-center justify-between">
              <span className="text-[8px] text-white/40 sm:text-[9px]">ENDPOINTS</span>
              <span className="text-[8px] text-white/50 sm:text-[9px]">SUB-25MS</span>
            </div>
            <p className="font-display text-xs font-bold text-white sm:text-sm">Laravel Pipeline</p>
            <div className="text-[9px] text-white/50 sm:text-[10px]">Sanitized responses</div>
          </div>
        </div>

        {/* Controls mock */}
        <div className="flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs sm:flex-row sm:items-center sm:p-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 sm:h-2 sm:w-2" />
            <span className="text-[10px] text-white/80 sm:text-[11px]">
              Dynamic React: Component tree synced
            </span>
          </div>
          <div className="flex gap-1.5 self-start sm:self-auto">
            <span className="rounded bg-white/10 px-2 py-0.5 text-[8px] text-white/70 sm:text-[9px]">Execute</span>
            <span className="rounded bg-white/10 px-2 py-0.5 text-[8px] text-white/70 sm:text-[9px]">Inspect</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[8px] text-white/40 sm:text-[10px]">
        <span>APPLICATION WORKFLOW</span>
        <span>PHP &amp; LARAVEL</span>
      </div>
    </div>
  )
}

