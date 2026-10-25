import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Reveal, SplitReveal } from './motion'

export function Breadcrumb({ trail }: { trail: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="label text-mute">
      <ol className="flex flex-wrap items-center gap-x-3">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-3">
            {t.to ? (
              <Link to={t.to} className="link-line">
                {t.label}
              </Link>
            ) : (
              <span aria-current="page">{t.label}</span>
            )}
            {i < trail.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function PageHeader({
  eyebrow,
  title,
  children,
  trail,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  trail?: { label: string; to?: string }[]
}) {
  return (
    <header className="gutter pb-12 pt-10 md:pb-16 md:pt-16">
      {trail && <Breadcrumb trail={trail} />}
      <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p className="label text-mute">{eyebrow}</p>
          <SplitReveal as="h1" immediate className="display mt-5 text-[clamp(3.4rem,9vw,9rem)]">
            {title}
          </SplitReveal>
        </div>
        {children && (
          <Reveal className="max-w-sm text-charcoal/75 md:col-span-3 md:col-start-10">
            {children}
          </Reveal>
        )}
      </div>
    </header>
  )
}
