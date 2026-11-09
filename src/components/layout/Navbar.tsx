import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { sectionIds, sections, site } from '../../data/portfolio'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useTheme } from '../../hooks/useTheme'

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-line bg-bg/80 px-6 py-3 shadow-lg backdrop-blur-md">
        {/* Monogram / brand */}
        <a href="#hero" className="group flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-fg font-display text-sm font-bold tracking-tighter text-bg transition-transform duration-300 group-hover:rotate-12">
            {site.monogram}
          </span>
          <span className="hidden font-display text-xs font-semibold uppercase tracking-widest sm:inline-block">
            {site.name}
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 font-mono text-xs uppercase tracking-wider text-muted md:flex">
          {sections.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? 'true' : undefined}
              className={`transition-colors hover:text-fg ${active === s.id ? 'font-bold text-fg' : ''}`}
            >
              {String(i + 1).padStart(2, '0')}. {s.label}
            </a>
          ))}
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase text-muted lg:flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {site.availability}
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to clean theme' : 'Switch to dark theme'}
            className="flex items-center justify-center rounded-full border border-line p-2 text-fg transition-colors hover:bg-card"
          >
            {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-full border border-line p-2 text-fg md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-7xl rounded-3xl border border-line bg-bg p-5 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col gap-4 font-mono text-xs uppercase tracking-wider text-muted">
              {sections.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={`py-2 hover:text-fg ${i < sections.length - 1 ? 'border-b border-line' : ''} ${active === s.id ? 'font-bold text-fg' : ''}`}
                >
                  {String(i + 1).padStart(2, '0')}. {s.mobileLabel}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

