import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="px-4 py-14 sm:px-6 lg:px-8">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-white/[0.06] bg-[#111827] p-8 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38bdf8]">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-5 text-4xl font-bold tracking-[-0.03em] sm:text-5xl">About {SITE_CONFIG.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/50">{pagesContent.about.description}</p>
            <div className="mt-8 space-y-4 text-sm leading-8 text-white/40">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="space-y-4">
            {pagesContent.about.values.map((value) => (
              <div key={value.title} className="rounded-2xl border border-white/[0.06] bg-[#0d1224] p-6">
                <h2 className="editable-display text-xl font-bold">{value.title}</h2>
                <p className="mt-3 text-sm leading-7 text-white/40">{value.description}</p>
              </div>
            ))}
          </aside>
        </section>
      </main>
    </EditableSiteShell>
  )
}
