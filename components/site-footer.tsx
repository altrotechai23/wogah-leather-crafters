'use client'

import { useState } from 'react'
import Link from 'next/link'

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All Goods', href: '/shop' },
      { label: 'Bags', href: '/shop?category=Bags' },
      { label: 'Wallets', href: '/shop?category=Wallets' },
      { label: 'Belts', href: '/shop?category=Belts' },
      { label: 'Accessories', href: '/shop?category=Accessories' },
    ],
  },
  {
    title: 'House of Wogah',
    links: [
      { label: 'Our Story', href: '/#story' },
      { label: 'The Workshop', href: '/#story' },
      { label: 'Leather Care', href: '/#' },
      { label: 'Journal', href: '/#' },
    ],
  },
  {
    title: 'Service',
    links: [
      { label: 'Shipping & Returns', href: '/#' },
      { label: 'Lifetime Repairs', href: '/#' },
      { label: 'Contact', href: '/#' },
      { label: 'FAQ', href: '/#' },
    ],
  },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + newsletter */}
          <div>
            <p className="font-serif text-3xl tracking-[0.15em]">WOGAH</p>
            <p className="mt-1 text-xs uppercase tracking-[0.35em] text-primary-foreground/60">
              Leather Crafters
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Join our list for early access to new releases, workshop stories,
              and a note on the craft.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (email.trim()) setSubmitted(true)
              }}
              className="mt-5 flex max-w-sm items-center border-b border-primary-foreground/30 focus-within:border-accent"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address"
                className="w-full bg-transparent py-3 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 py-3 text-xs uppercase tracking-widest text-primary-foreground/80 transition-colors hover:text-accent"
              >
                {submitted ? 'Thank you' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-primary-foreground/50">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/80 transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/50 md:flex-row">
          <p>© {new Date().getFullYear()} Wogah Leather Crafters. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/#" className="transition-colors hover:text-accent">
              Privacy
            </Link>
            <Link href="/#" className="transition-colors hover:text-accent">
              Terms
            </Link>
            <Link href="/#" className="transition-colors hover:text-accent">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
