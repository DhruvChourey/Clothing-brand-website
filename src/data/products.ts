import type { ImageKey } from './images'

export type Category = 'Outerwear' | 'Shirts' | 'Knitwear' | 'Trousers' | 'Essentials'
export const CATEGORIES: Category[] = ['Outerwear', 'Shirts', 'Knitwear', 'Trousers', 'Essentials']

export type Collection = {
  slug: string
  name: string
  season: string
  blurb: string
  image: ImageKey
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'silent-form',
    name: 'Silent Form',
    season: 'Autumn / Winter 2026',
    blurb: 'Structured outerwear and dense knits cut with a quiet, architectural line.',
    image: 'trenchWalk',
  },
  {
    slug: 'linen-study',
    name: 'Linen Study',
    season: 'Continuing',
    blurb: 'Washed linen shirting and separates, made to soften with every wear.',
    image: 'linenFlat',
  },
  {
    slug: 'the-essentials',
    name: 'The Essentials',
    season: 'Permanent',
    blurb: 'Foundations of the wardrobe, re-cut each season and never retired.',
    image: 'greyKnitTrail',
  },
]

export type Swatch = { name: string; hex: string }

export type Product = {
  slug: string
  name: string
  category: Category
  collection: string
  price: number
  isNew: boolean
  featuredRank: number
  colors: Swatch[]
  sizes: string[]
  images: ImageKey[]
  summary: string
  description: string
  details: string[]
  composition: string
  care: string
}

const CLOTHING = ['XS', 'S', 'M', 'L', 'XL']

