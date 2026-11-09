import { LayoutGrid } from 'lucide-react'

/**
 * Interactive Workspace UI Mockup from Stitch (Project 03).
 */
export function CritiplayMock() {
  return (
    <div className="flex h-full w-full select-none flex-col justify-between bg-gradient-to-tr from-stone-900 via-neutral-900 to-neutral-800 p-5 transition-transform duration-700 ease-out group-hover:scale-105">
      {/* Window header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-3.5 w-3.5 text-white/60" />
          <span className="font-mono text-[10px] tracking-wider text-white/50">
            CRITIPLAY // INTERACTIVE WORKSPACE
          </span>
        </div>
        <span className="rounded border border-white/10 px-2 py-0.5 font-mono text-[9px] text-white/40">
          LARAVEL REST + REACT
        </span>
      </div>

      {/* Main interactive mock */}
      <div className="my-auto space-y-2.5 py-2 font-mono">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/40">WORKFLOW STATUS</span>
              <span className="text-[9px] font-bold text-emerald-400">CONNECTED</span>
            </div>
            <p className="font-display text-sm font-bold text-white">Interactive Session State</p>
            <div className="text-[10px] text-white/50">Authenticated user tokens &amp; reactive UI context</div>
          </div>
          <div className="space-y-1.5 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-white/40">REST ENDPOINTS</span>
              <span className="text-[9px] text-white/50">SUB-25MS</span>
            </div>
            <p className="font-display text-sm font-bold text-white">Laravel Controller Pipeline</p>
            <div className="text-[10px] text-white/50">Sanitized payloads &amp; structured responses</div>
          </div>
        </div>

        {/* Controls mock */}
        <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/40 p-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-white/80">Dynamic React State: Component tree synchronized</span>
          </div>
          <div className="flex gap-1.5">
            <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] text-white/70">Execute</span>
            <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] text-white/70">Inspect</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[10px] text-white/40">
        <span>STRUCTURED APPLICATION WORKFLOW</span>
        <span>PHP &amp; LARAVEL CORE</span>
      </div>
    </div>
  )
}

