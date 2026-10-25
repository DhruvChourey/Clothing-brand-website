import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { MaskImage, Reveal } from '@/components/motion'
import { Page } from '@/components/Page'
import { PageHeader } from '@/components/PageHeader'
import { ARTICLES, getArticle } from '@/data/journal'
import NotFound from './NotFound'

export default function JournalArticle() {
  const { slug = '' } = useParams()
  const article = getArticle(slug)
  if (!article) return <NotFound />

  const next = ARTICLES[(ARTICLES.indexOf(article) + 1) % ARTICLES.length]

  return (
    <Page title={article.title} key={article.slug}>
      <PageHeader
        eyebrow={`${article.category} · ${article.date} · ${article.readTime}`}
        title={article.title}
        trail={[
          { label: 'Home', to: '/' },
          { label: 'Journal', to: '/journal' },
          { label: article.title },
        ]}
      >
        <p>{article.excerpt}</p>
      </PageHeader>

      <div className="gutter">
        <MaskImage
          photo={article.image}
          ratio="aspect-[4/5] md:aspect-[16/9]"
          sizes="100vw"
          maxWidth={2400}
          eager
          parallax={5}
          position="50% 30%"
        />
      </div>

      <article className="gutter grid gap-10 py-20 md:grid-cols-12 md:py-32">
        <div className="space-y-7 text-[1.05rem] leading-[1.8] text-charcoal/85 md:col-span-6 md:col-start-4">
          {article.body.map((p, i) => (
            <Reveal
              key={i}
              as="p"
              className={
                i === 0
                  ? 'first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-7xl first-letter:leading-[0.8]'
                  : undefined
              }
            >
              {p}
            </Reveal>
          ))}
          <Reveal
            as="blockquote"
            className="heading my-14 border-l border-charcoal/40 pl-6 text-3xl italic md:-mx-24 md:text-5xl"
          >
            {article.pullQuote}
          </Reveal>
        </div>
      </article>

      <nav
        aria-label="Journal"
        className="gutter flex flex-col gap-6 border-t border-charcoal/15 py-12 sm:flex-row sm:items-center sm:justify-between"
      >
        <Link to="/journal" className="label inline-flex items-center gap-3">
          <ArrowLeft className="size-4" strokeWidth={1.25} /> All stories
        </Link>
        <Link to={`/journal/${next.slug}`} className="inline-flex items-center gap-4 text-right">
          <span>
            <span className="label block text-mute">Next story</span>
            <span className="heading text-3xl md:text-4xl">{next.title}</span>
          </span>
          <ArrowRight className="size-5" strokeWidth={1.25} />
        </Link>
      </nav>
      <div className="h-24" />
    </Page>
  )
}
