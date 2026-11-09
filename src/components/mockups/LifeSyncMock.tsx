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
    <div className="flex h-full w-full select-none flex-col justify-between bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950 p-3.5 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-5">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-white/20 sm:h-2.5 sm:w-2.5" />
          </div>
          <span className="ml-1 font-mono text-[9px] tracking-wide text-white/50 sm:ml-2 sm:text-[10px]">
            LifeSync // Portal
          </span>
        </div>
        <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[8px] text-white/80 sm:text-[9px]">
          BIO-SYNC ACTIVE
        </span>
      </div>

      {/* Cards & graph grid */}
      <div className="my-auto space-y-2.5 py-2 sm:space-y-3">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
          <div className="space-y-0.5 rounded-xl border border-white/10 bg-white/5 p-2 sm:space-y-1 sm:p-3">
            <span className="block font-mono text-[8px] text-white/40 sm:text-[9px]">RECOVERY</span>
            <p className="font-display text-base font-bold text-emerald-400 sm:text-lg">94%</p>
            <span className="hidden font-mono text-[8px] text-white/40 sm:inline-block">Optimal state</span>
          </div>
          <div className="space-y-0.5 rounded-xl border border-white/10 bg-white/5 p-2 sm:space-y-1 sm:p-3">
            <span className="block font-mono text-[8px] text-white/40 sm:text-[9px]">ACTIVE</span>
            <p className="font-display text-base font-bold text-white sm:text-lg">
              420<span className="text-[10px] font-normal text-white/50 sm:text-xs">m</span>
            </p>
            <span className="hidden font-mono text-[8px] text-emerald-400 sm:inline-block">+14% avg</span>
          </div>
          <div className="space-y-0.5 rounded-xl border border-white/10 bg-white/5 p-2 sm:space-y-1 sm:p-3">
            <span className="block font-mono text-[8px] text-white/40 sm:text-[9px]">REST HR</span>
            <p className="font-display text-base font-bold text-white sm:text-lg">
              52<span className="text-[10px] font-normal text-white/50 sm:text-xs">bpm</span>
            </p>
            <span className="hidden font-mono text-[8px] text-white/40 sm:inline-block">Calibrated</span>
          </div>
        </div>

        {/* Biometric sparkline representation */}
        <div className="space-y-1.5 rounded-xl border border-white/10 bg-black/40 p-2.5 sm:space-y-2 sm:p-3.5">
          <div className="flex items-center justify-between font-mono text-[9px] sm:text-[10px]">
            <span className="text-white/70">Biometric &amp; Sleep Rhythm</span>
            <span className="text-white/40">7-DAY</span>
          </div>
          <div className="flex h-14 items-end justify-between gap-1.5 px-0.5 pt-1.5 sm:h-16 sm:gap-2 sm:px-1 sm:pt-2">
            {days.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1 sm:gap-1.5">
                <div className={`w-full rounded-xs ${d.barClass} ${d.height}`} />
                <span className={`font-mono text-[8px] ${d.labelClass}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[8px] text-white/40 sm:text-[10px]">
        <span>WELLNESS INTERFACE</span>
        <span>METRIC LOGS</span>
      </div>
    </div>
  )
}

