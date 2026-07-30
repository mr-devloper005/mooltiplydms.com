import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[#080c18] text-[#e8ecf4]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1fr] lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-[#111827] p-7 shadow-[0_8px_40px_rgba(0,0,0,0.4)] sm:p-9">
            <h1 className="text-2xl font-bold tracking-[-0.01em]">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-white/40">Already have an account? <Link href="/login" className="font-semibold text-[#38bdf8] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#38bdf8]">{pagesContent.auth.signup.badge}</p>
            <h2 className="mt-4 max-w-xl text-4xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-5xl">{pagesContent.auth.signup.title}</h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/50">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
