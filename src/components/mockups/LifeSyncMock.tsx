/**
 * Health & Wellness Portal UI Mockup from Stitch (Project 02).
 */
export function LifeSyncMock() {
  const days = [
    { day: 'M', height: 'h-10', barClass: 'bg-white/20', labelClass: 'text-white/40' },
    { day: 'T', height: 'h-12', barClass: 'bg-white/30', labelClass: 'text-white/40' },
    { day: 'W', height: 'h-8', barClass: 'bg-white/20', labelClass: 'text-white/40' },
    { day: 'T', height: 'h-14', barClass: 'bg-white/40', labelClass: 'text-white/40' },
    { day: 'F', height: 'h-16', barClass: 'bg-emerald-500/60', labelClass: 'text-emerald-400 font-bold' },
    { day: 'S', height: 'h-11', barClass: 'bg-white/30', labelClass: 'text-white/40' },
    { day: 'S', height: 'h-9', barClass: 'bg-white/25', labelClass: 'text-white/40' },
  ]

  return (
    <div className="flex h-full w-full select-none flex-col justify-between bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950 p-5 transition-transform duration-700 ease-out group-hover:scale-105">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>
          <span className="ml-2 font-mono text-[10px] tracking-wide text-white/50">
            LifeSync // Health &amp; Wellness Portal
          </span>
        </div>
        <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[9px] text-white/80">BIO-SYNC ACTIVE</span>
      </div>

      {/* Cards & graph grid */}
      <div className="my-auto space-y-3 py-2">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="block font-mono text-[9px] text-white/40">RECOVERY SCORE</span>
            <p className="font-display text-lg font-bold text-emerald-400">94%</p>
            <span className="font-mono text-[8px] text-white/40">Optimal state</span>
          </div>
          <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="block font-mono text-[9px] text-white/40">ACTIVE MINUTES</span>
            <p className="font-display text-lg font-bold text-white">
              420<span className="text-xs font-normal text-white/50">m</span>
            </p>
            <span className="font-mono text-[8px] text-emerald-400">+14% vs avg</span>
          </div>
          <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="block font-mono text-[9px] text-white/40">RESTING HR</span>
            <p className="font-display text-lg font-bold text-white">
              52 <span className="text-xs font-normal text-white/50">bpm</span>
            </p>
            <span className="font-mono text-[8px] text-white/40">Calibrated</span>
          </div>
        </div>

        {/* Biometric sparkline representation */}
        <div className="space-y-2 rounded-xl border border-white/10 bg-black/40 p-3.5">
          <div className="flex items-center justify-between font-mono text-[10px]">
            <span className="text-white/70">Weekly Biometric &amp; Sleep Rhythm Trends</span>
            <span className="text-white/40">7-DAY WINDOW</span>
          </div>
          <div className="flex h-16 items-end justify-between gap-2 px-1 pt-2">
            {days.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <div className={`w-full rounded-xs ${d.barClass} ${d.height}`} />
                <span className={`font-mono text-[8px] ${d.labelClass}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[10px] text-white/40">
        <span>UNIFIED WELLNESS INTERFACE</span>
        <span>REACTIVE METRIC LOGS</span>
      </div>
    </div>
  )
}

