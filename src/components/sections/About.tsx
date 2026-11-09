import { Milestone } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { about, sectionIndex, site } from '../../data/portfolio'

export function About() {
  return (
    <section id="about" className="section-shell">
      <SectionHeader
        index={sectionIndex('about')}
        kicker="BIOGRAPHY"
        title="ABOUT ME."
        aside={<span className="hidden uppercase sm:inline-block">{about.role}</span>}
      />

      {/* Split layout: 5 cols portrait / 7 cols narrative */}
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left: portrait + quick cards */}
        <Reveal className="space-y-6 lg:col-span-5">
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-card shadow-xl">
            <img
              src={about.portrait}
              alt={site.name}
              className="h-full w-full object-cover contrast-125 grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-70" />

            {/* Floating badge */}
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-line bg-bg/80 p-4 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-sm font-bold tracking-wide uppercase text-fg">{site.name}</h3>
                  <p className="font-mono text-[11px] text-muted">{about.portraitCaption}</p>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-line font-mono text-[10px] text-accent">
                  {site.monogram}
                </div>
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 gap-3 font-mono sm:grid-cols-2 sm:gap-4">
            {about.facts.map((f) => (
              <div key={f.label} className="rounded-xl border border-line bg-card p-4">
                <span className="text-xs uppercase text-muted">{f.label}</span>
                <p className="mt-1 font-display text-sm font-semibold text-fg">{f.value}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right: narrative + timeline */}
        <Reveal delay={0.15} className="flex flex-col justify-between space-y-8 sm:space-y-10 lg:col-span-7">
          <div className="space-y-4 text-base font-light leading-relaxed text-muted sm:space-y-6 sm:text-lg">
            <p className="font-display text-xl leading-snug font-normal text-fg sm:text-2xl">{about.quote}</p>
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Programming journey timeline */}
          <div className="border-t border-line pt-6">
            <h4 className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg">
              <Milestone className="h-3.5 w-3.5 shrink-0" />
              Programming Journey &amp; Milestones
            </h4>

            <div className="relative ml-2 space-y-6 border-l border-line pl-4 font-mono text-xs sm:ml-3 sm:pl-6">
              {about.timeline.map((item) => (
                <div key={item.period} className="group relative">
                  <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-muted transition-all group-hover:scale-125 group-hover:bg-fg sm:-left-[31px]" />
                  <div className="text-[10px] uppercase text-muted">{item.period}</div>
                  <h5 className="font-display text-sm font-bold uppercase text-fg">{item.title}</h5>
                  <p className="mt-1 font-sans text-xs text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

