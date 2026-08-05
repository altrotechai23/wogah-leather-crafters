'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product } from '@/lib/types/product'

export type CartItem = {
  product: Product
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  count: number
  subtotal: number
  openCart: () => void
  closeCart: () => void
  addItem: (product: Product, quantity?: number) => void
  removeItem: (slug: string) => void
  updateQuantity: (slug: string, quantity: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.slug === product.slug)
      if (existing) {
        return prev.map((i) =>
          i.product.slug === product.slug
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        )
      }
      return [...prev, { product, quantity }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.product.slug !== slug))
  }, [])

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.product.slug === slug
            ? { ...i, quantity: Math.max(0, quantity) }
            : i,
        )
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity * i.product.price, 0),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      isOpen,
      count,
      subtotal,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
    }),
    [
      items,
      isOpen,
      count,
      subtotal,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
