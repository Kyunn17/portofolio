import { Award } from 'lucide-react'
import { SectionHeader } from '../ui/SectionHeader'
import {
  certificates,
  certificatesEmptyState,
  sectionIndex,
} from '../../data/portfolio'

export function Certificates() {
  return (
    <section id="certificates" className="section-shell">
      <SectionHeader
        index={sectionIndex('certificates')}
        kicker="ACCREDITATIONS"
        title="CERTIFICATIONS &amp; ACHIEVEMENTS."
        aside={<span className="font-mono text-xs text-muted uppercase">ROADMAP &amp; VALIDATION</span>}
      />

      {certificates.length === 0 ? (
        /* Minimalist Intentional Empty State Container */
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-line bg-card/50 p-12 text-center md:p-16">
          <div className="mx-auto max-w-xl space-y-6">
            {/* Geometric Graphic Placeholder */}
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-bg text-accent shadow-sm">
              <Award className="h-7 w-7" />
            </div>

            <div>
              <h3 className="font-display text-3xl font-black uppercase tracking-tight text-fg sm:text-4xl">
                {certificatesEmptyState.title}
              </h3>
              <p className="mt-3 font-mono text-sm leading-relaxed text-muted">
                {certificatesEmptyState.subtitle}
              </p>
            </div>

            <p className="mx-auto max-w-md font-sans text-xs text-muted">
              {certificatesEmptyState.body}
            </p>

            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-bg px-4 py-2 font-mono text-[11px] text-accent">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="uppercase">{certificatesEmptyState.inProgress}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="rounded-2xl border border-line bg-card p-6 transition-all hover:border-fg"
            >
              <span className="font-mono text-xs text-muted">{cert.year}</span>
              <h3 className="mt-2 font-display text-lg font-bold text-fg">{cert.title}</h3>
              <p className="mt-1 font-mono text-xs text-muted">{cert.issuer}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

