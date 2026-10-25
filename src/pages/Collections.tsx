import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MaskImage, Reveal } from '@/components/motion'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { COLLECTIONS, PRODUCTS } from '@/data/products'
import { cn } from '@/lib/utils'

export default function Collections() {
  return (
    <Page title="Collections">
      <PageHeader
        eyebrow="Edited by season"
        title="Collections"
        trail={[{ label: 'Home', to: '/' }, { label: 'Collections' }]}
      >
        <p>
          Three bodies of work, each with its own material and mood. They are designed to be worn
          together.
        </p>
      </PageHeader>

      <div className="gutter space-y-24 pb-32 md:space-y-40">
        {COLLECTIONS.map((c, i) => {
          const count = PRODUCTS.filter((p) => p.collection === c.slug).length
          const flip = i % 2 === 1
          return (
            <article key={c.slug} className="grid items-end gap-8 md:grid-cols-12 md:gap-x-10">
              <Link
                to={`/shop?collection=${c.slug}`}
                aria-label={`${c.name} — shop ${count} pieces`}
                className={cn('group block md:col-span-7', flip && 'md:order-2 md:col-start-6')}
              >
                <MaskImage
                  photo={c.image}
                  ratio={i === 0 ? 'aspect-[4/5]' : 'aspect-[5/4]'}
                  sizes="(min-width:768px) 58vw, 100vw"
                  maxWidth={1800}
                  parallax={4}
                />
              </Link>
              <Reveal
                className={cn(
                  'md:col-span-4',
                  flip ? 'md:order-1 md:col-start-1' : 'md:col-start-9',
                )}
              >
                <p className="label text-mute">
                  0{i + 1} — {c.season}
                </p>
                <h2 className="display mt-4 text-[clamp(3rem,6vw,6rem)]">{c.name}</h2>
                <p className="mt-5 max-w-sm text-charcoal/75">{c.blurb}</p>
                <Link
                  to={`/shop?collection=${c.slug}`}
                  className="label mt-8 inline-flex items-center gap-3 border-b border-charcoal pb-2"
                >
                  View {count} pieces <ArrowUpRight className="size-4" strokeWidth={1.25} />
                </Link>
              </Reveal>
            </article>
          )
        })}
      </div>
    </Page>
  )
}
