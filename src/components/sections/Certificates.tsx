import { useState } from 'react'
import {
  Award,
  ArrowUpRight,
  FileText,
  BookOpen,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Clock,
  Calendar,
} from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import {
  certificates,
  certificatesEmptyState,
  sectionIndex,
} from '../../data/portfolio'

export function Certificates() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'preview' | 'syllabus'>('preview')
  const [copiedId, setCopiedId] = useState(false)

  const activeCert = certificates[selectedIndex]

  const handleCopyCredential = async (credentialId: string) => {
    try {
      await navigator.clipboard.writeText(credentialId)
      setCopiedId(true)
      setTimeout(() => setCopiedId(false), 2000)
    } catch {
      // Fallback ignored if clipboard blocked
    }
  }

  return (
    <section id="certificates" className="section-shell">
      <SectionHeader
        index={sectionIndex('certificates')}
        kicker="ACCREDITATIONS"
        title="CERTIFICATIONS &amp; ACHIEVEMENTS."
        aside={
          <span className="font-mono text-xs text-muted uppercase">
            VERIFIED COMPETENCY &amp; CREDENTIAL ARCHIVE
          </span>
        }
      />

      {!activeCert ? (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-line bg-card/50 p-12 text-center md:p-16">
          <div className="mx-auto max-w-xl space-y-6">
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
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Multi-certificate selector bar (automatically renders if >1 certificate exists) */}
          {certificates.length > 1 && (
            <div
              role="tablist"
              aria-label="Select certificate"
              className="flex flex-wrap items-center gap-2 border-b border-line pb-4 font-mono text-xs"
            >
              {certificates.map((cert, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={cert.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedIndex(idx)}
                    className={`rounded-full px-4 py-2 text-[11px] uppercase tracking-wider transition-colors ${
                      isSelected
                        ? 'border border-fg bg-fg font-bold text-bg'
                        : 'border border-line bg-card text-muted hover:border-fg hover:text-fg'
                    }`}
                  >
                    {String(idx + 1).padStart(2, '0')}. {cert.title}
                  </button>
                )
              })}
            </div>
          )}

          {/* Asymmetric 12-Column Split: 7 Cols Document Viewer / 5 Cols Credential Dossier */}
          <Reveal>
            <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
              {/* ======================================================== */}
              {/* LEFT (Cols 1-7): Document Viewer & Curriculum Breakdown  */}
              {/* ======================================================== */}
              <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-card shadow-xl lg:col-span-7">
                {/* Document Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg/90 px-4 py-3 backdrop-blur-sm sm:px-5">
                  {/* View Switcher Tabs */}
                  <div
                    role="group"
                    aria-label="Certificate inspection view"
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-card p-1 font-mono"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveTab('preview')}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                        activeTab === 'preview'
                          ? 'bg-fg font-bold text-bg'
                          : 'text-muted hover:text-fg'
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Document PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('syllabus')}
                      className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] uppercase tracking-wider transition-colors ${
                        activeTab === 'syllabus'
                          ? 'bg-fg font-bold text-bg'
                          : 'text-muted hover:text-fg'
                      }`}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>Syllabus ({activeCert.totalHours})</span>
                    </button>
                  </div>

                  {/* Direct File Actions */}
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <a
                      href={activeCert.pdfUrl}
                      download
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-muted transition-colors hover:border-fg hover:text-fg"
                      title="Download original PDF certificate"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                    <a
                      href={activeCert.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 text-fg transition-colors hover:border-fg"
                    >
                      <span>Full View</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Tab 1: Embedded PDF Viewer */}
                {activeTab === 'preview' ? (
                  <div className="relative aspect-[16/11] w-full bg-bg">
                    <iframe
                      src={`${activeCert.pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
                      title={`${activeCert.title} — Official Certificate PDF`}
                      className="h-full w-full border-0"
                      loading="lazy"
                    />
                    {/* Bottom status strip over viewer */}
                    <div className="flex items-center justify-between border-t border-line bg-bg/95 px-4 py-2.5 font-mono text-[11px] text-muted">
                      <span>SOURCE: {activeCert.pdfUrl}</span>
                      <span>2 PAGES (CERTIFICATE + TRANSCRIPT)</span>
                    </div>
                  </div>
                ) : (
                  /* Tab 2: Page 2 Curriculum & Competency Transcript */
                  <div className="flex flex-col justify-between space-y-6 bg-bg p-5 sm:p-7">
                    <div className="flex flex-col justify-between gap-2 border-b border-line pb-4 sm:flex-row sm:items-center">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                          PAGE 02 // OFFICIAL CURRICULUM TRANSCRIPT
                        </span>
                        <h4 className="mt-0.5 font-display text-lg font-bold uppercase text-fg">
                          Verified Syllabus &amp; Study Breakdown
                        </h4>
                      </div>
                      <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-line bg-card px-3 py-1 font-mono text-[11px] font-bold text-fg sm:self-auto">
                        <Clock className="h-3.5 w-3.5 text-accent" />
                        <span>{activeCert.totalHours} Total</span>
                      </span>
                    </div>

                    <div className="space-y-3 font-mono">
                      {activeCert.modules.map((mod) => (
                        <div
                          key={mod.title}
                          className="rounded-2xl border border-line bg-card p-4 transition-colors hover:border-fg/60"
                        >
                          <div className="flex items-baseline justify-between gap-2">
                            <h5 className="font-display text-sm font-bold text-fg">
                              {mod.title}
                            </h5>
                            <span className="shrink-0 rounded border border-line bg-bg px-2 py-0.5 text-[11px] font-semibold text-accent">
                              {mod.duration}
                            </span>
                          </div>
                          <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted">
                            {mod.summary}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] text-muted">
                      <span>EVALUATION: FINAL COMPETENCY EXAM PASSED</span>
                      <span>SIGNED: {activeCert.signatory}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ======================================================== */}
              {/* RIGHT (Cols 8-12): Accreditation Dossier & Verification  */}
              {/* ======================================================== */}
              <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
                <div className="space-y-4">
                  {/* Issuer & Partner Header */}
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 font-bold uppercase tracking-wider text-fg">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{activeCert.issuer}</span>
                    </span>
                    <span className="rounded-full border border-line px-3 py-1 text-muted">
                      {activeCert.partnerBadge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-tight text-fg sm:text-3xl">
                      {activeCert.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs text-accent">
                      {activeCert.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm font-light leading-relaxed text-muted sm:text-base">
                    {activeCert.description}
                  </p>
                </div>

                {/* Verifiable Credential Metadata Grid */}
                <div className="grid grid-cols-1 gap-3 font-mono sm:grid-cols-2">
                  {/* Credential ID with 1-Click Copy */}
                  <div className="rounded-2xl border border-line bg-card p-3.5">
                    <span className="block text-[11px] uppercase text-muted">
                      CREDENTIAL ID
                    </span>
                    <div className="mt-1 flex items-center justify-between gap-2">
                      <span className="font-bold tracking-wider text-fg text-xs">
                        {activeCert.credentialId}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyCredential(activeCert.credentialId)}
                        className="inline-flex items-center gap-1 rounded-md border border-line bg-bg px-2 py-1 text-[11px] text-muted transition-colors hover:border-fg hover:text-fg"
                        aria-label="Copy credential ID"
                      >
                        {copiedId ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-500" />
                            <span>COPIED</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>COPY</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Study Load */}
                  <div className="rounded-2xl border border-line bg-card p-3.5">
                    <span className="block text-[11px] uppercase text-muted">
                      CURRICULUM VOLUME
                    </span>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-fg">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      <span>{activeCert.totalHours} (4 Modules)</span>
                    </p>
                  </div>

                  {/* Issue Date */}
                  <div className="rounded-2xl border border-line bg-card p-3.5">
                    <span className="block text-[11px] uppercase text-muted">
                      ISSUED DATE
                    </span>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-bold text-fg">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      <span>{activeCert.issuedDate}</span>
                    </p>
                  </div>

                  {/* Expiration Date */}
                  <div className="rounded-2xl border border-line bg-card p-3.5">
                    <span className="block text-[11px] uppercase text-muted">
                      VALID UNTIL
                    </span>
                    <p className="mt-1 text-xs font-bold text-fg">
                      {activeCert.validUntil}
                    </p>
                  </div>
                </div>

                {/* Verified Competencies */}
                <div className="space-y-2 border-t border-line pt-4 font-mono">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-fg">
                    VERIFIED COMPETENCIES:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCert.competencies.map((comp) => (
                      <span
                        key={comp}
                        className="rounded-lg border border-line bg-card px-2.5 py-1 text-[11px] text-muted"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Primary Verification Actions */}
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-fg px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-bg transition-transform hover:scale-[1.02]"
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a
                    href={activeCert.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-line bg-card px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-fg"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Open PDF</span>
                  </a>
                </div>
              </div>
            </article>
          </Reveal>

          {/* Understated Editorial Roadmap Footnote */}
          <div className="flex flex-col items-start justify-between gap-2 rounded-2xl border border-line bg-card/50 px-5 py-3.5 font-mono text-xs text-muted sm:flex-row sm:items-center">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="uppercase">{certificatesEmptyState.inProgress}</span>
            </div>
            <span className="text-[11px]">DICODING.COM/CERTIFICATES/{activeCert.credentialId}</span>
          </div>
        </div>
      )}
    </section>
  )
}
