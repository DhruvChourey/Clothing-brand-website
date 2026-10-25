import { JournalCard } from '@/components/JournalCard'
import { Reveal } from '@/components/motion'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { ARTICLES } from '@/data/journal'
import { cn } from '@/lib/utils'

export default function Journal() {
  return (
    <Page title="Journal">
      <PageHeader
        eyebrow="Stories & notes"
        title="Journal"
        trail={[{ label: 'Home', to: '/' }, { label: 'Journal' }]}
      >
        <p>On craft, cloth and the quiet discipline of making fewer, better things.</p>
      </PageHeader>

      <div className="gutter grid gap-x-10 gap-y-20 pb-32 md:grid-cols-12 md:gap-y-28">
        {ARTICLES.map((a, i) => (
          <Reveal
            key={a.slug}
            className={cn(
              i === 0 && 'md:col-span-7',
              i === 1 && 'md:col-span-4 md:col-start-9 md:mt-40',
              i === 2 && 'md:col-span-6 md:col-start-2',
            )}
          >
            <JournalCard
              article={a}
              index={i}
              ratio={i === 2 ? 'aspect-[5/4]' : 'aspect-[4/5]'}
              sizes="(min-width:768px) 58vw, 100vw"
            />
          </Reveal>
        ))}
      </div>
      <NewsletterSection />
    </Page>
  )
}
