import { NewsletterForm } from '../Newsletter'
import { Reveal, SplitReveal } from '../motion'

export function NewsletterSection() {
  return (
    <section
      aria-labelledby="newsletter-title"
      className="gutter border-t border-charcoal/15 py-24 md:py-36"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label text-mute">Newsletter</p>
          </Reveal>
          <SplitReveal as="h2" className="heading mt-5 text-[clamp(2.8rem,6vw,5.5rem)]">
            <span id="newsletter-title">
              Letters from the studio, <em className="font-light italic">seldom</em> and considered.
            </span>
          </SplitReveal>
        </div>
        <Reveal className="lg:col-span-4 lg:col-start-9">
          <p className="mb-8 text-charcoal/75">
            New collections, stories from the journal and first access to small releases. Never more
            than once a month.
          </p>
          <NewsletterForm tone="light" />
        </Reveal>
      </div>
    </section>
  )
}
