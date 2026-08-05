'use client'

import { useMemo, useState } from 'react'

import { ProductCard } from '@/components/product-card'
import { categories } from '@/lib/catalog'
import type { Category, Product } from '@/lib/types/product'

type Filter = Category | 'All'
type SortKey = 'featured' | 'price-asc' | 'price-desc'

interface ShopGridProps {
  initialCategory: Filter
  products: Product[]
}

export function ShopGrid({
  initialCategory,
  products,
}: ShopGridProps) {
  const [active, setActive] = useState<Filter>(initialCategory)
  const [sort, setSort] = useState<SortKey>('featured')

  const visible = useMemo(() => {
    const filtered =
      active === 'All'
        ? products
        : products.filter((product) => product.category === active)

    const sorted = [...filtered]

    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break

      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break

      default:
        // Featured first, then newest
        sorted.sort((a, b) => {
          if (a.bestseller === b.bestseller) return 0
          return a.bestseller ? -1 : 1
        })
    }

    return sorted
  }, [active, sort, products])

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActive(cat.value)}
              className={`text-xs uppercase tracking-[0.15em] transition-colors ${
                active === cat.value
                  ? 'text-accent'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        <label className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-muted-foreground">
          Sort

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="border border-border bg-transparent px-3 py-2 text-xs uppercase tracking-[0.1em] text-foreground focus:border-accent focus:outline-none"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-xs uppercase tracking-wider text-muted-foreground">
        {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
      </p>

      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-3">
        {visible.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  )
}