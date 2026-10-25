import Lenis from 'lenis'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLenis, setLenis } from './lenis-instance'
import { gsap, ScrollTrigger } from './motion'
import { prefersReducedMotion } from './utils'

/**
 * Lenis driven by GSAP's ticker, so ScrollTrigger and smooth scrolling share one clock.
 * Disabled for reduced-motion visitors; touch devices keep native momentum scrolling.
 */
export function SmoothScroll() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9, autoRaf: false })
    setLenis(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  // Route changes: restore scroll position, or glide to the in-page anchor.
  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
    if (target) {
      const go = () => {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(target, { offset: -90, duration: 1.2 })
        else target.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
      const id = window.setTimeout(go, 120)
      return () => window.clearTimeout(id)
    }
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
