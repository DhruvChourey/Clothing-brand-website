import { X } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { FilterBar, ProductGrid } from '@/components/ProductGrid'
import { applyView, SORTS, type SortKey } from '@/lib/catalog'
import { CATEGORIES, getCollection, PRODUCTS, type Category } from '@/data/products'

export default function Shop() {
  const [params, setParams] = useSearchParams()

  const category = (CATEGORIES as string[]).includes(params.get('category') ?? '')
    ? (params.get('category') as Category)
    : 'All'
  const sort = SORTS.some((s) => s.value === params.get('sort'))
    ? (params.get('sort') as SortKey)
    : 'featured'
  const onlyNew = params.get('new') === '1'
  const collection = getCollection(params.get('collection') ?? '')

  const source = useMemo(
    () =>
      PRODUCTS.filter(
        (p) => (!onlyNew || p.isNew) && (!collection || p.collection === collection.slug),
      ),
    [onlyNew, collection],
  )
  const products = useMemo(() => applyView(source, category, sort), [source, category, sort])

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value && value !== 'All' && value !== 'featured') next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const title = onlyNew ? 'New arrivals' : collection ? collection.name : 'Clothing'
  const blurb = onlyNew
    ? 'The latest pieces from Autumn / Winter 2026, newly arrived.'
    : collection
      ? collection.blurb
      : 'Outerwear, shirts, knitwear, trousers and the essentials that sit beneath them.'

  return (
    <Page title={title}>
      <PageHeader
        eyebrow={collection ? collection.season : 'Autumn / Winter 2026'}
        title={title}
        trail={[{ label: 'Home', to: '/' }, { label: title }]}
      >
        <p>{blurb}</p>
      </PageHeader>

      <div className="gutter pb-28">
        {(onlyNew || collection) && (
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {onlyNew && <FilterTag label="New arrivals" onClear={() => update('new', null)} />}
            {collection && (
              <FilterTag label={collection.name} onClear={() => update('collection', null)} />
            )}
          </div>
        )}
        <FilterBar
          category={category}
          sort={sort}
          total={products.length}
          onCategory={(c) => update('category', c)}
          onSort={(s) => update('sort', s)}
        />
        <div className="mt-10 md:mt-14">
          <ProductGrid products={products} onReset={() => setParams({}, { replace: true })} />
        </div>
      </div>
    </Page>
  )
}

function FilterTag({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      type="button"
      onClick={onClear}
      aria-label={`Remove filter: ${label}`}
      className="label inline-flex items-center gap-3 border border-charcoal/30 px-4 py-2 transition-colors hover:bg-charcoal hover:text-ivory"
    >
      {label} <X className="size-3.5" strokeWidth={1.5} />
    </button>
  )
}
