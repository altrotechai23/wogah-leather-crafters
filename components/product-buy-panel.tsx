'use client'

import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import type { Product } from '@/lib/products'

export function ProductBuyPanel({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()
  const [qty, setQty] = useState(1)

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="p-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Minus className="size-4" />
          </button>
          <span className="min-w-10 text-center tabular-nums text-foreground">
            {qty}
          </span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="p-3 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => addItem(product, qty)}
          className="flex-1 bg-primary py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
        >
          Add to Cart
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          addItem(product, qty)
          openCart()
        }}
        className="mt-3 w-full border border-foreground py-4 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground hover:text-background"
      >
        Buy It Now
      </button>
    </div>
  )
}
