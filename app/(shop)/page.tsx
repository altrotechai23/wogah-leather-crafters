import { CartDrawer } from '@/components/cart/cart-drawer'
import { About } from '@/components/home/about'
import { CategoryGrid } from '@/components/home/category-grid'
import { Featured } from '@/components/home/featured'
import { Hero } from '@/components/home/hero'
import { PromiseBand } from '@/components/home/promise-band'
import { Story } from '@/components/home/story'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
export const dynamic = "force-dynamic";
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <CategoryGrid />
        <Featured />
        <About />
        <Story />
        <PromiseBand />
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
