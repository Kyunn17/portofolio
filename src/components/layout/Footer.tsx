import { ArrowUp } from 'lucide-react'
import { site } from '../../data/portfolio'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="group flex items-center gap-2 transition-colors hover:text-fg"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>
    </footer>
  )
}

