import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useMotion } from '@/lib/motion'
import { DrawLine, MaskImage, Reveal, SplitReveal } from '../motion'

export function CollectionEditorial() {
  const root = useRef<HTMLElement>(null)

  // The oversized title drifts slightly against the scroll, separating it from the imagery.
  useMotion(
    ({ isMobile }) => {
      if (isMobile) return
      gsap.fromTo(
        '[data-drift]',
        { xPercent: 0 },
        {
          xPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    },
    { scope: root },
  )

  return (
    <section
      ref={root}
      id="collection"
      aria-labelledby="collection-title"
      className="gutter overflow-hidden pb-24 pt-28 md:pb-40 md:pt-44"
    >
      <div className="grid grid-cols-12 gap-x-4 md:gap-x-6">
        <div className="col-span-12">
          <Reveal>
            <p className="label flex items-center gap-4 text-mute">
              <span>01</span>
              <span className="h-px w-10 bg-gold" />
              <span>The collection</span>
            </p>
          </Reveal>
          <div data-drift className="mt-6">
            <SplitReveal as="h2" className="display text-[clamp(4.5rem,16vw,15rem)] uppercase">
              <span id="collection-title">Silent</span>
              <br />
              <span className="ml-[12vw] italic font-light normal-case text-gold-deep md:ml-[22vw]">
                Form
              </span>
            </SplitReveal>
          </div>
        </div>

        <div className="col-span-8 mt-14 md:col-span-5 md:mt-8">
          <MaskImage
            photo="trenchHat"
            ratio="aspect-[4/5]"
            sizes="(min-width:768px) 42vw, 70vw"
            maxWidth={1800}
            position="50% 40%"
          />
          <p className="label mt-3 text-mute">Fig. 1 — The Maren trench, in sand</p>
        </div>

        <div className="col-span-12 mt-16 md:col-span-5 md:col-start-8 md:mt-56">
          <Reveal stagger={0.1} className="max-w-md">
            <p className="heading text-3xl leading-[1.15] md:text-[2.5rem]">
              Clothing that holds a shape without insisting on one.
            </p>
            <p className="mt-6 text-charcoal/75">
              This season begins with structure and ends with ease. Coats are cut long and
              uncluttered; knits are dense and close; linen is washed until it moves like skin.
              Everything is made in a narrow palette of bone, stone, oat and ink, so each piece
              works with the last.
            </p>
            <div className="pt-8">
              <Link
                to="/shop?collection=silent-form"
                className="label group inline-flex items-center gap-4 border-b border-charcoal pb-2"
              >
                Explore Silent Form
                <ArrowRight
                  className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
                  strokeWidth={1.25}
                />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="col-span-12 mt-20 grid grid-cols-12 gap-x-4 md:mt-28 md:gap-x-6">
          <div className="col-span-5 col-start-1 self-end md:col-span-3 md:col-start-2">
            <MaskImage
              photo="trenchWalk"
              ratio="aspect-[3/4]"
              sizes="(min-width:768px) 24vw, 42vw"
              maxWidth={1200}
              parallax={10}
            />
          </div>
          <div className="col-span-12 mt-8 md:col-span-7 md:col-start-6 md:mt-0">
            <MaskImage
              photo="knitHands"
              ratio="aspect-[4/3]"
              sizes="(min-width:768px) 58vw, 100vw"
              maxWidth={1800}
              parallax={5}
            />
            <p className="label mt-3 text-right text-mute">Fig. 2 — Chunky wool knit, mink</p>
          </div>
        </div>
      </div>

      <div className="mt-28 md:mt-40">
        <DrawLine />
        <div className="label mt-5 flex items-center justify-between text-mute">
          <span>02 — Shop the collection</span>
          <span>Continued below</span>
        </div>
      </div>
    </section>
  )
}
