import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export function Wordmark({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link
      to={to}
      aria-label="Atelier Noir — home"
      className={cn(
        'whitespace-nowrap font-serif text-[1.35rem] font-normal uppercase leading-none tracking-[0.42em] pl-[0.42em]',
        className,
      )}
    >
      Atelier
      <span className="mx-[0.28em] inline-block text-gold-light" aria-hidden>
        ·
      </span>
      Noir
    </Link>
  )
}
