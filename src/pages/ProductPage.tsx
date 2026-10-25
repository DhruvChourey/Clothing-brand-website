import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Img } from '@/components/Img'
import { Reveal } from '@/components/motion'
import { Page } from '@/components/Page'
import { Breadcrumb } from '@/components/PageHeader'
import { ProductCard } from '@/components/ProductCard'
import { ProductPicker } from '@/components/ProductPicker'
import { COLLECTIONS, getProduct, PRODUCTS } from '@/data/products'
import { DUR, EASE, gsap, useGSAP } from '@/lib/motion'
import { cn, formatPrice, prefersReducedMotion } from '@/lib/utils'
import { useShop } from '@/store/shop-context'
import NotFound from './NotFound'

export default function ProductPage() {
  const { slug = '' } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  return <ProductView key={product.slug} slug={product.slug} />
}

function ProductView({ slug }: { slug: string }) {
  const product = getProduct(slug)!
  const [active, setActive] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const { openOverlay } = useShop()
  const collection = COLLECTIONS.find((c) => c.slug === product.collection)

  const show = (i: number) => {
    if (i === active) return
    setActive(i)
    if (prefersReducedMotion()) return
    gsap.fromTo(
      stage.current,
      { opacity: 0.2, scale: 1.02 },
      {
        opacity: 1,
        scale: 1,
        duration: DUR.base,
        ease: EASE.soft,
        overwrite: true,
        clearProps: 'transform',
      },
    )
  }

  // Gentle zoom-in of the gallery on first view.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from(stage.current, { scale: 1.06, duration: 1.6, ease: EASE.out })
    },
    { scope: stage },
  )

  const related = PRODUCTS.filter((p) => p.slug !== product.slug)
    .sort(
      (a, b) =>
        Number(b.category === product.category) - Number(a.category === product.category) ||
        a.featuredRank - b.featuredRank,
    )
    .slice(0, 4)

  return (
    <Page title={product.name}>
      <div className="gutter pt-8">
        <Breadcrumb
          trail={[
            { label: 'Home', to: '/' },
            { label: 'Clothing', to: '/shop' },
            { label: product.category, to: `/shop?category=${product.category}` },
            { label: product.name },
          ]}
        />
      </div>

      <section className="gutter grid gap-10 pb-24 pt-8 lg:grid-cols-12 lg:gap-x-14 lg:pt-10">
        <div className="lg:col-span-7">
          <div className="flex flex-col-reverse gap-3 md:flex-row md:gap-4">
            <ul className="flex gap-3 md:w-20 md:shrink-0 md:flex-col" aria-label="Product images">
              {product.images.map((key, i) => (
                <li key={key} className="w-20 md:w-full">
                  <button
                    type="button"
                    onClick={() => show(i)}
                    aria-label={`Show image ${i + 1} of ${product.images.length}`}
                    aria-current={active === i}
                    className={cn(
                      'block w-full border transition-opacity duration-300',
                      active === i
                        ? 'border-charcoal'
                        : 'border-transparent opacity-60 hover:opacity-100',
                    )}
                  >
                    <Img photo={key} ratio="aspect-[4/5]" sizes="80px" maxWidth={480} alt="" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="min-w-0 flex-1 overflow-hidden bg-stone">
              <div ref={stage}>
                <Img
                  photo={product.images[active]}
                  ratio="aspect-[4/5]"
                  sizes="(min-width:1024px) 52vw, 100vw"
                  eager
                  maxWidth={2400}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="label text-mute">
              {collection?.name} · {product.category}
              {product.isNew && ' · New'}
            </p>
            <h1 className="display mt-4 text-[clamp(2.8rem,5vw,4.75rem)]">{product.name}</h1>
            <p className="mt-4 text-xl">{formatPrice(product.price)}</p>
            <p className="mt-6 max-w-md text-charcoal/80">{product.description}</p>

            <div className="mt-10">
              <ProductPicker product={product} withQty onAdded={() => openOverlay('cart')} />
            </div>
            <p className="mt-4 text-sm text-mute">
              Complimentary shipping and returns. Demo store — no payment is taken.
            </p>

            <div className="mt-10 border-t border-charcoal/15">
              <Detail title="Details" open>
                <ul className="space-y-2">
                  {product.details.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-current" />
                      {d}
                    </li>
                  ))}
                </ul>
              </Detail>
              <Detail title="Composition">{product.composition}</Detail>
              <Detail title="Care">{product.care}</Detail>
              <Detail title="Shipping & returns">
                Orders ship within two working days. Returns are accepted within 30 days, unworn and
                with tags attached.{' '}
                <Link to="/care#shipping" className="link-line">
                  Read more
                </Link>
                .
              </Detail>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="related" className="gutter pb-28">
        <Reveal>
          <h2 id="related" className="heading text-4xl md:text-6xl">
            You may also consider
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </Page>
  )
}

function Detail({
  title,
  children,
  open,
}: {
  title: string
  children: React.ReactNode
  open?: boolean
}) {
  return (
    <details open={open} className="group border-b border-charcoal/15">
      <summary className="label flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden className="relative size-3">
          <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
        </span>
      </summary>
      <div className="pb-6 text-charcoal/80">{children}</div>
    </details>
  )
}
