'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/cart-provider'
import { formatPrice } from '@/lib/catalog'
import { Product } from '@/lib/types/product'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()

  return (
    <div className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary"
      >
        <Image
          src={product.images[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {(product.isNew || product.bestseller) && (
          <span className="absolute left-3 top-3 bg-background/90 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-foreground">
            {product.isNew ? 'New' : 'Bestseller'}
          </span>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            addItem(product)
          }}
          className="absolute inset-x-3 bottom-3 translate-y-3 bg-primary py-3 text-[11px] uppercase tracking-[0.2em] text-primary-foreground opacity-0 transition-all duration-300 hover:bg-accent group-hover:translate-y-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>
      </Link>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-lg leading-tight text-foreground">
            <Link href={`/products/${product.slug}`} className="hover:text-accent">
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
  {product.colors[0]?.name}

  {product.colors.length > 1 &&
    ` +${product.colors.length - 1} more`}
</p>
        </div>
        <span className="shrink-0 font-serif text-lg text-foreground">
          {formatPrice(product.price)}
        </span>
      </div>
    </div>
  )
}
