import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { lockScroll } from '@/lib/lenis-instance'
import { DUR, EASE, gsap } from '@/lib/motion'
import { cn, prefersReducedMotion } from '@/lib/utils'

type Side = 'right' | 'left' | 'top'

const SIDE_CLASS: Record<Side, string> = {
  right: 'right-0 top-0 h-dvh w-full max-w-[28rem]',
  left: 'left-0 top-0 h-dvh w-full max-w-[26rem]',
  top: 'left-0 top-0 w-full max-h-dvh',
}

const FROM: Record<Side, gsap.TweenVars> = {
  right: { xPercent: 100 },
  left: { xPercent: -100 },
  top: { yPercent: -100 },
}

type DrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  side?: Side
  title: string
  description: string
  className?: string
  hideClose?: boolean
  children: ReactNode
}

/**
 * Accessible Radix dialog whose enter/exit is driven by GSAP. The dialog stays mounted for the
 * duration of the exit tween, tweens are killed on re-open, so the drawer is fully interruptible.
 */
export function Drawer({
  open,
  onOpenChange,
  side = 'right',
  title,
  description,
  className,
  hideClose,
  children,
}: DrawerProps) {
  const [render, setRender] = useState(open)
  const panel = useRef<HTMLDivElement | null>(null)
  const veil = useRef<HTMLDivElement | null>(null)
  const reduced = prefersReducedMotion()

  if (open && !render) setRender(true)

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    return () => lockScroll(false)
  }, [open])

  const panelRef = useCallback(
    (el: HTMLDivElement | null) => {
      panel.current = el
      if (!el || reduced) return
      gsap.killTweensOf(el)
      gsap.fromTo(el, FROM[side], { xPercent: 0, yPercent: 0, duration: DUR.base, ease: EASE.out })
      const items = el.querySelectorAll('[data-drawer-item]')
      if (items.length)
        gsap.fromTo(
          items,
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: DUR.base,
            ease: EASE.soft,
            stagger: 0.05,
            delay: 0.18,
            clearProps: 'transform,opacity',
          },
        )
    },
    [side, reduced],
  )

  const veilRef = useCallback(
    (el: HTMLDivElement | null) => {
      veil.current = el
      if (!el || reduced) return
      gsap.killTweensOf(el)
      gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: DUR.base * 0.6, ease: 'power2.out' })
    },
    [reduced],
  )

  useEffect(() => {
    if (open || !render) return
    const p = panel.current
    const v = veil.current
    if (reduced || !p) {
      setRender(false)
      return
    }
    gsap.killTweensOf([p, v])
    gsap.to(v, { opacity: 0, duration: 0.45, ease: 'power2.inOut' })
    gsap.to(p, {
      ...FROM[side],
      duration: 0.6,
      ease: EASE.inOut,
      onComplete: () => setRender(false),
    })
  }, [open, render, side, reduced])

  return (
    <Dialog.Root open={render} onOpenChange={(o) => !o && onOpenChange(false)}>
      <Dialog.Portal>
        <Dialog.Overlay ref={veilRef} className="fixed inset-0 z-[80] bg-ink/45" />
        <Dialog.Content
          ref={panelRef}
          data-lenis-prevent
          className={cn(
            'fixed z-[90] flex flex-col overflow-y-auto overscroll-contain bg-ivory text-charcoal shadow-2xl focus:outline-none',
            SIDE_CLASS[side],
            className,
          )}
        >
          <Dialog.Title className="sr-only">{title}</Dialog.Title>
          <Dialog.Description className="sr-only">{description}</Dialog.Description>
          {!hideClose && (
            <Dialog.Close
              aria-label="Close"
              className="absolute right-3 top-3 z-10 grid size-11 place-items-center transition-opacity hover:opacity-60"
            >
              <X className="size-5" strokeWidth={1.25} />
            </Dialog.Close>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
