import { Check } from 'lucide-react'
import { useId, useState } from 'react'
import type { Product, Swatch } from '@/data/products'
import { cn } from '@/lib/utils'
import { useShop } from '@/store/shop-context'
import { QtyStepper } from './QtyStepper'
import { Button } from './ui/button'

export function Swatches({
  colors,
  value,
  onChange,
  size = 'md',
}: {
  colors: Swatch[]
  value?: string
  onChange?: (name: string) => void
  size?: 'sm' | 'md'
}) {
  const dim = size === 'sm' ? 'size-3.5' : 'size-7'
  return (
    <ul
      className="flex items-center gap-2.5"
      role={onChange ? 'radiogroup' : undefined}
      aria-label="Colour"
    >
      {colors.map((c) => {
        const active = value === c.name
        return (
          <li key={c.name}>
            {onChange ? (
              <button
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={c.name}
                title={c.name}
                onClick={() => onChange(c.name)}
                className={cn(
                  'grid size-11 place-items-center border transition-colors duration-300',
                  active ? 'border-charcoal' : 'border-transparent hover:border-charcoal/40',
                )}
              >
                <span
                  className={cn(dim, 'block border border-charcoal/15')}
                  style={{ background: c.hex }}
                />
              </button>
            ) : (
              <span
                className={cn(dim, 'block border border-charcoal/20')}
                style={{ background: c.hex }}
                title={c.name}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

/** Colour + size + (optional) quantity and add-to-bag. Shared by the quick-add drawer and PDP. */
export function ProductPicker({
  product,
  onAdded,
  withQty,
}: {
  product: Product
  onAdded?: () => void
  withQty?: boolean
}) {
  const { addLine } = useShop()
  const [color, setColor] = useState(product.colors[0].name)
  const [size, setSize] = useState<string | null>(null)
  const [qty, setQty] = useState(1)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)
  const errId = useId()

  const submit = () => {
    if (!size) {
      setError(true)
      return
    }
    addLine(product.slug, color, size, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 2200)
    onAdded?.()
  }

  return (
    <div className="space-y-7">
      <div>
        <p className="label mb-3">
          Colour <span className="ml-2 text-mute">{color}</span>
        </p>
        <Swatches colors={product.colors} value={color} onChange={setColor} />
      </div>

      <fieldset>
        <legend className="label mb-3 flex w-full justify-between">
          <span>Size</span>
          {error && (
            <span id={errId} role="alert" className="text-red-800">
              Please select a size
            </span>
          )}
        </legend>
        <div
          className="grid grid-cols-5 gap-2"
          role="radiogroup"
          aria-describedby={error ? errId : undefined}
        >
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              onClick={() => {
                setSize(s)
                setError(false)
              }}
              className={cn(
                'h-12 border text-sm transition-colors duration-300',
                size === s
                  ? 'border-charcoal bg-charcoal text-ivory'
                  : 'border-charcoal/25 hover:border-charcoal',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex items-stretch gap-3">
        {withQty && (
          <QtyStepper qty={qty} onChange={(n) => setQty(Math.max(1, n))} label={product.name} />
        )}
        <Button type="button" size="lg" className="h-[3.25rem] flex-1" onClick={submit}>
          {added ? (
            <>
              <Check className="size-4" strokeWidth={1.5} /> Added
            </>
          ) : (
            'Add to bag'
          )}
        </Button>
      </div>
    </div>
  )
}
