import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/** One motion language: a long, soft deceleration for entrances; a gentler in-out for exits. */
export const EASE = { out: 'expo.out', soft: 'power3.out', inOut: 'power3.inOut' } as const
export const DUR = { fast: 0.5, base: 0.9, slow: 1.4 } as const

type MotionCtx = { isMobile: boolean }
type Config = { scope?: RefObject<Element | null>; dependencies?: unknown[] }

/**
 * useGSAP + gsap.matchMedia. The callback only runs when the visitor has not requested
 * reduced motion, so content simply remains in its final state otherwise. Everything created
 * inside (tweens, ScrollTriggers, SplitText) is reverted on unmount or media change.
 */
export function useMotion(callback: (ctx: MotionCtx) => void | (() => void), config: Config) {
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(
      { ok: '(prefers-reduced-motion: no-preference)', mobile: '(max-width: 767px)' },
      (context) => {
        const c = context.conditions as { ok?: boolean; mobile?: boolean }
        if (!c.ok) return
        return callback({ isMobile: !!c.mobile })
      },
    )
    return () => mm.revert()
  }, config)
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
