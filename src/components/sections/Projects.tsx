import { ArrowUpRight } from 'lucide-react'
import { BrandIcon } from '../ui/BrandIcon'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { projects, sectionIndex } from '../../data/portfolio'

export function Projects() {
  return (
    <section id="projects" className="section-shell">
      <SectionHeader
        index={sectionIndex('projects')}
        kicker="SELECTED WORKS"
        title="THINGS I'VE BUILT."
        aside="Exploring ideas, solving problems, and turning concepts into functional digital experiences."
      />

      {/* Asymmetric alternating gallery (7/5 split) */}
      <div className="space-y-16 sm:space-y-24">
        {projects.map((p, i) => {
          const isReverse = i === 1 // Project 02 flips: details left, mockup right
          const num = String(i + 1).padStart(2, '0')

          const projectVisualNode = (
            <div
              className={`group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-xl lg:col-span-7 ${
                isReverse ? 'order-1 lg:order-2' : ''
              }`}
            >
              {/* Browser Window Header */}
              <div className="flex items-center justify-between border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-line bg-neutral-400/30" />
                  <span className="h-2.5 w-2.5 rounded-full border border-line bg-neutral-400/30" />
                  <span className="h-2.5 w-2.5 rounded-full border border-line bg-neutral-400/30" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-0.5 font-mono text-[11px] text-muted">
                  <span className="text-muted/60">app://</span>
                  <span className="text-fg font-medium">{p.title.toLowerCase().replace(/\s+/g, '-')}.prod</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-muted uppercase">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      p.live && p.live !== '#' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                  <span className="hidden sm:inline">
                    {p.live && p.live !== '#' ? 'LIVE DEPLOYMENT' : 'CASE STUDY'}
                  </span>
                </div>
              </div>

              {/* Project Screenshot Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-bg">
                <img
                  src={p.image}
                  alt={`Production screenshot of ${p.title}`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/30 via-transparent to-transparent opacity-50" />
              </div>
            </div>
          )

          const detailsNode = (
            <div
              className={`space-y-5 lg:col-span-5 ${isReverse ? 'order-2 lg:order-1 lg:pr-4' : 'lg:pl-4'}`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-bold text-accent">{num}/</span>
                <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {p.category}
                </span>
              </div>

              <h3 className="font-display text-3xl font-bold uppercase leading-tight text-fg transition-colors group-hover:text-accent sm:text-4xl">
                {p.title}
              </h3>

              <p className="text-sm font-light leading-relaxed text-muted sm:text-base">{p.description}</p>

              {/* Feature bullets */}
              <div
                className={`grid gap-2 pt-1 font-mono text-xs text-muted ${
                  p.featureColumns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'space-y-1.5'
                }`}
              >
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-fg" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Stack & contribution */}
              <div className="space-y-2 border-t border-line pt-2 font-mono text-xs">
                <div className="text-muted">
                  <span className="font-bold text-fg">TECH STACK:</span> {p.stack}
                </div>
                <div className="text-muted">
                  <span className="font-bold text-fg">CONTRIBUTION:</span> {p.contribution}
                </div>
              </div>

              {/* Links */}
              <div className="flex items-center gap-4 pt-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-fg hover:underline"
                >
                  <BrandIcon name="github" className="h-4 w-4" />
                  <span>GitHub Source</span>
                </a>
                {p.live && p.live !== '#' ? (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-fg hover:underline"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                    <span>Live Showcase</span>
                  </a>
                ) : (
                  <span className="flex items-center gap-2 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>Demo on Request</span>
                  </span>
                )}
              </div>
            </div>
          )

          return (
            <Reveal key={p.title}>
              <article className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                {projectVisualNode}
                {detailsNode}
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

