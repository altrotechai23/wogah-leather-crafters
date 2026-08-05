'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-border bg-background/90 backdrop-blur-md'
          : 'border-transparent bg-background'
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-primary py-2 text-center text-primary-foreground">
        <p className="text-[11px] uppercase tracking-[0.25em]">
          Complimentary shipping on orders over R2000
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        {/* Left: nav (desktop) / menu (mobile) */}
        <div className="flex flex-1 items-center gap-6">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="text-foreground md:hidden"
          >
            <Menu className="size-5" />
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.slice(0, 3).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: logo */}
        <Link href="/" aria-label="Wogah Leather Crafters — home" className="shrink-0">
          <Image
            src="/wogah-logo.jpg"
            alt="Wogah Leather Crafters"
            width={120}
            height={120}
            priority
            className="h-14 w-auto object-contain mix-blend-multiply"
          />
        </Link>

        {/* Right: actions */}
        <div className="flex flex-1 items-center justify-end gap-5">
          <nav className="hidden items-center gap-7 md:flex">
            {NAV.slice(3).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs uppercase tracking-[0.15em] text-foreground/80 transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Search"
            className="hidden text-foreground/80 transition-colors hover:text-accent sm:block"
          >
            <Search className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="hidden text-foreground/80 transition-colors hover:text-accent sm:block"
          >
            <User className="size-5" />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative text-foreground/80 transition-colors hover:text-accent"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium tabular-nums text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div className="absolute left-0 top-0 flex h-full w-4/5 max-w-xs flex-col bg-card px-6 py-6">
            <div className="mb-8 flex items-center justify-between">
              <span className="font-serif text-xl tracking-widest text-foreground">
                WOGAH
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="text-muted-foreground"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="border-b border-border py-4 font-serif text-lg text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
