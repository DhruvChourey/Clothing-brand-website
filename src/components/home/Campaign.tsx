import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useMotion } from '@/lib/motion'
import { Img } from '../Img'
import { Reveal, SplitReveal } from '../motion'

/** Full-bleed, dark chapter that breaks the rhythm of the product grid. */
export function Campaign() {
  const root = useRef<HTMLElement>(null)
  const photo = useRef<HTMLDivElement>(null)

  useMotion(
    ({ isMobile }) => {
      const st = { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true }
      gsap.fromTo(
        photo.current,
        { scale: 1.25, yPercent: -4 },
        { scale: 1, yPercent: 4, ease: 'none', scrollTrigger: st },
      )
      if (!isMobile) {
        gsap.fromTo(
          '[data-outline]',
          { xPercent: 8 },
          { xPercent: -22, ease: 'none', scrollTrigger: st },
        )
      }
      gsap.fromTo(
        '[data-cmask]',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.6,
          ease: 'power3.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
        },
      )
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="campaign-title"
      className="relative isolate min-h-[100svh] overflow-hidden on-dark bg-ink text-ivory"
    >
      <p
        data-outline
        aria-hidden
        className="display pointer-events-none absolute left-0 top-[14%] -z-0 select-none whitespace-nowrap text-[clamp(9rem,30vw,30rem)] font-light uppercase text-transparent [-webkit-text-stroke:1px_rgba(244,240,232,0.16)]"
      >
        Noir · Noir · Noir
      </p>

      <div data-cmask className="absolute inset-y-0 right-0 w-full overflow-hidden md:w-[58%]">
        <div ref={photo} className="size-full will-change-transform">
          <Img
            photo="campaign"
            sizes="(min-width:768px) 58vw, 100vw"
            maxWidth={2400}
            ratio="h-full"
            position="50% 25%"
            className="!bg-ink"
            imgClassName="brightness-[1.5] contrast-[1.08]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/10 to-transparent md:from-ink/90 md:via-transparent md:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent md:from-ink/25" />
      </div>

      <div className="gutter relative z-10 flex min-h-[100svh] flex-col justify-between py-14 md:py-20">
        <Reveal className="label flex items-center justify-between text-ivory/70">
          <span>The Autumn Campaign</span>
          <span>Photographed in black and white</span>
        </Reveal>

        <div className="max-w-[44rem]">
          <SplitReveal as="h2" className="display text-[clamp(3.6rem,9.5vw,10.5rem)] uppercase">
            <span id="campaign-title">The long</span>
            <br />
            <span className="gold-italic font-light normal-case italic">shadow</span>
          </SplitReveal>
          <Reveal stagger={0.12} className="mt-8 max-w-sm">
            <p className="text-ivory/80">
              Shot at the end of the day, when light is low and silhouettes lengthen. Eight looks,
              no colour, and nothing between you and the cut.
            </p>
            <div className="pt-8">
              <Link
                to="/shop?collection=silent-form"
                className="label group inline-flex items-center gap-4 border border-ivory/60 px-7 py-4 transition-colors duration-500 hover:bg-ivory hover:text-charcoal"
              >
                Shop the campaign
                <ArrowRight
                  className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                  strokeWidth={1.25}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
