'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { useCart } from '@/components/cart/cart-provider'
import { formatPrice } from '@/lib/catalog'

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    count,
  } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeCart])

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeCart}
        className={`absolute inset-0 bg-foreground/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl text-foreground">
            Your Cart{' '}
            <span className="text-muted-foreground">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl text-foreground">
              Your cart is empty
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fine leather goods, made to last a lifetime.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-2 border-b border-accent pb-1 text-sm uppercase tracking-widest text-accent transition-colors hover:text-foreground"
            >
              Browse the collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map(({ product, quantity }) => (
                <li key={product.slug} className="flex gap-4 py-5">
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={closeCart}
                    className="relative size-24 shrink-0 overflow-hidden rounded-sm bg-secondary"
                  >
                    <Image
                      src={product.images?.[0] || '/placeholder.svg'}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={closeCart}
                          className="font-serif text-lg leading-tight text-foreground hover:text-accent"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
                          {product.colors.length > 0
                            ? product.colors.map((color) => color.name).join(" • ")
                            : "Default"}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.slug)}
                        aria-label={`Remove ${product.name}`}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.slug, quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="min-w-8 text-center text-sm tabular-nums text-foreground">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(product.slug, quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="p-2 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <span className="text-sm tabular-nums text-foreground">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-serif text-2xl text-foreground">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <button
                type="button"
                className="mt-4 w-full bg-primary py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
              >
                Proceed to Checkout
              </button>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full text-center text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                Continue Shopping
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
