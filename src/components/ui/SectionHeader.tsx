import type { ReactNode } from 'react'

type SectionHeaderProps = {
  index: string
  kicker: string
  title: ReactNode
  /** Right-aligned mono caption (Stitch: aside / role / quote). */
  aside?: ReactNode
}

/**
 * Editorial section header from Stitch:
 * [ 02 / BIOGRAPHY ] kicker + giant Syne title, optional right caption,
 * bottom hairline divider.
 */
export function SectionHeader({ index, kicker, title, aside }: SectionHeaderProps) {
  return (
    <div className="mb-10 flex flex-col justify-between gap-3 border-b border-line pb-4 sm:mb-16 sm:gap-4 md:flex-row md:items-end">
      <div>
        <span className="kicker">
          [ {index} / {kicker} ]
        </span>
        <h2 className="mt-1 font-display text-3xl font-extrabold uppercase tracking-tight text-fg sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </div>
      {aside && <div className="max-w-xs font-mono text-xs text-muted md:text-right">{aside}</div>}
    </div>
  )
}

