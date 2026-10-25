import { useCallback, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react'
import { getProduct, type Product } from '@/data/products'
import { ShopContext, type CartLine, type Overlay, type ShopState } from './shop-context'

const STORAGE_KEY = 'atelier-noir-bag-v1'
const MAX_QTY = 10

type Action =
  | { type: 'add'; line: CartLine }
  | { type: 'qty'; key: string; qty: number }
  | { type: 'remove'; key: string }
  | { type: 'clear' }

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const existing = lines.find((l) => l.key === action.line.key)
      if (!existing) return [...lines, action.line]
      return lines.map((l) =>
        l.key === action.line.key ? { ...l, qty: Math.min(MAX_QTY, l.qty + action.line.qty) } : l,
      )
    }
    case 'qty':
      return action.qty <= 0
        ? lines.filter((l) => l.key !== action.key)
        : lines.map((l) =>
            l.key === action.key ? { ...l, qty: Math.min(MAX_QTY, action.qty) } : l,
          )
    case 'remove':
      return lines.filter((l) => l.key !== action.key)
    case 'clear':
      return []
  }
}

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartLine[]
    return parsed.filter((l) => getProduct(l.slug) && l.qty > 0)
  } catch {
    return []
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, undefined, load)
  const [overlay, setOverlay] = useState<Overlay>(null)
  const [quickAdd, setQuickAdd] = useState<Product | null>(null)
  const [lastAdded, setLastAdded] = useState<string | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      /* private mode: the bag lasts for this visit only */
    }
  }, [lines])

  const addLine = useCallback((slug: string, color: string, size: string, qty = 1) => {
    dispatch({ type: 'add', line: { key: `${slug}|${color}|${size}`, slug, color, size, qty } })
    setLastAdded(slug)
  }, [])

  const setQty = useCallback((key: string, qty: number) => dispatch({ type: 'qty', key, qty }), [])
  const removeLine = useCallback((key: string) => dispatch({ type: 'remove', key }), [])
  const clear = useCallback(() => dispatch({ type: 'clear' }), [])
  const openOverlay = useCallback((o: Exclude<Overlay, null>) => setOverlay(o), [])
  const closeOverlay = useCallback(() => setOverlay(null), [])
  const openQuickAdd = useCallback((p: Product) => setQuickAdd(p), [])
  const closeQuickAdd = useCallback(() => setQuickAdd(null), [])

  const value = useMemo<ShopState>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty, 0)
    return {
      lines,
      count,
      subtotal,
      overlay,
      quickAdd,
      lastAdded,
      addLine,
      setQty,
      removeLine,
      clear,
      openOverlay,
      closeOverlay,
      openQuickAdd,
      closeQuickAdd,
    }
  }, [
    lines,
    overlay,
    quickAdd,
    lastAdded,
    addLine,
    setQty,
    removeLine,
    clear,
    openOverlay,
    closeOverlay,
    openQuickAdd,
    closeQuickAdd,
  ])

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
