import { ArrowRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS, type Category } from '@/data/products'
import { FilterBar, ProductGrid } from '../ProductGrid'
import { applyView, type SortKey } from '@/lib/catalog'
import { Reveal, SplitReveal } from '../motion'

const LIMIT = 8

export function ShopSection() {
  const [category, setCategory] = useState<Category | 'All'>('All')
  const [sort, setSort] = useState<SortKey>('featured')
  const all = useMemo(() => applyView(PRODUCTS, category, sort), [category, sort])
  const visible = useMemo(() => all.slice(0, LIMIT), [all])

  return (
    <section
      id="shop"
      aria-labelledby="shop-title"
      className="gutter bg-stone pb-28 pt-24 md:pb-40 md:pt-32"
    >
      <div className="flex flex-col justify-between gap-6 pb-12 md:flex-row md:items-end">
        <SplitReveal as="h2" className="heading text-[clamp(3rem,7vw,6.5rem)]">
          <span id="shop-title">Shop the collection</span>
        </SplitReveal>
        <Reveal className="max-w-xs text-charcoal/75">
          <p>
            Twelve pieces, one palette. Filter by category or sort by price — every piece is made in
            small runs.
          </p>
        </Reveal>
      </div>

      <FilterBar
        category={category}
        sort={sort}
        onCategory={setCategory}
        onSort={setSort}
        total={all.length}
      />

      <div className="mt-10 md:mt-14">
        <ProductGrid
          products={visible}
          onReset={() => {
            setCategory('All')
            setSort('featured')
          }}
        />
      </div>

      <div className="mt-16 flex justify-center">
        <Link
          to={category === 'All' ? '/shop' : `/shop?category=${category}`}
          className="label group inline-flex items-center gap-4 border-b border-charcoal pb-2"
        >
          {all.length > LIMIT ? `View all ${all.length} pieces` : 'View all clothing'}
          <ArrowRight
            className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
            strokeWidth={1.25}
          />
        </Link>
      </div>
    </section>
  )
}
