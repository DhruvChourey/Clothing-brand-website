import { createContext, useContext } from 'react'
import type { Product } from '@/data/products'

export type CartLine = {
  key: string
  slug: string
  color: string
  size: string
  qty: number
}

export type Overlay = 'menu' | 'search' | 'cart' | null

export type ShopState = {
  lines: CartLine[]
  count: number
  subtotal: number
  overlay: Overlay
  quickAdd: Product | null
  lastAdded: string | null
  addLine: (slug: string, color: string, size: string, qty?: number) => void
  setQty: (key: string, qty: number) => void
  removeLine: (key: string) => void
  clear: () => void
  openOverlay: (o: Exclude<Overlay, null>) => void
  closeOverlay: () => void
  openQuickAdd: (p: Product) => void
  closeQuickAdd: () => void
}

export const ShopContext = createContext<ShopState | null>(null)

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used within ShopProvider')
  return ctx
}
