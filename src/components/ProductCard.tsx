import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '@/data/products'
import { formatPrice } from '@/lib/utils'
import { useShop } from '@/store/shop-context'
import { Img } from './Img'
import { Swatches } from './ProductPicker'

const SIZES = '(min-width:1280px) 22vw, (min-width:768px) 31vw, 48vw'

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const { openQuickAdd } = useShop()
  const [primary, secondary] = product.images

  return (
    <article data-card className="group relative">
      <div className="relative overflow-hidden">
        <Link
          to={`/product/${product.slug}`}
          className="block"
          aria-label={`${product.name}, ${formatPrice(product.price)}`}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-stone shadow-[0_16px_30px_-22px_rgba(28,27,25,0.5)] transition-shadow duration-700 ease-luxe group-hover:shadow-[0_34px_50px_-26px_rgba(28,27,25,0.6)]">
            <Img
              photo={primary}
              sizes={SIZES}
              maxWidth={1200}
              className="absolute inset-0 !aspect-auto h-full"
              imgClassName="transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04]"
            />
            {secondary && (
              <Img
                photo={secondary}
                sizes={SIZES}
                maxWidth={1200}
                alt=""
                className="absolute inset-0 !aspect-auto h-full opacity-0 transition-opacity duration-700 ease-luxe group-hover:opacity-100 group-focus-within:opacity-100"
              />
            )}
          </div>
        </Link>
        {product.isNew && (
          <span className="label absolute left-3 top-3 bg-ivory px-2 py-1 text-gold-deep !text-[0.625rem]">
            New
          </span>
        )}
        <button
          type="button"
          onClick={() => openQuickAdd(product)}
          className="label absolute inset-x-0 bottom-0 h-12 translate-y-full bg-ivory/95 transition-transform duration-500 ease-luxe focus-visible:translate-y-0 group-hover:translate-y-0 group-focus-within:translate-y-0 [@media(hover:none)]:hidden"
        >
          Quick add
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="label text-mute">{product.category}</p>
          <h3 className="heading mt-1 text-[1.35rem] leading-tight sm:text-2xl">
            <Link to={`/product/${product.slug}`}>{product.name}</Link>
          </h3>
        </div>
        <p className="shrink-0 pt-0.5 text-sm">{formatPrice(product.price)}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <Swatches colors={product.colors} size="sm" />
        <button
          type="button"
          onClick={() => openQuickAdd(product)}
          className="label link-line hidden [@media(hover:none)]:inline-block"
        >
          Quick add
        </button>
      </div>
    </article>
  )
})
