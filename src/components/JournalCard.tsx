import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Article } from '@/data/journal'
import { cn } from '@/lib/utils'
import { Img } from './Img'

export function JournalCard({
  article,
  ratio = 'aspect-[3/4]',
  sizes,
  className,
  index,
}: {
  article: Article
  ratio?: string
  sizes: string
  className?: string
  index?: number
}) {
  return (
    <article className={cn('group', className)}>
      <Link to={`/journal/${article.slug}`} className="block">
        <div className="overflow-hidden shadow-[0_26px_44px_-28px_rgba(28,27,25,0.55)]">
          <Img
            photo={article.image}
            ratio={ratio}
            sizes={sizes}
            maxWidth={1800}
            imgClassName="transition-transform duration-[1600ms] ease-luxe group-hover:scale-[1.05]"
          />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <p className="label text-mute">
            {index !== undefined && <span className="mr-3">0{index + 1}</span>}
            {article.category}
          </p>
          <p className="label text-mute">{article.readTime}</p>
        </div>
        <h3 className="heading mt-3 text-4xl leading-none md:text-5xl">{article.title}</h3>
        <p className="mt-3 max-w-sm text-charcoal/70">{article.excerpt}</p>
        <span className="label mt-5 inline-flex items-center gap-2 border-b border-charcoal/0 pb-1 transition-[border-color,gap] duration-500 group-hover:gap-4 group-hover:border-charcoal">
          Read the story <ArrowUpRight className="size-4" strokeWidth={1.25} />
        </span>
      </Link>
    </article>
  )
}
