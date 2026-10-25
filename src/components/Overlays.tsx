import { ArrowRight, Search as SearchIcon } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CATEGORIES, getProduct } from '@/data/products'
import { searchProducts } from '@/lib/search'
import { formatPrice } from '@/lib/utils'
import { useShop } from '@/store/shop-context'
import { NAV } from '@/data/nav'
import { Img } from './Img'
import { ProductPicker } from './ProductPicker'
import { QtyStepper } from './QtyStepper'
import { Button } from './ui/button'
import { Drawer } from './ui/drawer'
import { Wordmark } from './Wordmark'

/** All route-independent overlays live here, mounted once. */
export function Overlays() {
  const { overlay, closeOverlay } = useShop()
  const { pathname, search, hash } = useLocation()

  // Any navigation dismisses open overlays.
  useEffect(() => {
    closeOverlay()
  }, [pathname, search, hash, closeOverlay])

  return (
    <>
      <MenuDrawer open={overlay === 'menu'} onClose={closeOverlay} />
      <SearchDrawer open={overlay === 'search'} onClose={closeOverlay} />
      <CartDrawer open={overlay === 'cart'} onClose={closeOverlay} />
      <QuickAddDrawer />
    </>
  )
}

function MenuDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Drawer
      open={open}
      onOpenChange={(o) => !o && onClose()}
      side="left"
      title="Menu"
      description="Site navigation"
      hideClose
      className="max-w-none sm:max-w-[26rem]"
    >
      <div className="flex items-center justify-between px-5 pt-1">
        <Wordmark className="text-[1.05rem]" />
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="-mr-3 grid size-11 place-items-center"
        >
          <span className="relative block size-5">
            <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
          </span>
        </button>
      </div>
      <nav aria-label="Mobile" className="mt-10 flex flex-1 flex-col px-5">
        {NAV.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            data-drawer-item
            className="heading border-b border-charcoal/12 py-5 text-[2.5rem]"
          >
            {item.label}
          </Link>
        ))}
        <div data-drawer-item className="mt-8 flex flex-col gap-4">
          <Link to="/account" className="label">
            Account
          </Link>
          <Link to="/care" className="label">
            Customer care
          </Link>
          <Link to="/care#contact" className="label">
            Contact
          </Link>
        </div>
      </nav>
      <p data-drawer-item className="label p-5 text-mute">
        Autumn / Winter 2026
      </p>
    </Drawer>
  )
}

function SearchDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchProducts(query).slice(0, 4), [query])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`/search?q=${encodeURIComponent(q)}`)
    setQuery('')
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(o) => !o && onClose()}
      side="top"
      title="Search"
      description="Search the collection"
    >
      <div className="gutter pb-10 pt-16 sm:pt-20">
        <form onSubmit={submit} role="search" className="mx-auto max-w-4xl">
          <label htmlFor="site-search" className="label text-mute">
            Search the collection
          </label>
          <div className="relative mt-3 flex items-center border-b border-charcoal">
            <input
              id="site-search"
              autoFocus
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Trench, linen, cashmere…"
              className="heading h-16 w-full bg-transparent text-3xl placeholder:text-charcoal/30 focus:outline-none sm:text-5xl"
            />
            <button
              type="submit"
              aria-label="Search"
              className="grid size-11 shrink-0 place-items-center"
            >
              <SearchIcon className="size-5" strokeWidth={1.25} />
            </button>
          </div>
        </form>

        <div className="mx-auto mt-8 max-w-4xl" aria-live="polite">
          {query.trim() === '' ? (
            <div data-drawer-item>
              <p className="label text-mute">Browse</p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <Link to={`/shop?category=${c}`} className="heading link-line text-2xl">
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : results.length === 0 ? (
            <p className="text-mute">
              No pieces match “{query}”. Try a material, colour or category.
            </p>
          ) : (
            <>
              <ul className="grid gap-5 sm:grid-cols-2">
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/product/${p.slug}`} className="group flex items-center gap-4">
                      <Img
                        photo={p.images[0]}
                        ratio="aspect-[4/5]"
                        sizes="80px"
                        maxWidth={480}
                        className="w-16 shrink-0"
                      />
                      <span>
                        <span className="heading block text-xl">{p.name}</span>
                        <span className="label text-mute">
                          {p.category} · {formatPrice(p.price)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(query.trim())}`)
                  setQuery('')
                }}
                className="label mt-8 inline-flex items-center gap-3"
              >
                View all results <ArrowRight className="size-4" strokeWidth={1.25} />
              </button>
            </>
          )}
        </div>
      </div>
    </Drawer>
  )
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lines, count, subtotal, setQty, removeLine } = useShop()

  return (
    <Drawer
      open={open}
      onOpenChange={(o) => !o && onClose()}
      title="Shopping bag"
      description="Review the items in your bag"
    >
      <div className="flex items-baseline justify-between px-6 pb-5 pt-6">
        <h2 className="heading text-3xl">Bag</h2>
        <span className="label mr-10 text-mute">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      </div>
      <div className="rule mx-6" />

      {lines.length === 0 ? (
        <div className="flex flex-1 flex-col items-start justify-center gap-6 px-6 pb-24">
          <p data-drawer-item className="heading max-w-xs text-4xl">
            Your bag is empty.
          </p>
          <p data-drawer-item className="max-w-xs text-mute">
            Begin with the new season — each piece is made to be worn for years.
          </p>
          <Button asChild data-drawer-item variant="outline">
            <Link to="/shop?new=1" onClick={onClose}>
              Shop new arrivals
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="flex-1 divide-y divide-charcoal/12 px-6">
            {lines.map((l) => {
              const p = getProduct(l.slug)
              if (!p) return null
              return (
                <li key={l.key} data-drawer-item className="flex gap-4 py-5">
                  <Link to={`/product/${p.slug}`} className="w-24 shrink-0">
                    <Img photo={p.images[0]} ratio="aspect-[4/5]" sizes="96px" maxWidth={480} />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <Link to={`/product/${p.slug}`} className="heading text-xl leading-tight">
                        {p.name}
                      </Link>
                      <span className="text-sm">{formatPrice(p.price * l.qty)}</span>
                    </div>
                    <p className="label mt-1 text-mute">
                      {l.color} · {l.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <QtyStepper qty={l.qty} label={p.name} onChange={(n) => setQty(l.key, n)} />
                      <button
                        type="button"
                        onClick={() => removeLine(l.key)}
                        className="label link-line text-mute"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="sticky bottom-0 border-t border-charcoal/12 bg-ivory px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5">
            <div className="flex items-baseline justify-between">
              <span className="label">Subtotal</span>
              <span className="heading text-2xl">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-sm text-mute">Shipping and returns are complimentary.</p>
            <div className="mt-5 grid gap-3">
              <Button asChild size="lg">
                <Link to="/bag" onClick={onClose}>
                  View bag &amp; checkout
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={onClose}>
                Continue shopping
              </Button>
            </div>
          </div>
        </>
      )}
    </Drawer>
  )
}

function QuickAddDrawer() {
  const { quickAdd, closeQuickAdd, openOverlay } = useShop()
  // Keep the last product mounted while the drawer animates out.
  const [shown, setShown] = useState(quickAdd)
  if (quickAdd && quickAdd !== shown) setShown(quickAdd)

  return (
    <Drawer
      open={!!quickAdd}
      onOpenChange={(o) => !o && closeQuickAdd()}
      title={shown ? `Quick add ${shown.name}` : 'Quick add'}
      description="Choose a colour and size to add this piece to your bag"
    >
      {shown && (
        <div className="flex flex-col px-6 pb-8 pt-14">
          <div data-drawer-item className="flex gap-5">
            <Img
              photo={shown.images[0]}
              ratio="aspect-[4/5]"
              sizes="140px"
              maxWidth={800}
              className="w-32 shrink-0"
            />
            <div>
              <p className="label text-mute">{shown.category}</p>
              <h2 className="heading mt-1 text-3xl leading-none">{shown.name}</h2>
              <p className="mt-2">{formatPrice(shown.price)}</p>
              <p className="mt-3 text-sm text-mute">{shown.summary}</p>
            </div>
          </div>
          <div data-drawer-item className="mt-8">
            <ProductPicker
              key={shown.slug}
              product={shown}
              onAdded={() => {
                closeQuickAdd()
                openOverlay('cart')
              }}
            />
          </div>
          <Link
            to={`/product/${shown.slug}`}
            onClick={closeQuickAdd}
            data-drawer-item
            className="label link-line mt-6 self-start"
          >
            View full details
          </Link>
        </div>
      )}
    </Drawer>
  )
}
