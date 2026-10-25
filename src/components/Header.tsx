import { Menu, Search, ShoppingBag, User } from 'lucide-react'
import { useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { DUR, EASE, gsap, ScrollTrigger, useMotion } from '@/lib/motion'
import { NAV } from '@/data/nav'
import { cn } from '@/lib/utils'
import { useShop } from '@/store/shop-context'
import { Wordmark } from './Wordmark'

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-gold-light">
      <p className="label flex h-9 items-center justify-center px-4 text-center !tracking-[0.22em]">
        Complimentary shipping &amp; returns on every order
      </p>
    </div>
  )
}

export function Header() {
  const { count, openOverlay } = useShop()
  const { pathname, search } = useLocation()
  const ref = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  // Condense after the fold; tuck away on the way down, return on the way up.
  useMotion(
    () => {
      const hidden = { value: false }
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const y = self.scroll()
          setScrolled(y > 24)
          const shouldHide = self.direction === 1 && y > 600
          if (shouldHide !== hidden.value && (shouldHide || self.direction === -1)) {
            hidden.value = shouldHide
            gsap.to(ref.current, {
              yPercent: shouldHide ? -100 : 0,
              duration: DUR.fast,
              ease: EASE.soft,
              overwrite: true,
            })
          }
        },
      })
      return () => setScrolled(false)
    },
    { scope: ref },
  )

  const isActive = (to: string) => {
    const [path, q] = to.split('?')
    if (path === '/') return pathname === '/'
    if (path === '/shop')
      return pathname === '/shop' && (q ? search.includes(q) : !search.includes('new=1'))
    return pathname.startsWith(path)
  }

  const iconBtn =
    'relative grid size-12 place-items-center transition-opacity duration-300 hover:opacity-55'

  return (
    <header
      ref={ref}
      className={cn(
        'sticky top-0 z-50 border-b bg-charcoal text-ivory transition-[border-color] duration-500',
        scrolled
          ? 'border-charcoal/10 shadow-[0_14px_30px_-22px_rgba(28,27,25,0.45)]'
          : 'border-transparent',
      )}
    >
      <div
        className={cn(
          'gutter grid grid-cols-[auto_1fr_auto] items-center sm:grid-cols-[1fr_auto_1fr] transition-[height] duration-500 ease-luxe',
          scrolled ? 'h-[4.5rem]' : 'h-[5.75rem]',
        )}
      >
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Open menu"
            className={cn(iconBtn, '-ml-3 min-[1500px]:hidden')}
            onClick={() => openOverlay('menu')}
          >
            <Menu className="size-[1.5rem]" strokeWidth={1.25} />
          </button>
          <nav aria-label="Primary" className="hidden items-center gap-6 min-[1500px]:flex">
            {NAV.map((item) => {
              const active = isActive(item.to)
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'label relative whitespace-nowrap py-3 !text-[0.8rem] !font-medium !tracking-[0.18em] transition-colors duration-500',
                    'after:absolute after:inset-x-0 after:bottom-1.5 after:h-px after:origin-left after:bg-gold-light after:transition-transform after:duration-700 after:ease-luxe',
                    active
                      ? 'text-ivory after:scale-x-100'
                      : 'text-ivory/65 after:scale-x-0 hover:text-ivory hover:after:scale-x-100',
                  )}
                >
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </div>

        <Wordmark className="justify-self-center text-[0.82rem] tracking-[0.22em] pl-[0.22em] sm:text-[1.6rem] sm:tracking-[0.42em] sm:pl-[0.42em] lg:text-[1.3rem] lg:tracking-[0.36em] min-[1700px]:text-[1.85rem] min-[1700px]:tracking-[0.42em]" />

        <div className="flex items-center justify-end">
          <button
            type="button"
            aria-label="Search"
            className={iconBtn}
            onClick={() => openOverlay('search')}
          >
            <Search className="size-[1.35rem]" strokeWidth={1.25} />
          </button>
          <Link to="/account" aria-label="Account" className={cn(iconBtn, 'hidden sm:grid')}>
            <User className="size-[1.35rem]" strokeWidth={1.25} />
          </Link>
          <button
            type="button"
            aria-label={`Shopping bag, ${count} ${count === 1 ? 'item' : 'items'}`}
            className={cn(iconBtn, '-mr-2 sm:mr-0')}
            onClick={() => openOverlay('cart')}
          >
            <ShoppingBag className="size-[1.35rem]" strokeWidth={1.25} />
            {count > 0 && (
              <span className="absolute right-1 top-1.5 grid min-w-4 place-items-center bg-gold-deep px-1 text-[0.625rem] font-medium leading-4 text-ivory">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
