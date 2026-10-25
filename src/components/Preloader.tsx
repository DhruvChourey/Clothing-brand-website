import { useRef, useState } from 'react'
import { finishIntro, shouldPlayIntro } from '@/lib/intro'
import { gsap, useGSAP } from '@/lib/motion'

/** A short, once-per-session reveal: wordmark, a drawn hairline, then the curtain lifts. */
export function Preloader() {
  const [visible, setVisible] = useState(shouldPlayIntro)
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (!shouldPlayIntro) return
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => setVisible(false),
      })
      tl.from('[data-pre-word]', { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.12 })
        .fromTo('[data-pre-line]', { scaleX: 0 }, { scaleX: 1, duration: 0.9 }, 0.15)
        .to('[data-pre-inner]', { opacity: 0, duration: 0.35 }, '+=0.15')
        .to(root.current, { yPercent: -100, duration: 0.95 }, '-=0.1')
        .call(finishIntro, undefined, '-=0.45')
    },
    { scope: root },
  )

  if (!visible) return null
  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading Atelier Noir"
      className="fixed inset-0 z-[200] grid place-items-center bg-charcoal text-ivory"
    >
      <div data-pre-inner className="w-[min(78vw,26rem)] text-center">
        <div className="flex items-center justify-center gap-[0.6em] font-serif text-[clamp(1.5rem,5vw,2.25rem)] font-light uppercase tracking-[0.3em]">
          <span className="mask-line block">
            <span data-pre-word className="block">
              Atelier
            </span>
          </span>
          <span className="mask-line block">
            <span data-pre-word className="block">
              Noir
            </span>
          </span>
        </div>
        <div data-pre-line className="mx-auto mt-6 h-px w-full origin-left bg-gold" />
      </div>
    </div>
  )
}
