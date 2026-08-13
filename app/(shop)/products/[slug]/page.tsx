
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { CartDrawer } from '@/components/cart/cart-drawer'
import { ProductBuyPanel } from '@/components/product-buy-panel'
import { ProductCard } from '@/components/product-card'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { formatPrice } from '@/lib/catalog'
import { getProduct, getProducts } from '@/lib/db/products'
import { ProductGallery } from '@/components/product-gallery'


// export async function generateStaticParams() {
//   const products = await getProducts()

//   return products.map((product) => ({
//     slug: product.slug,
//   }))
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>
// }): Promise<Metadata> {
//   const { slug } = await params
//   const product = await getProduct(slug)
//   if (!product) return { title: 'Not Found | Wogah' }
//   return {
//     title: `${product.name} | Wogah Leather Crafters`,
//     description: product.description,
//   }
// }

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const products = await getProducts()

  const related = products
    .filter(
      (item: any) =>
        item.category === product.category &&
        item.slug !== product.slug
    )
    .slice(0, 4)

  const fallback = products
    .filter((item: any) => item.slug !== product.slug)
    .slice(0, 4)

  const recommendations =
    related.length >= 2 ? related : fallback

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground"
        >
          <Link href="/" className="transition-colors hover:text-accent">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/shop" className="transition-colors hover:text-accent">
            Shop
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        
          {/* Product Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* Details */}
          <div className="lg:py-6">
            <Link
              href={`/shop?category=${product.category}`}
              className="text-xs uppercase tracking-[0.25em] text-accent"
            >
              {product.category}
            </Link>
            <h1 className="mt-3 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 font-serif text-2xl text-foreground">
              {formatPrice(product.price)}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
              {product.colors[0]?.name}
              {product.colors.length > 1 &&
                ` +${product.colors.length - 1} more colours`}
            </p>

            <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <ProductBuyPanel product={product} />

            <div className="mt-10 border-t border-border pt-8">
              <h2 className="text-xs uppercase tracking-[0.2em] text-foreground">
                Details
              </h2>
              <ul className="mt-4 space-y-2">
                {product.details.map((detail: string) => (
                  <li
                    key={detail}
                    className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-8 text-sm text-muted-foreground">
              <p>Free shipping over $250</p>
              <p>Lifetime repairs included</p>
              <p>Handmade to order</p>
              <p>30-day returns</p>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <section className="mt-24">
          <h2 className="text-center font-serif text-3xl text-foreground md:text-4xl">
            You may also like
          </h2>
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
            {recommendations.map((p: any) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
      <CartDrawer />
    </>
  )
}
