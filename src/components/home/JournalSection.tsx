import { Link } from 'react-router-dom'
import { ARTICLES } from '@/data/journal'
import { JournalCard } from '../JournalCard'
import { Reveal, SplitReveal } from '../motion'

export function JournalSection() {
  const [a, b, c] = ARTICLES
  return (
    <section aria-labelledby="journal-title" className="gutter py-24 md:py-40">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <Reveal>
            <p className="label flex items-center gap-4 text-mute">
              <span>04</span>
              <span className="h-px w-10 bg-gold" />
              <span>Journal</span>
            </p>
          </Reveal>
          <SplitReveal as="h2" className="heading mt-6 text-[clamp(3rem,7vw,6.5rem)]">
            <span id="journal-title">Notes from the studio</span>
          </SplitReveal>
        </div>
        <Link to="/journal" className="label link-line self-start md:self-end">
          All stories
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-16 md:mt-20 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <JournalCard
            article={a}
            index={0}
            ratio="aspect-[4/5]"
            sizes="(min-width:768px) 48vw, 100vw"
          />
        </Reveal>
        <Reveal className="md:col-span-3 md:mt-40" delay={0.1}>
          <JournalCard article={b} index={1} sizes="(min-width:768px) 24vw, 100vw" />
        </Reveal>
        <Reveal className="md:col-span-3 md:mt-20" delay={0.2}>
          <JournalCard article={c} index={2} sizes="(min-width:768px) 24vw, 100vw" />
        </Reveal>
      </div>
    </section>
  )
}
