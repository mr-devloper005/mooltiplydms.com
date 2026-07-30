import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        {/* Brand column */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            <span className="editable-display text-lg font-bold">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/40">
            {globalContent.footer?.description || SITE_CONFIG.description}
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">Explore</h3>
          <div className="mt-5 grid gap-3">
            {taskLinks.map((task) => (
              <Link key={task.key} href={task.route} className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition hover:text-white">
                {task.label} <ArrowUpRight className="h-3.5 w-3.5 opacity-50" />
              </Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30">Company</h3>
          <div className="mt-5 grid gap-3">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-white/50 transition hover:text-white">{label}</Link>
            ))}
          </div>
        </div>

      </div>

      <div className="border-t border-white/[0.04] px-4 py-6 text-center text-xs font-medium text-white/25">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
