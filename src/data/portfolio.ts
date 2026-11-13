/**
 * Single source of truth for site content.
 *
 * Text is taken verbatim from the Stitch "Editorial Developer Portfolio"
 * design. Items marked `// TODO(confirm)` have NOT been confirmed by Khairul —
 * replace or confirm them before publishing.
 */
import type { ComponentType } from 'react'
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiLaravel,
  SiPhp,
  SiPostgresql,
  SiGit,
  SiDatabricks,
  SiPython,
} from 'react-icons/si'

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
  image: string
}

// Descriptions and contributions from confirmed project context
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
    image: '/images/csv-template.png',
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
    image: '/images/LifeSync.png',
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
    image: '/images/critiplay.png',
  },
]

/* ------------------------------------------------------------------ */
/* Tech stack & architectural tiers                                     */
/* ------------------------------------------------------------------ */

export type TechCluster = {
  tier: string
  tagline: string
  items: { name: string; note: string; icon: ComponentType<{ className?: string }> }[]
}

export const techClusters: TechCluster[] = [
  {
    tier: 'Frontend Architecture & Creative UI',
    tagline: 'Modern client-side layers with reactive state, strict typing, and fluid interaction.',
    items: [
      { name: 'React', note: 'Reactive component states', icon: SiReact },
      { name: 'Next.js', note: 'SSR & App Router framework', icon: SiNextdotjs },
      { name: 'TypeScript', note: 'Type-safe maintainability', icon: SiTypescript },
      { name: 'JavaScript', note: 'ESNext modern scripting', icon: SiJavascript },
      { name: 'CSS3 / Tailwind', note: 'Editorial layouts & design tokens', icon: SiTailwindcss },
      { name: 'HTML5', note: 'Semantic & accessible structure', icon: SiHtml5 },
    ],
  },
  {
    tier: 'Backend Architecture & Modular APIs',
    tagline: 'Robust MVC services, secured REST endpoints, and relational databases.',
    items: [
      { name: 'Laravel', note: 'Robust MVC backend platform', icon: SiLaravel },
      { name: 'PHP', note: 'Object-oriented server runtime', icon: SiPhp },
      { name: 'PostgreSQL', note: 'Relational data storage', icon: SiPostgresql },
      { name: 'Git', note: 'Branching & version control', icon: SiGit },
    ],
  },
  {
    tier: 'Data Systems & Lakehouse Pipelines',
    tagline: 'Automated ingestion pipelines, schema validation, and cloud analytics.',
    items: [
      { name: 'Databricks', note: 'Lakehouse analytics & ETL', icon: SiDatabricks },
      { name: 'Python', note: 'Scripting & automated pipelines', icon: SiPython },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Gym / Beyond the code                                                */
/* ------------------------------------------------------------------ */

export type BeyondModeKey = 'gym' | 'superman'

export type BeyondModeData = {
  key: BeyondModeKey
  buttonLabel: string
  lensTag: string
  quote: string
  baseImage: string
  revealImage: string
  revealAlt: string
  badge: string
  title: string
  subtitle: string
  paragraphs: string[]
  stats: { label: string; value: string; detail: string }[]
  tags: string[]
  pillars: { title: string; body: string }[]
}

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
  modes: {
    gym: {
      key: 'gym',
      buttonLabel: 'Gym Reveal',
      lensTag: 'FORM REVEAL',
      quote: '"Discipline doesn\'t stop at the keyboard."',
      baseImage: '/images/portrait.jpg',
      revealImage: '/images/gym-reveal.jpg',
      revealAlt: 'Khairul Faridz - Athletic Conditioning',
      badge: 'Physical Resilience & Code',
      title: 'Consistency as an Engineering Principle.',
      subtitle: 'Discipline forged through iron, applied to production software.',
      paragraphs: [
        'Writing resilient software and building physical conditioning stem from the exact same discipline: showing up every day, breaking complex goals into repeatable sets, and iterating under resistance.',
        'The gym is not a separate hobby; it is the cognitive reset that fuels clarity during demanding programming sprints, debugging sessions, and architectural design.',
      ],
      stats: [
        { label: 'EXECUTION CADENCE', value: '5 DAYS / WK', detail: 'Consistent resistance cycles' },
        { label: 'DISCIPLINE INDEX', value: '99.4%', detail: 'Daily unbroken regimen' },
        { label: 'FOCUS COEFFICIENT', value: '1.0 MAX', detail: 'Zero drift during sprints' },
      ],
      tags: ['Progressive Overload', 'Form Over Ego', 'Active Recovery', 'Cognitive Reset'],
      pillars: [
        {
          title: 'Progressive Overload',
          body: 'Continuously taking on tougher challenges, whether heavier sets or more intricate backend loads.',
        },
        {
          title: 'Form Over Ego',
          body: 'Clean structure and fundamentals always triumph over rushed, brittle execution.',
        },
        {
          title: 'Sustained Momentum',
          body: 'Results compound silently through unwavering daily execution.',
        },
      ],
    },
    superman: {
      key: 'superman',
      buttonLabel: 'Superman',
      lensTag: 'ALTER EGO',
      quote: '"Mild-mannered engineer by day—unstoppable builder after hours."',
      baseImage: '/images/portrait.jpg',
      revealImage: '/images/superman.jpg',
      revealAlt: 'Khairul Faridz - Superman Alter Ego',
      badge: 'Alter Ego & Creative Energy',
      title: 'Every Developer Needs an Alter Ego.',
      subtitle: 'Channeling superhero resolve to debug, build, and ship fearlessly.',
      paragraphs: [
        'Behind the clean architecture, strict TypeScript interfaces, and quiet focus lies a playful alter ego: taking the craft seriously without ever losing the spark of fun and curiosity.',
        'Suiting up is a reminder that building ambitious software requires boldness, relentless energy, and the willingness to leap into complex problems headfirst.',
      ],
      stats: [
        { label: 'PROBLEM RESOLUTION', value: 'SUPERHUMAN', detail: 'Decisive architectural fixes' },
        { label: 'RUNTIME STAMINA', value: 'PEAK OVERCLOCK', detail: 'End-to-end sprint shipping' },
        { label: 'BUG ELIMINATION', value: 'X-RAY PRECISION', detail: 'Zero tolerance for brittle bugs' },
      ],
      tags: ['Alter Ego Protocol', 'Cape & Momentum', 'Fearless Builds', 'Heroic Stamina'],
      pillars: [
        {
          title: 'Heroic Debugging',
          body: 'Stepping up under pressure when complex systems demand decisive problem-solving and clean fixes.',
        },
        {
          title: 'Dual Identity',
          body: 'Balancing disciplined analytical engineering with fearless creative experimentation.',
        },
        {
          title: 'Unbreakable Stamina',
          body: 'Channeling physical conditioning and high-spirited momentum straight into late-night shipping.',
        },
      ],
    },
  } satisfies Record<BeyondModeKey, BeyondModeData>,
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

export type CertificateModule = {
  title: string
  duration: string
  summary: string
}

export type Certificate = {
  id: string
  credentialId: string
  title: string
  subtitle: string
  issuer: string
  partnerBadge: string
  issuedDate: string
  validUntil: string
  totalHours: string
  signatory: string
  pdfUrl: string
  verifyUrl: string
  description: string
  competencies: string[]
  modules: CertificateModule[]
}

export const certificates: Certificate[] = [
  {
    id: 'dicoding-data-viz',
    credentialId: 'RVZKMW19EXD5',
    title: 'Belajar Dasar Visualisasi Data',
    subtitle: 'Sertifikat Kompetensi Kelulusan — Data Visualization Fundamentals',
    issuer: 'Dicoding Indonesia',
    partnerBadge: 'Google Developers Authorized Training Partner',
    issuedDate: '10 November 2026',
    validUntil: '10 November 2029',
    totalHours: '16 Hours',
    signatory: 'Narenda Wicaksono (CEO, Dicoding Indonesia)',
    pdfUrl: '/pdf/certificate1.pdf',
    verifyUrl: 'https://www.dicoding.com/certificates/RVZKMW19EXD5',
    description:
      'Industry-standard competency certification in data processing and effective visual communication—covering spreadsheet data engineering, Gestalt design principles, preattentive attributes, and data storytelling for software developers.',
    competencies: [
      'Data Visualization',
      'Pre-Visualization Data Prep',
      'Gestalt Design Principles',
      'Preattentive Attributes',
      'Data Storytelling',
    ],
    modules: [
      {
        title: '01. Pendahuluan Visualisasi Data',
        duration: '1h 39m',
        summary: 'Core definitions, visualization media, analytical tooling, and data context.',
      },
      {
        title: '02. Persiapan Data Pra-Visualisasi',
        duration: '8h 14m',
        summary: 'Spreadsheet navigation, structured data cleansing, and analytical functions.',
      },
      {
        title: '03. Transformasi Data ke Visual',
        duration: '4h 29m',
        summary: 'Chart transformation, error prevention, documentation, Gestalt principles, and preattentive attributes.',
      },
      {
        title: '04. Implementasi & Evaluasi Akhir',
        duration: '1h 07m',
        summary: 'Data visualization in software engineering workflows and final competency examination.',
      },
    ],
  },
]

export const certificatesEmptyState = {
  title: 'More to come.',
  subtitle: 'Currently learning, building, and working towards new milestones.',
  body: 'This section is deliberately unpadded. As verified certifications and industry recognitions are completed, they will populate here.',
  inProgress: 'Next milestone in progress: Cloud Architecture & Data Systems',
}

/* ------------------------------------------------------------------ */
/* Spotify / Personal Soundtrack                                        */
/* ------------------------------------------------------------------ */

export const SPOTIFY_PLAYLIST_EMBED_URL =
  'https://open.spotify.com/embed/playlist/6gbM90LSYkIw28OmVBpHPE?utm_source=generator&si=abc179f8bea441f0'

export const spotifySection = {
  label: 'PERSONAL SOUNDTRACK / 001',
  title: 'ON REPEAT.',
  subtitle: 'A little collection of sounds that accompany my days.',
  note: 'Curated rotation for deep focus, late-night debugging, and architectural sprints.',
} as const
