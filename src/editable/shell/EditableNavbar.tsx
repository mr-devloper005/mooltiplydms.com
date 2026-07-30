'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type LucideIcon, LogIn, LogOut, Menu, PlusCircle, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  const staticLinks: Array<{ label: string; href: string; icon?: LucideIcon }> = [
    { label: 'About', href: '/about' },
    { label: 'Search', href: '/search', icon: Search },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[var(--editable-nav-bg)] text-[var(--editable-nav-text)] backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[72px] w-full max-w-[var(--editable-container)] items-center gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
          <span className="editable-display text-lg font-bold tracking-[-0.01em]">{SITE_CONFIG.name}</span>
        </Link>

        {/* Desktop nav pill */}
        <div className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 lg:flex">
          {[...navItems.slice(0, 4), ...staticLinks].map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = ('icon' in item && item.icon) ? item.icon as LucideIcon : null
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition duration-300 ${
                  active ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white'
                }`}
              >
                {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="flex-1" />

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {session ? (
            <>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
              >
                <PlusCircle className="h-4 w-4" /> Create
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <LogIn className="h-4 w-4" /> Login
            </Link>
          )}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#080c18] transition hover:bg-white/90"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open ? (
        <div className="border-t border-white/[0.06] bg-[#0a0f1e] px-4 py-6 lg:hidden">
          <div className="grid gap-1">
            {[
              { label: 'Home', href: '/' },
              ...navItems,
              { label: 'About', href: '/about' },
              { label: 'Search', href: '/search' },
              { label: 'Contact', href: '/contact' },
              ...(session
                ? [{ label: 'Create', href: '/create' }]
                : [{ label: 'Login', href: '/login' }]),
            ].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button
                type="button"
                onClick={() => { logout(); setOpen(false) }}
                className="rounded-xl px-4 py-3 text-left text-sm font-medium text-white/50 transition hover:bg-white/5 hover:text-white"
              >
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
