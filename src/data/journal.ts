import type { ImageKey } from './images'

export type Article = {
  slug: string
  title: string
  category: string
  date: string
  readTime: string
  image: ImageKey
  excerpt: string
  body: string[]
  pullQuote: string
}

export const ARTICLES: Article[] = [
  {
    slug: 'the-art-of-less',
    title: 'The Art of Less',
    category: 'Philosophy',
    date: 'October 2026',
    readTime: '5 min read',
    image: 'walking',
    excerpt: 'On editing a wardrobe, and why the quietest garments are often the hardest to make.',
    pullQuote:
      'Subtraction is not absence. It is the discipline of deciding what a garment is for.',
    body: [
      'Every season, the design room begins with the same exercise: take a piece from the previous collection and remove something. A seam, a pocket, a button, an opinion. What remains is either stronger or it is not ready.',
      'We do not think of this as minimalism. Minimalism is a look. What we practise is closer to editing — a slow, repeated judgement about what a coat needs in order to be a coat, and what it is merely decorated with.',
      'A trouser, for example, can lose its belt loops if the waistband is cut correctly. A shirt can lose its collar stand if the shoulder is allowed to fall naturally. Each omission asks something more of the pattern, and more of the person who cuts it.',
      'The result is clothing that asks little of the wearer. It does not announce itself, and it does not date. It waits, patiently, to be worn with whatever else you own.',
    ],
  },
  {
    slug: 'objects-that-endure',
    title: 'Objects That Endure',
    category: 'Craft',
    date: 'September 2026',
    readTime: '6 min read',
    image: 'sweaterHook',
    excerpt: 'What a garment owes the person who keeps it for twenty years.',
    pullQuote: 'A well-made thing is a promise kept quietly, every day, for a very long time.',
    body: [
      'The oldest garment in most wardrobes is also the most worn. It is rarely the most expensive; it is the one that fits, that has softened, that has been repaired at least once and is the better for it.',
      'We design toward that garment. It means choosing yarns that pill less and wear in rather than out, linings that can be replaced, buttons that are sewn on with a shank so they can be re-stitched, and seam allowances generous enough to be let out.',
      'It also means being honest about care. A cashmere sweater should be washed by hand and dried flat; a wool coat should be brushed, aired and rested. These are small rituals, and they are part of what you are buying.',
      'Longevity is not a marketing claim. It is a long list of unglamorous decisions, made well before anyone sees the finished piece.',
    ],
  },
  {
    slug: 'a-study-in-texture',
    title: 'A Study in Texture',
    category: 'Materials',
    date: 'August 2026',
    readTime: '4 min read',
    image: 'greyKnitTrail',
    excerpt: 'Linen, wool and cashmere, considered by hand rather than by eye.',
    pullQuote: 'You will remember how it felt long before you remember what colour it was.',
    body: [
      'We begin each collection with cloth rather than sketches. Swatches are pinned to the wall for weeks, handled, folded, creased and washed, until the right few remain.',
      'Linen is chosen for its dry, cool hand and its honesty — it shows its folds and does not apologise for them. Wool is chosen for how it drapes when cut on the bias. Cashmere is chosen for its density, because a loosely spun cashmere will not last a winter.',
      'Colour follows texture. Our palette of bone, stone, oat, charcoal and ink is deliberately narrow, so that surface does the talking: the nap of a brushed coat, the slub of a linen shirt, the rib of a merino collar.',
    ],
  },
]

export const getArticle = (slug: string) => ARTICLES.find((a) => a.slug === slug)
