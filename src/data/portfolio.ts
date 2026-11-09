/**
 * Single source of truth for site content.
 *
 * Text is taken verbatim from the Stitch "Editorial Developer Portfolio"
 * design. Items marked `// TODO(confirm)` have NOT been confirmed by Khairul —
 * replace or confirm them before publishing.
 */
import type { LucideIcon } from 'lucide-react'
import {
  Atom,
  Binary,
  Box,
  Cloud,
  Code,
  Database,
  FileCode,
  GitBranch,
  Layers,
  Palette,
  Server,
  ShieldCheck,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Site / navigation                                                    */
/* ------------------------------------------------------------------ */

export const site = {
  name: 'Khairul Faridz',
  monogram: 'KF',
  availability: 'Open for work',
  email: 'arulxxds@gmail.com', // TODO(confirm) — placeholder address
  footer: {
    credit: 'Designed & built by Khairul Faridz.',
    meta: 'Single-page React oriented',
    year: 2026,
  },
} as const

/** Section order follows the project brief (Social before Certificates). */
export const sections = [
  { id: 'hero', label: 'Home', mobileLabel: 'Home' },
  { id: 'about', label: 'About', mobileLabel: 'About' },
  { id: 'projects', label: 'Works', mobileLabel: 'Works' },
  { id: 'stack', label: 'Stack', mobileLabel: 'Stack' },
  { id: 'gym', label: 'Beyond', mobileLabel: 'Beyond The Code' },
  { id: 'certificates', label: 'Certs', mobileLabel: 'Certifications' },
  { id: 'contact', label: 'Connect', mobileLabel: 'Connect' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const sectionIds = sections.map((s) => s.id)

/** "01", "02", … based on position in `sections`. */
export function sectionIndex(id: SectionId) {
  return String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0')
}

/* ------------------------------------------------------------------ */
/* Social                                                               */
/* ------------------------------------------------------------------ */

export type SocialKey = 'github' | 'linkedin' | 'instagram'

export const socials: { key: SocialKey; label: string; short: string; handle: string; href: string }[] = [
  { key: 'github', label: 'GitHub', short: 'GH', handle: '@kyunn17', href: 'https://github.com/Kyunn17' }, // TODO(confirm)
  { key: 'linkedin', label: 'LinkedIn', short: 'LN', handle: 'in/khairul-faridz', href: 'https://www.linkedin.com/in/khairul-faridz-7a59333a5/' }, // TODO(confirm)
  { key: 'instagram', label: 'Instagram', short: 'IG', handle: '@rullfridz', href: 'https://www.instagram.com/rullfridz/' }, // TODO(confirm)
]

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */

export const hero = {
  edition: 'Edition 2026',
  location: 'Est. Indonesia West Java',
  coordinates: "06°55'S 107°36'E",
  discipline: 'Creative Tech & Architecture',
  kicker: '[ Portfolio Archive / Index 01 ]',
  tagline: 'I build digital experiences.',
  intro:
    'A software engineer and creative technologist operating at the crossroads of robust architecture, modern design aesthetics, and interactive experimental frontends. Driven by precision, code craft, and expressive interfaces.',
  ticker: 'React / Next.js / Laravel / TS',
  style: 'Editorial minimalism',
}

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const about = {
  role: 'Role: Full-stack & Creative Dev', // TODO(confirm)
  portrait: '/images/selfie.jpg',
  portraitCaption: 'Software Engineer & Creative Builder',
  quote:
    '"Building software isn\'t just writing syntax; it\'s sculpting frictionless utility into memorable human experiences."',
  paragraphs: [
    'I am Khairul Faridz, a software developer passionate about building reliable web systems, intuitive user interfaces, and engaging digital interactions. My foundation combines disciplined engineering with high design sensitivity.',
    'From architecting backend databases and API pipelines using Laravel, PostgreSQL, and Databricks to developing reactive, micro-animated client-side frontends in Next.js and TypeScript, I seek to eliminate the boundary between raw functionality and editorial aesthetics.',
  ],
  facts: [
    { label: 'Current focus', value: 'React, Next.js & Full-stack Architecture' },
    { label: 'Philosophy', value: 'Simplicity, High Performance, Intentional Design' },
  ],
  // TODO(confirm) — years and descriptions come from the Stitch mockup
  timeline: [
    {
      period: '2026 — Present',
      title: 'Full-Stack & Cloud Architecture',
      body: 'Expanding modern engineering with Next.js, TypeScript, scalable PostgreSQL, and data lake pipelines with Databricks.',
    },
    {
      period: '2022 — 2025',
      title: 'Backend Systems & Enterprise Web',
      body: 'Developing comprehensive web applications with PHP, Laravel frameworks, relational schema design, and modular REST APIs.',
    },
    {
      period: 'Genesis',
      title: 'First Line of Code',
      body: 'Started building interactive sites and programmatic scripts with HTML, CSS, JavaScript, and Python algorithms.',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Projects                                                             */
/* ------------------------------------------------------------------ */

export type ProjectMock = 'csv' | 'lifesync' | 'critiplay'

export type Project = {
  category: string
  title: string
  description: string
  features: string[]
  /** Render features in two columns (Stitch: projects 01 & 02). */
  featureColumns: 1 | 2
  stack: string
  contribution: string
  github: string
  live: string
  mock: ProjectMock
}

// TODO(confirm) — descriptions/contributions from Stitch; links are placeholders
export const projects: Project[] = [
  {
    category: 'Web Development / Data Engineering',
    title: 'CSV Template Validation',
    description:
      'A configurable CSV validation platform that allows users to import templates, define validation rules, validate uploaded CSV files, and transfer valid data into Databricks.',
    features: [
      'Configurable CSV templates',
      'Column type, regex & null checks',
      'Cell & structure format auditor',
      'Databricks Volumes upload',
      'Row-by-row error indicators',
      'Real-time upload history logs',
    ],
    featureColumns: 2,
    stack: 'Next.js, TypeScript, Tailwind CSS, Databricks, REST API',
    contribution:
      'Architecture, dynamic schema validation engine, Databricks Volume ingestion pipeline, and batch status analytics.',
    github: 'https://github.com/Kyunn17/csv-template-validation',
    live: 'https://csv-template-validation.vercel.app/',
    mock: 'csv',
  },
  {
    category: 'Full-Stack Development / Digital Health',
    title: 'LifeSync',
    description:
      'A digital health platform designed to help users organize health information and manage personal wellness activities through a unified interface.',
    features: [
      'Health dashboard & daily summary',
      'Wellness overview & schedule',
      'Biometric tracking interface',
      'Trend & rhythm visualization',
    ],
    featureColumns: 2,
    stack: 'React, Next.js, Tailwind CSS, REST API',
    contribution:
      'End-to-end full stack development, biometric visualization components, responsive wellness dashboard, and structured record storage.',
    github: 'https://github.com/Kyunn17/LifeSync',
    live: '#',
    mock: 'lifesync',
  },
  {
    category: 'Web Development',
    title: 'CritiPlay',
    description:
      'A web application built with Laravel and React, focusing on an interactive and structured user experience.',
    features: [
      'Interactive structured application workflow',
      'Laravel API endpoints & secure session handling',
      'Dynamic modular React UI components & state',
    ],
    featureColumns: 1,
    stack: 'Laravel, React, Tailwind CSS, PHP',
    contribution:
      'Full-stack implementation integrating Laravel REST backend with reactive modern React frontend and state management.',
    github: 'https://github.com/SaktiArifDwiPutra/CritiPlay',
    live: 'https://critiplay.my.id',
    mock: 'critiplay',
  },
]

/* ------------------------------------------------------------------ */
/* Tech stack & architectural tiers                                     */
/* ------------------------------------------------------------------ */

export type TechCluster = {
  tier: string
  tagline: string
  items: { name: string; note: string; icon: LucideIcon }[]
}

export const techClusters: TechCluster[] = [
  {
    tier: 'Frontend Architecture & Creative UI',
    tagline: 'Modern client-side layers with reactive state, strict typing, and fluid interaction.',
    items: [
      { name: 'React', note: 'Reactive component states', icon: Atom },
      { name: 'Next.js', note: 'SSR & App Router framework', icon: Layers },
      { name: 'TypeScript', note: 'Type-safe maintainability', icon: ShieldCheck },
      { name: 'JavaScript', note: 'ESNext modern scripting', icon: FileCode },
      { name: 'CSS3 / Tailwind', note: 'Editorial layouts & design tokens', icon: Palette },
      { name: 'HTML5', note: 'Semantic & accessible structure', icon: Code },
    ],
  },
  {
    tier: 'Backend Architecture & Modular APIs',
    tagline: 'Robust MVC services, secured REST endpoints, and relational databases.',
    items: [
      { name: 'Laravel', note: 'Robust MVC backend platform', icon: Box },
      { name: 'PHP', note: 'Object-oriented server runtime', icon: Server },
      { name: 'PostgreSQL', note: 'Relational data storage', icon: Database },
      { name: 'Git', note: 'Branching & version control', icon: GitBranch },
    ],
  },
  {
    tier: 'Data Systems & Lakehouse Pipelines',
    tagline: 'Automated ingestion pipelines, schema validation, and cloud analytics.',
    items: [
      { name: 'Databricks', note: 'Lakehouse analytics & ETL', icon: Cloud },
      { name: 'Python', note: 'Scripting & automated pipelines', icon: Binary },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Gym / Beyond the code                                                */
/* ------------------------------------------------------------------ */

export const gym = {
  quote: '"Discipline doesn\'t stop at the keyboard."',
  baseImage: '/images/portrait.jpg',
  revealImage: '/images/gym-reveal.jpg',
  badge: 'Physical Resilience & Code',
  title: 'Consistency as an Engineering Principle.',
  paragraphs: [
    'Writing resilient software and building physical conditioning stem from the exact same discipline: showing up every day, breaking complex goals into repeatable sets, and iterating under resistance.',
    'The gym is not a separate hobby; it is the cognitive reset that fuels clarity during demanding programming sprints, debugging sessions, and architectural design.',
  ],
  pillars: [
    {
      title: 'Progressive Overload',
      body: 'Continuously taking on tougher challenges, whether heavier sets or more intricate backend loads.',
    },
    { title: 'Form Over Ego', body: 'Clean structure and fundamentals always triumph over rushed, brittle execution.' },
    { title: 'Sustained Momentum', body: 'Results compound silently through unwavering daily execution.' },
  ],
}

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */

export const contact = {
  intro:
    'Interested in starting a project, discussing software engineering roles, or exploring creative digital collaborations? Reach out anytime.',
  availability: 'Available for Freelance & Full-time', // TODO(confirm)
  availabilityWindow: 'Q1 / Q2 2026', // TODO(confirm)
}

/* ------------------------------------------------------------------ */
/* Certificates                                                         */
/* ------------------------------------------------------------------ */

/** Empty on purpose — the Stitch design shows an intentional empty state. */
export const certificates: { title: string; issuer: string; year: string; href?: string }[] = []

export const certificatesEmptyState = {
  title: 'More to come.',
  subtitle: 'Currently learning, building, and working towards new milestones.',
  // TODO(confirm) — Stitch mentions "AWS, Next.js Architectures, Data Engineering"; kept generic until confirmed
  body: 'This section is deliberately unpadded. As verified certifications and industry recognitions are completed, they will populate here.',
  inProgress: 'In progress: Cloud Architecture & Data Systems', // TODO(confirm)
}
