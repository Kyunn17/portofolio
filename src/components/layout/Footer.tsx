import { site } from '../../data/portfolio'

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 font-mono text-xs text-muted sm:flex-row">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-fg" />
          <span className="font-semibold uppercase tracking-wider text-fg">{site.footer.credit}</span>
        </div>
        <div className="flex items-center gap-6 uppercase">
          <span>{site.footer.meta}</span>
          <span>All rights reserved © {site.footer.year}</span>
        </div>
      </div>
    </footer>
  )
}

