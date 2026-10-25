import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { ProductGrid } from '@/components/ProductGrid'
import { Input, Label } from '@/components/ui/input'
import { CATEGORIES } from '@/data/products'
import { searchProducts } from '@/lib/search'

export default function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q')?.trim() ?? ''
  const [draft, setDraft] = useState(q)
  const results = useMemo(() => searchProducts(q), [q])

  return (
    <Page title={q ? `Search: ${q}` : 'Search'}>
      <PageHeader
        eyebrow="Search"
        title={q ? <>“{q}”</> : 'Search'}
        trail={[{ label: 'Home', to: '/' }, { label: 'Search' }]}
      />

      <div className="gutter pb-28">
        <form
          role="search"
          className="mb-12 max-w-xl"
          onSubmit={(e) => {
            e.preventDefault()
            setParams(draft.trim() ? { q: draft.trim() } : {})
          }}
        >
          <Label htmlFor="q">Search the collection</Label>
          <Input
            id="q"
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Trench, linen, cashmere…"
          />
        </form>

        {!q ? (
          <div>
            <p className="label text-mute">Browse by category</p>
            <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-4">
              {CATEGORIES.map((c) => (
                <li key={c}>
                  <Link to={`/shop?category=${c}`} className="heading link-line text-3xl">
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : results.length === 0 ? (
          <div className="border-y border-charcoal/15 py-20 text-center">
            <p className="heading text-4xl">No results for “{q}”.</p>
            <p className="mx-auto mt-3 max-w-sm text-mute">
              Try a material, colour or category — or browse the full collection.
            </p>
            <Link to="/shop" className="label link-line mt-8 inline-block">
              Shop all clothing
            </Link>
          </div>
        ) : (
          <>
            <p className="label mb-8 text-mute" aria-live="polite">
              {results.length} {results.length === 1 ? 'result' : 'results'}
            </p>
            <ProductGrid products={results} />
          </>
        )}
      </div>
    </Page>
  )
}
