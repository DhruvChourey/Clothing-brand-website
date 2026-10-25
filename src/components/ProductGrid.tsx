import { useMemo, useRef } from 'react'
import { CATEGORIES, type Category, type Product } from '@/data/products'
import { countFor, SORTS, type SortKey } from '@/lib/catalog'
import { DUR, EASE, gsap, ScrollTrigger, useMotion } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { ProductCard } from './ProductCard'
import { Button } from './ui/button'

export function FilterBar({
  category,
  sort,
  onCategory,
  onSort,
  total,
}: {
  category: Category | 'All'
  sort: SortKey
  onCategory: (c: Category | 'All') => void
  onSort: (s: SortKey) => void
  total: number
}) {
  const options: (Category | 'All')[] = ['All', ...CATEGORIES]
  return (
    <div className="flex flex-col gap-5 border-y border-charcoal/15 py-4 lg:flex-row lg:items-center lg:justify-between">
      <div
        role="group"
        aria-label="Filter by category"
        className="scrollbar-none -mx-5 flex gap-x-7 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0"
      >
        {options.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={category === c}
            onClick={() => onCategory(c)}
            className={cn(
              'label relative shrink-0 py-3 transition-opacity md:py-2 duration-300',
              category === c ? 'opacity-100' : 'opacity-50 hover:opacity-100',
            )}
          >
            {c}
            <sup className="ml-1 text-[0.55rem] tracking-normal">{countFor(c)}</sup>
            <span
              className={cn(
                'absolute inset-x-0 bottom-0 h-px origin-left bg-current transition-transform duration-500 ease-luxe',
                category === c ? 'scale-x-100' : 'scale-x-0',
              )}
            />
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-6 lg:justify-end">
        <p className="label text-mute" aria-live="polite">
          {total} {total === 1 ? 'piece' : 'pieces'}
        </p>
        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="label text-mute">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="label h-11 cursor-pointer max-sm:!text-base border-0 border-b border-charcoal/40 bg-transparent pr-6 focus:border-charcoal focus:outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

/** Responsive grid whose cards rise into place, on scroll and whenever the view changes. */
export function ProductGrid({ products, onReset }: { products: Product[]; onReset?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const signature = useMemo(() => products.map((p) => p.slug).join(), [products])

  useMotion(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]', ref.current)
      if (!cards.length) return
      gsap.set(cards, { opacity: 0, y: 36 })
      ScrollTrigger.batch(cards, {
        start: 'top 94%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: DUR.base,
            ease: EASE.soft,
            stagger: 0.08,
            overwrite: true,
            clearProps: 'transform,opacity',
          }),
      })
    },
    { scope: ref, dependencies: [signature] },
  )

  if (products.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="heading text-4xl">Nothing here yet.</p>
        <p className="mx-auto mt-3 max-w-sm text-mute">No pieces match this selection.</p>
        {onReset && (
          <Button variant="outline" className="mt-8" onClick={onReset}>
            Clear filters
          </Button>
        )}
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 md:gap-y-14 xl:grid-cols-4"
    >
      {products.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  )
}
