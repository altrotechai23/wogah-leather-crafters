import type { Metadata } from 'next'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { ShopGrid } from '@/components/shop/shop-grid'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import type { Category } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Shop All | Wogah Leather Crafters',
  description:
    'Browse handcrafted full-grain leather bags, wallets, belts and accessories from Wogah Leather Crafters.',
}

const VALID: (Category | 'All')[] = [
  'All',
  'Bags',
  'Wallets',
  'Belts',
  'Accessories',
]

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const initial =
    category && VALID.includes(category as Category)
      ? (category as Category)
      : 'All'

  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-8 md:py-20">
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              The Full Collection
            </span>
            <h1 className="mt-4 text-balance font-serif text-5xl text-foreground md:text-6xl">
              Shop Wogah
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Timeless leather goods, each one cut and stitched by hand to be
              carried for a lifetime.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-14 md:px-8">
          <ShopGrid key={initial} initialCategory={initial} />
        </div>
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
