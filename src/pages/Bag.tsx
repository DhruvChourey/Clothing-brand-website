import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '@/components/Img'
import { QtyStepper } from '@/components/QtyStepper'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Drawer } from '@/components/ui/drawer'
import { getProduct } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useShop } from '@/store/shop-context'

export default function Bag() {
  const { lines, count, subtotal, setQty, removeLine, clear } = useShop()
  const [checkout, setCheckout] = useState(false)
  const [orderRef, setOrderRef] = useState<string | null>(null)

  const placeOrder = () => {
    setOrderRef(`AN-DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`)
    clear()
  }

  const closeCheckout = () => {
    setCheckout(false)
    setOrderRef(null)
  }

  return (
    <Page title="Shopping bag">
      <PageHeader
        eyebrow={`${count} ${count === 1 ? 'item' : 'items'}`}
        title="Shopping bag"
        trail={[{ label: 'Home', to: '/' }, { label: 'Bag' }]}
      />

      {lines.length === 0 ? (
        <section className="gutter pb-32">
          <div className="border-y border-charcoal/15 py-20 text-center">
            <p className="heading text-4xl md:text-5xl">Your bag is empty.</p>
            <p className="mx-auto mt-4 max-w-sm text-mute">
              Pieces you add will wait here for you.
            </p>
            <Button asChild className="mt-8">
              <Link to="/shop">Shop clothing</Link>
            </Button>
          </div>
        </section>
      ) : (
        <section className="gutter grid gap-14 pb-32 lg:grid-cols-12 lg:gap-x-16">
          <ul className="divide-y divide-charcoal/15 border-y border-charcoal/15 lg:col-span-8">
            {lines.map((l) => {
              const p = getProduct(l.slug)
              if (!p) return null
              return (
                <li
                  key={l.key}
                  className="grid grid-cols-[6.5rem_1fr] gap-5 py-7 sm:grid-cols-[9rem_1fr] sm:gap-8"
                >
                  <Link to={`/product/${p.slug}`}>
                    <Img photo={p.images[0]} ratio="aspect-[4/5]" sizes="144px" maxWidth={800} />
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="label text-mute">{p.category}</p>
                        <Link
                          to={`/product/${p.slug}`}
                          className="heading mt-1 block text-2xl sm:text-3xl"
                        >
                          {p.name}
                        </Link>
                        <p className="mt-2 text-sm text-mute">
                          {l.color} · Size {l.size}
                        </p>
                      </div>
                      <p className="shrink-0">{formatPrice(p.price * l.qty)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-5">
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

          <aside aria-labelledby="summary" className="lg:col-span-4">
            <div className="bg-stone/50 p-7 lg:sticky lg:top-28">
              <h2 id="summary" className="heading text-3xl">
                Order summary
              </h2>
              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt>Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd>Complimentary</dd>
                </div>
                <div className="flex justify-between border-t border-charcoal/20 pt-4 text-base">
                  <dt className="label self-center">Total</dt>
                  <dd className="heading text-2xl">{formatPrice(subtotal)}</dd>
                </div>
              </dl>
              <Button size="lg" className="mt-7 w-full" onClick={() => setCheckout(true)}>
                Checkout (demo)
              </Button>
              <p className="mt-4 text-sm text-mute">
                This is a demonstration store. Checkout is simulated and no payment details are
                requested or taken.
              </p>
            </div>
          </aside>
        </section>
      )}

      <Drawer
        open={checkout}
        onOpenChange={(o) => !o && closeCheckout()}
        title="Demo checkout"
        description="A simulated checkout. No payment is taken."
      >
        <div className="flex min-h-full flex-col px-6 pb-8 pt-16">
          {orderRef ? (
            <>
              <p className="label text-mute">Demo order placed</p>
              <h2 className="heading mt-4 text-5xl">Thank you.</h2>
              <p className="mt-5 text-charcoal/80">
                Your simulated order reference is{' '}
                <strong className="font-medium">{orderRef}</strong>. Nothing was charged and no
                order was created.
              </p>
              <Button asChild className="mt-auto" size="lg">
                <Link to="/shop" onClick={closeCheckout}>
                  Continue shopping
                </Link>
              </Button>
            </>
          ) : (
            <>
              <p className="label text-mute">Simulated checkout</p>
              <h2 className="heading mt-4 text-5xl">Demo only.</h2>
              <p className="mt-5 text-charcoal/80">
                Atelier Noir is a fictional label created for demonstration. To go live, connect a
                payment provider such as Stripe Checkout or Shopify — card details should only ever
                be collected by the provider&apos;s own hosted fields.
              </p>
              <p className="mt-4 text-charcoal/80">
                Placing this demo order will clear your bag and show a sample confirmation.
              </p>
              <div className="mt-auto grid gap-3 pt-10">
                <Button size="lg" onClick={placeOrder}>
                  Place demo order · {formatPrice(subtotal)}
                </Button>
                <Button size="lg" variant="outline" onClick={closeCheckout}>
                  Back to bag
                </Button>
              </div>
            </>
          )}
        </div>
      </Drawer>
    </Page>
  )
}
