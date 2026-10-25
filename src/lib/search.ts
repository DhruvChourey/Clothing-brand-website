import { COLLECTIONS, PRODUCTS, type Product } from '@/data/products'

/** Case-insensitive match across name, category, collection, colours and materials. */
export function searchProducts(query: string): Product[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  return PRODUCTS.filter((p) => {
    const collection = COLLECTIONS.find((c) => c.slug === p.collection)?.name ?? ''
    const hay = [
      p.name,
      p.category,
      collection,
      p.composition,
      p.summary,
      ...p.colors.map((c) => c.name),
    ]
      .join(' ')
      .toLowerCase()
    return terms.every((t) => hay.includes(t))
  }).sort((a, b) => a.featuredRank - b.featuredRank)
}
