'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from 'lucide-react'

import { useCart } from '@/components/cart/cart-provider'

const NAV = [
  { label: 'Shop All', href: '/shop' },
  { label: 'Bags', href: '/shop?category=Bags' },
  { label: 'Wallets', href: '/shop?category=Wallets' },
  { label: 'Belts', href: '/shop?category=Belts' },
  { label: 'Our Story', href: '/#story' },
]

export function SiteHeader() {
  const { count, openCart } = useCart()

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  /*
   * ------------------------------------------------------------
   * Scroll state
   * ------------------------------------------------------------
   */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
    }

    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  /*
   * ------------------------------------------------------------
   * Close mobile menu when route OR query changes
   *
   * Important:
   * usePathname() alone does NOT change when:
   *
   * /shop?category=Bags
   *
   * changes to:
   *
   * /shop?category=Wallets
   *
   * searchParams handles that case.
   * ------------------------------------------------------------
   */
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname, searchParams])

  /*
   * ------------------------------------------------------------
   * Prevent background scrolling while mobile menu is open
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.overflow = ''
      return
    }

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileOpen])

  /*
   * ------------------------------------------------------------
   * Escape key
   * ------------------------------------------------------------
   */
  useEffect(() => {
    if (!mobileOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen])

  /*
   * ------------------------------------------------------------
   * Mobile navigation
   *
   * We explicitly close the drawer BEFORE navigation.
   * This makes clicks reliable even for query-string routes.
   * ------------------------------------------------------------
   */
  const handleMobileNavigation = () => {
    setMobileOpen(false)
  }

  /*
   * ------------------------------------------------------------
   * Active navigation
   * ------------------------------------------------------------
   */
  const isActive = (href: string) => {
    if (href === '/shop') {
      return pathname === '/shop' && !searchParams.get('category')
    }

    if (href.startsWith('/shop?category=')) {
      const category = new URLSearchParams(
        href.split('?')[1],
      ).get('category')

      return (
        pathname === '/shop' &&
        searchParams.get('category') === category
      )
    }

    if (href === '/#story') {
      return pathname === '/'
    }

    return pathname === href
  }

  return (
    <>
      <header
        className={[
          'sticky top-0 z-50 border-b',
          'transition-all duration-300',
          scrolled
            ? 'border-border bg-background/90 shadow-sm backdrop-blur-xl'
            : 'border-transparent bg-background',
        ].join(' ')}
      >
        {/* =====================================================
            Announcement bar
        ====================================================== */}
        <div className="bg-primary px-4 py-2 text-center text-primary-foreground">
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] sm:text-[11px] sm:tracking-[0.25em]">
            Complimentary shipping on orders over R2000
          </p>
        </div>

        {/* =====================================================
            Main header
        ====================================================== */}
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[82px] md:px-8">

          {/* ===================================================
              LEFT
          ==================================================== */}
          <div className="flex min-w-0 flex-1 items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className={[
                'inline-flex size-11 items-center justify-center',
                'rounded-full md:hidden',
                'text-foreground',
                'transition-colors duration-200',
                'hover:bg-secondary',
                'active:scale-95',
              ].join(' ')}
            >
              <Menu
                className="size-5"
                strokeWidth={1.7}
              />
            </button>

            {/* Desktop navigation */}
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-7 md:flex"
            >
              {NAV.slice(0, 3).map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'relative py-2',
                      'text-xs uppercase tracking-[0.15em]',
                      'transition-colors duration-200',
                      active
                        ? 'text-foreground'
                        : 'text-foreground/70 hover:text-accent',
                    ].join(' ')}
                  >
                    {item.label}

                    {active && (
                      <span className="absolute inset-x-0 -bottom-1 mx-auto h-px bg-accent" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* ===================================================
              CENTER LOGO
          ==================================================== */}
          <Link
            href="/"
            aria-label="Wogah Leather Crafters — home"
            className="relative z-10 shrink-0"
          >
            <Image
              src="/wogah-logo.jpg"
              alt="Wogah Leather Crafters"
              width={120}
              height={120}
              priority
              className="
                h-12 w-auto
                object-contain
                mix-blend-multiply
                sm:h-14
              "
            />
          </Link>

          {/* ===================================================
              RIGHT
          ==================================================== */}
          <div className="flex min-w-0 flex-1 items-center justify-end gap-1 sm:gap-4">

            {/* Desktop right navigation */}
            <nav
              aria-label="Secondary navigation"
              className="hidden items-center gap-7 md:flex"
            >
              {NAV.slice(3).map((item) => {
                const active = isActive(item.href)

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={[
                      'relative py-2',
                      'text-xs uppercase tracking-[0.15em]',
                      'transition-colors duration-200',
                      active
                        ? 'text-foreground'
                        : 'text-foreground/70 hover:text-accent',
                    ].join(' ')}
                  >
                    {item.label}

                    {active && (
                      <span className="absolute inset-x-0 -bottom-1 mx-auto h-px bg-accent" />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Search */}
            <button
              type="button"
              aria-label="Search"
              className="
                hidden size-11 items-center justify-center
                rounded-full
                text-foreground/75
                transition-all duration-200
                hover:bg-secondary hover:text-accent
                active:scale-95
                sm:inline-flex
              "
            >
              <Search
                className="size-[18px]"
                strokeWidth={1.7}
              />
            </button>

            {/* Account */}
            <button
              type="button"
              aria-label="Account"
              className="
                hidden size-11 items-center justify-center
                rounded-full
                text-foreground/75
                transition-all duration-200
                hover:bg-secondary hover:text-accent
                active:scale-95
                sm:inline-flex
              "
            >
              <User
                className="size-[18px]"
                strokeWidth={1.7}
              />
            </button>

            {/* Cart */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart, ${count} ${
                count === 1 ? 'item' : 'items'
              }`}
              className="
                relative inline-flex size-11
                items-center justify-center
                rounded-full
                text-foreground/80
                transition-all duration-200
                hover:bg-secondary hover:text-accent
                active:scale-95
              "
            >
              <ShoppingBag
                className="size-[19px]"
                strokeWidth={1.7}
              />

              {count > 0 && (
                <span
                  aria-hidden="true"
                  className="
                    absolute right-1 top-1
                    flex size-[17px]
                    items-center justify-center
                    rounded-full
                    bg-accent
                    text-[9px]
                    font-semibold
                    leading-none
                    tabular-nums
                    text-accent-foreground
                    ring-2 ring-background
                  "
                >
                  {count > 99 ? '99+' : count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =======================================================
          MOBILE DRAWER
      ======================================================== */}
      <div
        className={[
          'fixed inset-0 z-[100] md:hidden',
          mobileOpen
            ? 'pointer-events-auto'
            : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!mobileOpen}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close navigation menu"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
          className={[
            'absolute inset-0 w-full',
            'bg-foreground/40 backdrop-blur-[2px]',
            'transition-opacity duration-300',
            mobileOpen
              ? 'opacity-100'
              : 'opacity-0',
          ].join(' ')}
        />

        {/* Drawer */}
        <aside
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={[
            'absolute left-0 top-0',
            'flex h-dvh w-[86%] max-w-sm',
            'flex-col',
            'bg-card',
            'shadow-2xl',
            'transition-transform duration-300 ease-out',
            mobileOpen
              ? 'translate-x-0'
              : '-translate-x-full',
          ].join(' ')}
        >
          {/* Drawer header */}
          <div className="flex h-[88px] shrink-0 items-center justify-between border-b border-border px-6">
            <Link
              href="/"
              onClick={handleMobileNavigation}
              className="font-serif text-xl tracking-[0.22em] text-foreground"
            >
              WOGAH
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
              className="
                inline-flex size-11
                items-center justify-center
                rounded-full
                text-muted-foreground
                transition-colors
                hover:bg-secondary
                hover:text-foreground
                active:scale-95
              "
            >
              <X
                className="size-5"
                strokeWidth={1.7}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Mobile primary navigation"
            className="flex flex-1 flex-col overflow-y-auto px-6 py-5"
          >
            {NAV.map((item, index) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={handleMobileNavigation}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'group flex min-h-[60px]',
                    'items-center justify-between',
                    'border-b border-border',
                    'py-4',
                    'font-serif text-xl',
                    'transition-colors duration-200',
                    active
                      ? 'text-accent'
                      : 'text-foreground hover:text-accent',
                  ].join(' ')}
                >
                  <span>{item.label}</span>

                  <span
                    className={[
                      'text-sm transition-transform duration-200',
                      'group-hover:translate-x-1',
                      active
                        ? 'text-accent'
                        : 'text-muted-foreground',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              )
            })}

            {/* Mobile utility actions */}
            <div className="mt-auto grid grid-cols-2 gap-3 pt-8">
              <button
                type="button"
                className="
                  flex min-h-12 items-center justify-center gap-2
                  border border-border
                  text-[10px] uppercase
                  tracking-[0.16em]
                  text-foreground
                  transition-colors
                  hover:bg-secondary
                "
              >
                <Search className="size-4" strokeWidth={1.7} />
                Search
              </button>

              <button
                type="button"
                className="
                  flex min-h-12 items-center justify-center gap-2
                  border border-border
                  text-[10px] uppercase
                  tracking-[0.16em]
                  text-foreground
                  transition-colors
                  hover:bg-secondary
                "
              >
                <User className="size-4" strokeWidth={1.7} />
                Account
              </button>
            </div>
          </nav>

          {/* Small brand footer */}
          <div className="border-t border-border px-6 py-5">
            <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              Handcrafted leather goods
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