export const PRODUCTS: Product[] = [
  {
    slug: 'maren-trench-coat',
    name: 'Maren Trench Coat',
    category: 'Outerwear',
    collection: 'silent-form',
    price: 1290,
    isNew: true,
    featuredRank: 1,
    colors: [
      { name: 'Sand', hex: '#c9b79c' },
      { name: 'Charcoal', hex: '#2b2a28' },
    ],
    sizes: CLOTHING,
    images: ['trench', 'trenchAlt'],
    summary: 'Double-faced cotton gabardine, belted at the waist.',
    description:
      'A trench reduced to its essentials. Cut from a dense, water-resistant cotton gabardine with a softly dropped shoulder, a deep back vent and a belt that can be tied, knotted or left to fall.',
    details: [
      'Water-resistant cotton gabardine',
      'Horn-effect corozo buttons',
      'Fully lined in cupro',
      'Storm flap and back vent',
      'Designed in Paris, made in Portugal',
    ],
    composition: '100% cotton shell · 100% cupro lining',
    care: 'Dry clean only. Store on a wide hanger.',
  },
  {
    slug: 'aldous-overcoat',
    name: 'Aldous Overcoat',
    category: 'Outerwear',
    collection: 'silent-form',
    price: 1680,
    isNew: true,
    featuredRank: 2,
    colors: [
      { name: 'Camel', hex: '#b58f68' },
      { name: 'Ink', hex: '#1f2124' },
    ],
    sizes: CLOTHING,
    images: ['overcoat', 'coatCamelFabric'],
    summary: 'A long, single-breasted coat in brushed Italian wool.',
    description:
      'The season’s defining silhouette: a long, uncluttered overcoat in a brushed double-face wool that drapes rather than holds. Concealed placket, set-in sleeve and a hem that moves when you walk.',
    details: [
      'Brushed double-face wool',
      'Concealed button placket',
      'Two welt pockets',
      'Half-canvas construction',
      'Milled and woven in Biella, Italy',
    ],
    composition: '90% virgin wool · 10% cashmere',
    care: 'Dry clean only. Brush gently with the grain.',
  },
  {
    slug: 'otto-linen-overshirt',
    name: 'Otto Linen Overshirt',
    category: 'Shirts',
    collection: 'linen-study',
    price: 340,
    isNew: false,
    featuredRank: 4,
    colors: [
      { name: 'Indigo', hex: '#2f3e5c' },
      { name: 'Ecru', hex: '#e6dfd0' },
    ],
    sizes: CLOTHING,
    images: ['overshirt', 'overshirtAlt'],
    summary: 'Heavyweight garment-washed linen with a relaxed collar.',
    description:
      'A shirt that works as a layer. Woven from heavyweight European flax and garment-washed for a lived-in hand, with a soft collar, a single chest pocket and a generous, squared cut.',
    details: [
      'European flax, garment-washed',
      'Mother-of-pearl buttons',
      'Single chest pocket',
      'Relaxed, squared fit',
    ],
    composition: '100% European linen',
    care: 'Machine wash cold, gentle. Line dry. Do not tumble dry.',
  },
  {
    slug: 'camille-linen-shirt',
    name: 'Camille Linen Shirt',
    category: 'Shirts',
    collection: 'linen-study',
    price: 295,
    isNew: false,
    featuredRank: 6,
    colors: [
      { name: 'White', hex: '#f3f1ec' },
      { name: 'Oat', hex: '#d3c7b0' },
    ],
    sizes: CLOTHING,
    images: ['whiteShirt', 'whiteShirtAlt'],
    summary: 'An oversized, collarless shirt in washed white linen.',
    description:
      'Generous in the body, narrow at the neck. A collarless shirt that can be worn buttoned high, open over a vest or belted as a dress, finished with hand-picked stitching at the placket.',
    details: [
      'Collarless band neckline',
      'Drop shoulder, extended hem',
      'Hand-picked placket stitching',
      'Washed for softness',
    ],
    composition: '100% linen',
    care: 'Machine wash cold. Line dry. Iron damp if desired.',
  },
  {
    slug: 'soren-merino-crewneck',
    name: 'Søren Merino Crewneck',
    category: 'Knitwear',
    collection: 'silent-form',
    price: 420,
    isNew: true,
    featuredRank: 3,
    colors: [
      { name: 'Lichen', hex: '#8a948a' },
      { name: 'Bone', hex: '#e2dacb' },
      { name: 'Soot', hex: '#33322f' },
    ],
    sizes: CLOTHING,
    images: ['crewGreen', 'crewGreenAlt'],
    summary: 'A dense 12-gauge crewneck in extra-fine merino.',
    description:
      'Knitted flat on a 12-gauge machine for a smooth, close surface that holds its shape. A clean ribbed collar, a raglan sleeve and a body that skims rather than clings.',
    details: [
      'Extra-fine merino, 12-gauge',
      'Fully fashioned raglan sleeve',
      'Ribbed collar, cuffs and hem',
      'Mulesing-free wool',
    ],
    composition: '100% extra-fine merino wool',
    care: 'Hand wash cool or dry clean. Dry flat.',
  },
  {
    slug: 'vale-cashmere-sweater',
    name: 'Vale Cashmere Sweater',
    category: 'Knitwear',
    collection: 'the-essentials',
    price: 590,
    isNew: false,
    featuredRank: 5,
    colors: [
      { name: 'Oat', hex: '#d8ccb4' },
      { name: 'Mink', hex: '#7b6e62' },
    ],
    sizes: CLOTHING,
    images: ['cashmere', 'stackedKnits'],
    summary: 'Two-ply Mongolian cashmere with a soft, brushed finish.',
    description:
      'The sweater we make again each season, because there is nothing to improve. Two-ply cashmere in a relaxed, rounded shape — light enough to layer, warm enough to rely on.',
    details: [
      'Two-ply Mongolian cashmere',
      'Relaxed, rounded shape',
      'Brushed finish for softness',
      'Linked seams at the shoulder',
    ],
    composition: '100% cashmere',
    care: 'Hand wash cool with wool shampoo. Dry flat.',
  },
  {
    slug: 'lune-wool-sweater',
    name: 'Lune Wool Sweater',
    category: 'Knitwear',
    collection: 'silent-form',
    price: 380,
    isNew: false,
    featuredRank: 9,
    colors: [
      { name: 'Oatmeal', hex: '#d6cdbb' },
      { name: 'Stone', hex: '#a39a8b' },
    ],
    sizes: CLOTHING,
    images: ['oatKnit', 'sweaterHook'],
    summary: 'A softly textured lambswool crewneck with a loose drape.',
    description:
      'Spun from lambswool with a visible, tactile marl. A generous crew neck, a slightly cropped body and long sleeves that gather easily at the wrist.',
    details: [
      'Lambswool, marl yarn',
      'Loose drape, slightly cropped body',
      'Long sleeves with ribbed cuffs',
    ],
    composition: '85% lambswool · 15% nylon',
    care: 'Hand wash cool or dry clean. Dry flat.',
  },
  {
    slug: 'iva-wide-trouser',
    name: 'Iva Wide Trouser',
    category: 'Trousers',
    collection: 'silent-form',
    price: 410,
    isNew: true,
    featuredRank: 7,
    colors: [
      { name: 'Ivory', hex: '#ece6d8' },
      { name: 'Charcoal', hex: '#2b2a28' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    images: ['wideTrouser', 'walking'],
    summary: 'A high-rise, wide-leg trouser in fluid wool crêpe.',
    description:
      'Cut with a high, clean waist and a leg that falls in one uninterrupted line to the floor. A fluid wool crêpe that keeps its crease and resists creasing elsewhere.',
    details: [
      'Fluid wool crêpe',
      'High rise, wide leg',
      'Concealed hook and bar closure',
      'Pressed front crease',
    ],
    composition: '96% wool · 4% elastane',
    care: 'Dry clean only.',
  },
  {
    slug: 'klaus-tailored-trouser',
    name: 'Klaus Tailored Trouser',
    category: 'Trousers',
    collection: 'the-essentials',
    price: 395,
    isNew: false,
    featuredRank: 8,
    colors: [
      { name: 'Black', hex: '#161616' },
      { name: 'Graphite', hex: '#4a4b4c' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    images: ['blackSuit', 'blackSuitAlt'],
    summary: 'A straight, single-pleat trouser in a seasonless wool.',
    description:
      'A trouser for every day of the week. Straight through the leg with a single forward pleat, side adjusters in place of a belt and a hem cut to break lightly on the shoe.',
    details: [
      'Seasonless tropical wool',
      'Single forward pleat',
      'Side adjusters',
      'Unfinished hem for tailoring',
    ],
    composition: '100% virgin wool',
    care: 'Dry clean only.',
  },
  {
    slug: 'nell-linen-tank',
    name: 'Nell Linen Tank',
    category: 'Essentials',
    collection: 'linen-study',
    price: 120,
    isNew: false,
    featuredRank: 11,
    colors: [
      { name: 'Natural', hex: '#e0d6c0' },
      { name: 'Black', hex: '#1b1b1a' },
    ],
    sizes: CLOTHING,
    images: ['linenTank', 'linenFlat'],
    summary: 'A long, easy tank in undyed natural linen.',
    description:
      'A quiet foundation: a scooped neck, a deep armhole and a slightly longer back. Made in an unbleached linen that deepens in tone and softens with washing.',
    details: ['Unbleached linen', 'Scooped neckline', 'Longer back hem', 'Corozo button detail'],
    composition: '100% linen',
    care: 'Machine wash cold. Line dry.',
  },
  {
    slug: 'ansel-shirt-jacket',
    name: 'Ansel Shirt Jacket',
    category: 'Essentials',
    collection: 'the-essentials',
    price: 460,
    isNew: false,
    featuredRank: 10,
    colors: [
      { name: 'Black', hex: '#1b1b1a' },
      { name: 'Olive', hex: '#4a4a3a' },
    ],
    sizes: CLOTHING,
    images: ['shirtJacket', 'blackSuitAlt'],
    summary: 'A structured overshirt in dry-handle cotton twill.',
    description:
      'Part shirt, part jacket. A dry-handle cotton twill with a firm structure, two chest pockets and a sleeve that stacks neatly above the wrist.',
    details: [
      'Dry-handle cotton twill',
      'Two chest pockets',
      'Tonal corozo buttons',
      'Adjustable cuffs',
    ],
    composition: '100% organic cotton',
    care: 'Machine wash cold, gentle. Dry flat.',
  },
  {
    slug: 'sava-linen-henley',
    name: 'Sava Linen Henley',
    category: 'Essentials',
    collection: 'linen-study',
    price: 165,
    isNew: true,
    featuredRank: 12,
    colors: [
      { name: 'Ivory', hex: '#ece6d6' },
      { name: 'Mist', hex: '#a9b3c0' },
    ],
    sizes: CLOTHING,
    images: ['henley', 'henleyAlt'],
    summary: 'A short-sleeved henley in washed, finely woven linen.',
    description:
      'The warm-weather staple, cut to sit just below the hip. A three-button placket, a high round neck and a washed finish that never needs ironing.',
    details: ['Finely woven linen', 'Three-button placket', 'Washed finish', 'Relaxed, boxy fit'],
    composition: '100% linen',
    care: 'Machine wash cold. Line dry.',
  },
]

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug)
export const getCollection = (slug: string) => COLLECTIONS.find((c) => c.slug === slug)
