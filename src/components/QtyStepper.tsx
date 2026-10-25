import { Minus, Plus } from 'lucide-react'

export function QtyStepper({
  qty,
  onChange,
  label,
  max = 10,
}: {
  qty: number
  onChange: (n: number) => void
  label: string
  max?: number
}) {
  return (
    <div
      className="inline-flex items-center border border-charcoal/30"
      role="group"
      aria-label={`Quantity for ${label}`}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(qty - 1)}
        className="grid size-11 place-items-center transition-opacity hover:opacity-50"
      >
        <Minus className="size-3.5" strokeWidth={1.5} />
      </button>
      <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
        {qty}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={qty >= max}
        onClick={() => onChange(qty + 1)}
        className="grid size-11 place-items-center transition-opacity hover:opacity-50 disabled:opacity-30"
      >
        <Plus className="size-3.5" strokeWidth={1.5} />
      </button>
    </div>
  )
}
