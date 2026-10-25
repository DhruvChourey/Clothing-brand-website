import { useRef, type ElementType, type ReactNode } from 'react'
import { DUR, EASE, gsap, ScrollTrigger, SplitText, useMotion } from '@/lib/motion'
import { whenIntroDone } from '@/lib/intro'
import { cn } from '@/lib/utils'
import { Img } from './Img'
import type { ImageKey } from '@/data/images'

type SplitProps = {
  as?: ElementType
  children: ReactNode
  className?: string
  /** Start on mount (after the intro loader) instead of when scrolled into view. */
  immediate?: boolean
  delay?: number
}

/**
 * Line-masked text entrance. Lines are re-split on resize via SplitText's autoSplit, and the
 * tween is returned from onSplit so it is carried over correctly.
 */
export function SplitReveal({
  as: Tag = 'div',
  children,
  className,
  immediate,
  delay = 0,
}: SplitProps) {
  const ref = useRef<HTMLElement>(null)

  useMotion(
    () => {
      const el = ref.current
      if (!el) return
      let cancelled = false
      let played = false
      let cancelIntro = () => {}
      let split: SplitText | undefined
      gsap.set(el, { visibility: 'hidden' })
      document.fonts.ready.then(() => {
        if (cancelled) return
        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          onSplit: (self) => {
            gsap.set(el, { visibility: 'visible' })
            // A re-split (resize, late font swap) must never replay the entrance.
            if (played) {
              gsap.set(self.lines, { yPercent: 0 })
              return
            }
            const vars = { yPercent: 0, duration: DUR.slow, ease: EASE.out, stagger: 0.09, delay }
            gsap.set(self.lines, { yPercent: 110 })
            if (immediate) {
              cancelIntro = whenIntroDone(() => {
                played = true
                gsap.to(self.lines, vars)
              })
              return
            }
            ScrollTrigger.create({
              trigger: el,
              start: 'top 88%',
              once: true,
              onEnter: () => {
                played = true
                gsap.to(self.lines, vars)
              },
            })
          },
        })
      })
      return () => {
        cancelled = true
        cancelIntro()
        split?.revert()
        gsap.set(el, { clearProps: 'visibility' })
      }
    },
    { scope: ref, dependencies: [children] },
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** Fade + rise for blocks of content. `stagger` animates direct children instead. */
export function Reveal({
  as: Tag = 'div',
  children,
  className,
  stagger,
  delay = 0,
  y = 28,
}: {
  as?: ElementType
  children: ReactNode
  className?: string
  stagger?: number
  delay?: number
  y?: number
}) {
  const ref = useRef<HTMLElement>(null)
  useMotion(
    () => {
      const el = ref.current
      if (!el) return
      const targets = stagger ? Array.from(el.children) : el
      gsap.fromTo(
        targets,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: DUR.base,
          ease: EASE.soft,
          stagger: stagger ?? 0,
          delay,
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        },
      )
    },
    { scope: ref },
  )
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/** A thin rule that draws itself from the left. */
export function DrawLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useMotion(
    () => {
      gsap.from(ref.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: DUR.slow,
        ease: EASE.inOut,
        scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      })
    },
    { scope: ref },
  )
  return <div ref={ref} className={cn('rule', className)} aria-hidden />
}

type MaskImageProps = {
  photo: ImageKey
  ratio: string
  sizes: string
  className?: string
  position?: string
  /** Vertical travel of the image inside its frame, as a percentage. 0 disables parallax. */
  parallax?: number
  eager?: boolean
  maxWidth?: number
}

/** Image unveiled by an inset clip-path, with a subtle scroll-linked drift inside the frame. */
export function MaskImage({
  photo,
  ratio,
  sizes,
  className,
  position,
  parallax = 6,
  eager,
  maxWidth,
}: MaskImageProps) {
  const frame = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useMotion(
    ({ isMobile }) => {
      const trigger = { trigger: frame.current, start: 'top 90%', once: true }
      gsap.fromTo(
        frame.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: DUR.slow,
          ease: EASE.inOut,
          scrollTrigger: trigger,
        },
      )
      gsap.fromTo(
        inner.current,
        { scale: parallax ? 1.4 : 1.2 },
        { scale: parallax ? 1.15 : 1, duration: 1.8, ease: EASE.out, scrollTrigger: trigger },
      )
      if (parallax && !isMobile) {
        gsap.fromTo(
          inner.current,
          { yPercent: -parallax },
          {
            yPercent: parallax,
            ease: 'none',
            scrollTrigger: {
              trigger: frame.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      }
    },
    { scope: frame },
  )

  return (
    <div className={cn('drop-shadow-[0_30px_30px_rgba(28,27,25,0.2)]', className)}>
      <div ref={frame} className="overflow-hidden">
        <div ref={inner} className="will-change-transform">
          <Img
            photo={photo}
            ratio={ratio}
            sizes={sizes}
            position={position}
            eager={eager}
            maxWidth={maxWidth}
          />
        </div>
      </div>
    </div>
  )
}
