import { ArrowDownRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { whenIntroDone } from '@/lib/intro'
import { gsap, useMotion } from '@/lib/motion'
import { Img } from '../Img'
import { SplitReveal } from '../motion'

export function Hero() {
  const root = useRef<HTMLElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useMotion(
    ({ isMobile }) => {
      const q = gsap.utils.selector(root)
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })

      gsap.set(frame.current, { clipPath: 'inset(100% 0% 0% 0%)' })
      gsap.set(inner.current, { scale: 1.35 })
      gsap.set(q('[data-hero-fade]'), { opacity: 0, y: 16 })
      gsap.set(q('[data-hero-line]'), { scaleY: 0, transformOrigin: 'top' })

      tl.to(
        frame.current,
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'power3.inOut' },
        0,
      )
        .to(inner.current, { scale: 1.1, duration: 2.4 }, 0)
        .to(q('[data-hero-fade]'), { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, 0.9)
        .to(q('[data-hero-line]'), { scaleY: 1, duration: 1.2, ease: 'power3.inOut' }, 1.6)

      // The scroll cue breathes once the sequence settles.
      const cue = gsap.to(q('[data-hero-line]'), {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 1.4,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 0.6,
        yoyo: false,
        paused: true,
      })
      tl.call(() => cue.play(), undefined, 3.2)

      const cancel = whenIntroDone(() => tl.play())

      if (!isMobile) {
        gsap.to(inner.current, {
          yPercent: 7,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })
      }
      return () => cancel()
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="relative flex flex-col on-dark bg-charcoal text-ivory lg:grid lg:h-[calc(100svh-8rem)] lg:min-h-[640px] lg:grid-cols-12"
    >
      <div className="gutter relative z-10 flex flex-col justify-between gap-12 pb-10 pt-8 lg:col-span-6 lg:pb-10 lg:pr-0 lg:pt-10">
        <div
          data-hero-fade
          className="label flex items-center justify-between gap-8 !text-[0.78rem] text-ivory/60 lg:max-w-[min(32rem,calc(50vw-4.5rem))]"
        >
          <span>Autumn / Winter 2026</span>
          <span>Collection No. 07</span>
        </div>

        <div className="lg:-mr-[9vw]">
          <h1
            id="hero-title"
            className="display text-[clamp(3.2rem,11vw,6.5rem)] uppercase lg:text-[clamp(3.4rem,7.4vw,9.25rem)]"
            aria-label="Form, in its purest state."
          >
            <SplitReveal immediate delay={0.55} as="span" className="block">
              Form, in its <em className="font-light normal-case italic">purest</em> state.
            </SplitReveal>
          </h1>

          <div className="mt-8 flex max-w-md flex-col gap-8 lg:mt-10">
            <p data-hero-fade className="text-[0.95rem] leading-relaxed text-ivory/75">
              Silent Form is a study in proportion — structured outerwear, dense knits and washed
              linens, cut with a quiet architectural line and made to outlast the season.
            </p>
            <div data-hero-fade>
              <Link
                to="/#collection"
                className="label group inline-flex items-center gap-4 border-b border-gold pb-2"
              >
                Discover the collection
                <ArrowDownRight
                  className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1 group-hover:translate-y-1"
                  strokeWidth={1.25}
                />
              </Link>
            </div>
          </div>
        </div>

        <div data-hero-fade className="hidden items-end gap-5 lg:flex">
          <span className="relative block h-14 w-px overflow-hidden bg-ivory/20" aria-hidden>
            <span data-hero-line className="absolute inset-0 bg-gold" />
          </span>
          <span className="label text-ivory/60">Scroll</span>
        </div>
      </div>

      <div className="order-first lg:order-none lg:col-span-6 lg:col-start-7">
        <div className="h-full">
          <div ref={frame} className="relative h-full overflow-hidden">
            <div ref={inner} className="h-full will-change-transform">
              <Img
                photo="hero"
                eager
                maxWidth={2400}
                sizes="(min-width:1024px) 50vw, 100vw"
                ratio="h-[54svh] min-h-[320px] lg:h-full"
                position="50% 30%"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/5" />
            <p
              data-hero-fade
              className="label absolute bottom-4 right-4 hidden bg-ivory/90 px-3 py-2 text-charcoal sm:block"
            >
              Look 07 — Charcoal wool overshirt
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
