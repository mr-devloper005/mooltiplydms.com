import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY_FONT = "'Space Grotesk', 'Sora', system-ui, sans-serif"
const BODY_FONT = "'Inter', system-ui, -apple-system, sans-serif"

const base = {
  dark: true,
  fontDisplay: DISPLAY_FONT,
  fontBody: BODY_FONT,
  bg: '#080c18',
  surface: '#111827',
  raised: '#0d1224',
  text: '#e8ecf4',
  muted: '#8b95b0',
  line: 'rgba(255,255,255,0.08)',
  accent: '#38bdf8',
  accentSoft: 'rgba(56,189,248,0.1)',
  onAccent: '#080c18',
  glow: 'rgba(56,189,248,0.08)',
  radius: '1rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Insights', note: 'In-depth analysis, guides, and thought leadership.' },
  listing: { ...base, kicker: 'Directory', note: 'Discover and connect with businesses and services.' },
  classified: { ...base, kicker: 'Marketplace', note: 'Opportunities, offers, and time-sensitive listings.' },
  image: { ...base, kicker: 'Gallery', note: 'Visual stories, portfolios, and creative showcases.' },
  sbm: { ...base, kicker: 'Resources', note: 'Curated tools, references, and bookmarked collections.' },
  pdf: { ...base, kicker: 'Documents', note: 'Reports, whitepapers, and downloadable resources.' },
  profile: { ...base, kicker: 'Profiles', note: 'People, brands, and professional identities.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
