'use client'

import { FormEvent, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded-xl border border-white/[0.06] bg-[#0d1224] px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-white/25 focus:border-[#38bdf8]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#080c18] text-[#e8ecf4]">
        <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-6 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#38bdf8]">{pagesContent.create.hero.badge}</p>
            <h1 className="editable-display mt-4 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">{pagesContent.create.hero.title}</h1>
            <p className="mt-3 text-sm leading-7 text-white/50">{pagesContent.create.hero.description}</p>

            <form onSubmit={submit} className="mt-8 grid gap-4">
              <input className={fieldClass} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={fieldClass} value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
                <input className={fieldClass} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Website or source URL" />
              </div>
              <input className={fieldClass} value={image} onChange={(e) => setImage(e.target.value)} placeholder="Featured image URL" />
              <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Short summary" required />
              <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Main content, details, notes, or description" required />

              {created ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-emerald-400">
                  <p className="flex items-center gap-2 text-sm font-bold"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-bold text-[#080c18] transition hover:bg-white/90">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
