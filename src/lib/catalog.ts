import { PRODUCTS, type Category, type Product } from '@/data/products'

export type SortKey = 'featured' | 'price-asc' | 'price-desc'

export const SORTS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

export function applyView(source: Product[], category: Category | 'All', sort: SortKey): Product[] {
  const filtered = category === 'All' ? source : source.filter((p) => p.category === category)
  return [...filtered].sort((a, b) =>
    sort === 'price-asc'
      ? a.price - b.price
      : sort === 'price-desc'
        ? b.price - a.price
        : a.featuredRank - b.featuredRank,
  )
}

export const countFor = (c: Category | 'All') =>
  c === 'All' ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === c).length
