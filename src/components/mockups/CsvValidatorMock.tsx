/**
 * Rich Databricks & CSV Validator UI Mockup from Stitch (Project 01).
 */
export function CsvValidatorMock() {
  return (
    <div className="flex h-full w-full select-none flex-col justify-between bg-gradient-to-br from-neutral-900 to-neutral-950 p-3.5 transition-transform duration-700 ease-out group-hover:scale-105 sm:p-5">
      {/* Top browser bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 sm:pb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-rose-500/80 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-amber-500/80 sm:h-2.5 sm:w-2.5" />
            <div className="h-2 w-2 rounded-full bg-emerald-500/80 sm:h-2.5 sm:w-2.5" />
          </div>
          <span className="ml-1 font-mono text-[9px] tracking-wide text-white/50 sm:ml-2 sm:text-[10px]">
            CSV Schema Validator
          </span>
        </div>
        <span className="flex items-center gap-1.5 rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[8px] text-emerald-300 sm:text-[9px]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          DATABRICKS
        </span>
      </div>

      {/* Main simulation body */}
      <div className="my-auto space-y-2.5 py-2 sm:space-y-3">
        {/* Uploaded file pill */}
        <div className="flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-2.5 sm:flex-row sm:items-center sm:p-3">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 font-mono text-xs font-bold text-emerald-300 sm:h-7 sm:w-7">
              CSV
            </div>
            <div>
              <div className="font-mono text-[10px] font-medium text-white sm:text-[11px]">
                dataset_v3_production.csv <span className="text-white/40">(14.2 MB)</span>
              </div>
              <div className="font-mono text-[8px] text-white/50 sm:text-[9px]">
                Schema: Financial_Audit_v2 • 12,480 Records
              </div>
            </div>
          </div>
          <span className="self-start rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[9px] text-emerald-400 sm:self-auto sm:px-2.5 sm:py-1 sm:text-[10px]">
            98.4% VALIDATED
          </span>
        </div>

        {/* Mini validation grid with mobile scroll resilience */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-2 font-mono text-[9px] sm:p-2.5 sm:text-[10px]">
          <div className="min-w-[280px] space-y-1 sm:space-y-1.5">
            <div className="grid grid-cols-12 border-b border-white/10 pb-1 text-[8px] text-white/40 sm:text-[9px]">
              <span className="col-span-2">ROW</span>
              <span className="col-span-4">COLUMN_NAME</span>
              <span className="col-span-3">RULE / TYPE</span>
              <span className="col-span-3 text-right">STATUS</span>
            </div>
            <div className="grid grid-cols-12 items-center py-0.5 text-white/80">
              <span className="col-span-2 text-white/40">#0001</span>
              <span className="col-span-4">transaction_id</span>
              <span className="col-span-3 text-white/50">UUID / Not Null</span>
              <span className="col-span-3 text-right text-emerald-400">✔ Valid</span>
            </div>
            <div className="grid grid-cols-12 items-center border-t border-white/5 py-0.5 text-white/80">
              <span className="col-span-2 text-white/40">#0002</span>
              <span className="col-span-4">settlement_amount</span>
              <span className="col-span-3 text-white/50">Decimal / Positive</span>
              <span className="col-span-3 text-right text-emerald-400">✔ Valid</span>
            </div>
            <div className="grid grid-cols-12 items-center border-t border-white/5 py-0.5 text-white/80">
              <span className="col-span-2 text-amber-300/80">#0003</span>
              <span className="col-span-4">iso_country_code</span>
              <span className="col-span-3 text-white/50">Regex / ^[A-Z]&#123;2&#125;$</span>
              <span className="col-span-3 text-right text-amber-300">Mismatch</span>
            </div>
          </div>
        </div>

        {/* Databricks transfer bar */}
        <div className="space-y-1 rounded-lg border border-white/10 bg-white/5 p-2 sm:space-y-1.5 sm:p-2.5">
          <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9px]">
            <span className="truncate pr-2 text-white/60">/mnt/lakehouse/raw</span>
            <span className="shrink-0 font-bold text-emerald-400">12,280 / 12,480</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[94%] bg-emerald-400" />
          </div>
        </div>
      </div>

      {/* Meta footer */}
      <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[8px] text-white/40 sm:text-[10px]">
        <span>SCHEMA ENGINE</span>
        <span>LAKEHOUSE PIPELINE</span>
      </div>
    </div>
  )
}

