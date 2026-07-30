import Link from 'next/link'
import {
  ArrowRight, Bookmark, Building2, ChevronRight, FileText, Image as ImageIcon,
  UserRound, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref, toPlainText } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const taskIcon: Record<TaskKey, typeof FileText> = {
  article: FileText,
  listing: Building2,
  classified: Zap,
  image: ImageIcon,
  sbm: Bookmark,
  pdf: FileText,
  profile: UserRound,
}


function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof post?.summary === 'string' && post.summary) ||
    (typeof content.body === 'string' && content.body) ||
    (typeof content.excerpt === 'string' && content.excerpt) ||
    ''
  const clean = toPlainText(raw)
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* ============================= HERO ============================= */
export function EditableHomeHero({ primaryRoute }: HomeSectionProps) {
  const heroTitle = pagesContent.home.hero.title || ['The future of', 'digital growth.']

  return (
    <section className="relative overflow-hidden">
      {/* Deep dark background with subtle gradient */}
      <div className="absolute inset-0 bg-[#080c18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.08),transparent)]" />

      {/* Decorative geometric shapes like AI Finance screenshot */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-br from-[#0f1d3a] to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 h-[400px] w-full bg-[linear-gradient(160deg,transparent_40%,rgba(56,189,248,0.04)_60%,transparent_80%)]" />

      {/* Vertical lines decoration */}
      <div className="absolute inset-y-0 left-0 w-1/3 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, white 0px, white 1px, transparent 1px, transparent 40px)', backgroundSize: '40px 100%' }} />

      <div className={`relative ${container} pb-20 pt-20 sm:pb-28 sm:pt-28 lg:pb-36 lg:pt-36`}>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <div className="flex flex-col justify-center">
            <h1 className="editable-display text-5xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              {Array.isArray(heroTitle) ? heroTitle.map((line, i) => <span key={i} className="block">{line}</span>) : heroTitle}
            </h1>
            <p className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              {pagesContent.home.hero.badge || 'Empowering business owners'}
            </p>

            {/* Avatar group + social proof */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-[#080c18] bg-gradient-to-br from-[#1e3a5f] to-[#0f1d3a]" />
                ))}
              </div>
              <span className="text-sm text-white/50">Trusted by business owners worldwide</span>
            </div>
          </div>

          {/* Right content — description + CTAs */}
          <div className="flex flex-col justify-center lg:pl-8">
            <p className="max-w-lg text-base leading-8 text-white/60">
              {pagesContent.home.hero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={pagesContent.home.hero.primaryCta?.href || '/contact'}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#080c18] transition hover:bg-white/90"
              >
                {pagesContent.home.hero.primaryCta?.label || 'Get Started'} <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={pagesContent.home.hero.secondaryCta?.href || primaryRoute}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white/80 transition hover:bg-white/10"
              >
                {pagesContent.home.hero.secondaryCta?.label || 'Discover More'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ========================= SOLUTIONS SECTION ========================= */
export function EditableStoryRail(_props: HomeSectionProps) {
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled)
  if (!categories.length) return null

  return (
    <section className="relative border-t border-white/[0.04] bg-[#080c18]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(56,189,248,0.04),transparent)]" />
      <div className={`relative py-20 sm:py-28 ${container}`}>
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38bdf8]">Solutions</p>
          <h2 className="editable-display mx-auto mt-5 max-w-2xl text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
            Revolutionize your workflows.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/50">
            Our platform connects business owners with the tools and visibility they need to grow their digital presence.
          </p>
        </div>

        {/* Feature cards */}
        <div className={`mt-14 grid gap-6 ${categories.length <= 2 ? 'mx-auto max-w-4xl sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {categories.slice(0, 6).map((task, index) => {
            const Icon = taskIcon[task.key] || FileText
            const gradients = [
              'from-[#38bdf8]/20 via-[#818cf8]/10 to-transparent',
              'from-[#818cf8]/20 via-[#38bdf8]/10 to-transparent',
              'from-[#34d399]/20 via-[#38bdf8]/10 to-transparent',
            ]
            return (
              <Link
                key={task.key}
                href={task.route}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1224] p-10 transition duration-500 hover:-translate-y-1 hover:border-[#38bdf8]/30 hover:shadow-[0_20px_60px_rgba(56,189,248,0.08)]"
              >
                {/* Glow orb */}
                <div className={`absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br ${gradients[index % 3]} blur-3xl transition duration-700 group-hover:scale-125 group-hover:opacity-80`} />
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-[#38bdf8]/10 text-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="editable-display mt-8 text-2xl font-bold tracking-[-0.02em] text-white">{task.label}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/40">{task.description || `Explore our ${task.label.toLowerCase()} section.`}</p>
                  <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-bold text-[#38bdf8] transition duration-300 group-hover:border-[#38bdf8]/30 group-hover:bg-[#38bdf8]/10">
                    Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ========================= FEATURED POSTS ========================= */
export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((s) => s.posts)])
  if (!pool.length) return null

  const featured = pool[0]
  const secondary = pool.slice(1, 4)
  const compact = pool.slice(4, 10)

  return (
    <section className="relative border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-[#0a0f1e]" />
      <div className={`relative py-20 sm:py-28 ${container}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38bdf8]">Featured</p>
            <h2 className="editable-display mt-4 text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl">
              Latest from the platform.
            </h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-1.5 text-sm font-medium text-[#38bdf8] transition hover:text-white sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Hero featured card */}
        {featured ? (
          <Link href={postHref(primaryTask, featured, primaryRoute)} className="group mt-10 block overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111827] transition duration-500 hover:border-white/[0.12]">
            <div className="grid lg:grid-cols-2">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1629] lg:aspect-auto lg:min-h-[400px]">
                <img src={getEditablePostImage(featured)} alt={featured.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111827]/50 lg:bg-gradient-to-r lg:from-transparent lg:to-[#111827]" />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                {categoryOf(featured) ? <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#38bdf8]">{categoryOf(featured)}</span> : null}
                <h3 className="editable-display mt-4 text-3xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-4xl">{featured.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/50">{getExcerpt(featured, 200)}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#38bdf8]">
                  Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ) : null}

        {/* Secondary cards row */}
        {secondary.length ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((post) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111827] transition duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0f1629]">
                  <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  {categoryOf(post) ? <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#38bdf8]">{categoryOf(post)}</span> : null}
                  <h3 className="editable-display mt-2 line-clamp-2 text-lg font-bold leading-snug text-white">{post.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/40">{getExcerpt(post, 120)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        {/* Compact horizontal list */}
        {compact.length ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {compact.map((post, i) => (
              <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="group flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] p-4 transition duration-300 hover:bg-white/[0.04]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#38bdf8]/10 text-sm font-bold text-[#38bdf8]">{String(i + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <h4 className="line-clamp-1 text-sm font-bold text-white">{post.title}</h4>
                  <p className="mt-1 line-clamp-1 text-xs text-white/35">{getExcerpt(post, 80)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/* ========================= TIME COLLECTIONS ========================= */
const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'This week', title: 'Fresh additions' },
  browse: { eyebrow: 'Trending', title: 'Popular this month' },
  index: { eyebrow: 'Archive', title: 'From the collection' },
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((s) => s.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sIndex) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className="relative border-t border-white/[0.04]" style={{ background: sIndex % 2 === 0 ? '#080c18' : '#0a0f1e' }}>
            <div className={`py-16 sm:py-20 ${container}`}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38bdf8]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-3 text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="hidden items-center gap-1.5 text-sm font-medium text-[#38bdf8] transition hover:text-white sm:inline-flex">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, _i) => {
                  const image = getEditablePostImage(post)
                  const cat = categoryOf(post)
                  return (
                    <Link
                      key={post.id || post.slug}
                      href={postHref(primaryTask, post, primaryRoute)}
                      className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111827] transition duration-500 hover:-translate-y-1 hover:border-white/[0.12] hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                    >
                      <div className="relative aspect-[3/2] overflow-hidden bg-[#0f1629]">
                        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]" loading="lazy" />
                        {cat ? (
                          <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">{cat}</span>
                        ) : null}
                      </div>
                      <div className="p-5">
                        <h3 className="line-clamp-2 text-base font-bold leading-snug text-white group-hover:text-[#38bdf8]">{post.title}</h3>
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/35">{getExcerpt(post, 100)}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}
    </>
  )
}

/* ================================ CTA ================================ */
export function EditableHomeCta() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.04]">
      <div className="absolute inset-0 bg-[#080c18]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(56,189,248,0.06),transparent)]" />
      <div className={`relative flex flex-col items-center gap-8 py-24 text-center sm:py-32 ${container}`}>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#38bdf8]">
          {pagesContent.home.cta.badge}
        </p>
        <h2 className="editable-display max-w-3xl text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
          {pagesContent.home.cta.title}
        </h2>
        <p className="max-w-xl text-base leading-8 text-white/50">
          {pagesContent.home.cta.description}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={pagesContent.home.cta.primaryCta?.href || '/contact'} className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-[#080c18] transition hover:bg-white/90">
            {pagesContent.home.cta.primaryCta?.label || 'Get Started'} <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </Link>
          <Link href={pagesContent.home.cta.secondaryCta?.href || '/contact'} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold text-white/80 transition hover:bg-white/10">
            {pagesContent.home.cta.secondaryCta?.label || 'Contact Us'}
          </Link>
        </div>
      </div>
    </section>
  )
}
