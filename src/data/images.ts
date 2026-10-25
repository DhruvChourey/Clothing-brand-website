/**
 * Photography is hot-linked from the Unsplash CDN (free to use under the Unsplash licence).
 * Each key is an Unsplash photo id; `src` builds a width-constrained URL and `srcSet` a ladder.
 * To self-host, download the originals and replace `src`/`srcSet` with local paths.
 */
export type ImageKey = keyof typeof PHOTOS

const PHOTOS = {
  hero: {
    id: '1613915617430-8ab0fd7c6baf',
    alt: 'Model in a charcoal wool overshirt and black trousers, photographed in monochrome',
  },
  walking: {
    id: '1659522761084-79196b64abe4',
    alt: 'Model in a pale tailored jacket and wide trousers walking against a grey studio backdrop',
  },
  trenchWalk: {
    id: '1676716105765-e19fe6a01851',
    alt: 'Woman in a long camel trench coat walking along a city street',
  },
  trenchHat: {
    id: '1617391258031-f8d80b22fb35',
    alt: 'Woman in a camel trench coat and felt hat against a pale, open sky',
  },
  knitDetail: {
    id: '1588271968087-4c51abe05afc',
    alt: 'Close detail of an open-knit ivory sweater at the collar',
  },
  knitHands: {
    id: '1581497396202-5645e76a3a8e',
    alt: 'Hands wrapped in the sleeves of a brown chunky knit sweater',
  },
  campaign: {
    id: '1771514021578-d4fd16565a62',
    alt: 'Monochrome campaign image of a figure in a long black coat on a dark staircase',
  },
  stackedKnits: {
    id: '1670905934075-0c3cb559e977',
    alt: 'Folded stack of cashmere knits in grey, taupe and brown',
  },
  linenTexture: { id: '1634665810235-011d663754e7', alt: 'Soft folds of undyed natural linen' },
  linenFlat: { id: '1528458909336-e7a0adfed0a5', alt: 'Flat weave of oatmeal linen cloth' },
  sweaterHook: {
    id: '1631541909061-71e349d1f203',
    alt: 'Oatmeal knit sweater hanging on a hook against a wall',
  },
  greyKnitTrail: {
    id: '1601379327928-bedfaf9da2d0',
    alt: 'Folded stack of ribbed wool knitwear in neutral tones',
  },
  coatCamelFabric: { id: '1603906650843-b58e94d9df4d', alt: 'Close detail of camel wool fabric' },

  trench: {
    id: '1633821879282-0c4e91f96232',
    alt: 'Sand-coloured belted trench coat, worn closed',
  },
  trenchAlt: {
    id: '1651491646869-3f18f4d30be0',
    alt: 'Model holding a small black bag in a beige trench coat',
  },
  overcoat: {
    id: '1619603364937-8d7af41ef206',
    alt: 'Camel overcoat worn over a matching roll-neck against a pale wall',
  },
  overshirt: {
    id: '1740711152088-88a009e877bb',
    alt: 'Indigo linen overshirt hanging on a white wall',
  },
  overshirtAlt: {
    id: '1627686011747-74adda3d2343',
    alt: 'Man in an ivory collarless shirt looking away from camera',
  },
  whiteShirt: {
    id: '1776633733518-d81137214dc9',
    alt: 'Woman in an oversized white linen shirt against a grey wall',
  },
  whiteShirtAlt: {
    id: '1665201462900-809f7773ff5f',
    alt: 'Detail of pale linen fabric and hand embroidery',
  },
  crewGreen: {
    id: '1759229874786-6d0cc75d95be',
    alt: 'Model in a sage-grey knit crewneck and matching trousers',
  },
  crewGreenAlt: {
    id: '1636146049394-0924c2b66104',
    alt: 'Close detail of a grey ribbed knit collar',
  },
  cashmere: { id: '1759229874914-c1ffdb3ebd0c', alt: 'Model in an oat-coloured cashmere crewneck' },
  oatKnit: {
    id: '1604573824419-289a9a10672c',
    alt: 'Light oat wool sweater worn against dry autumn grass',
  },
  wideTrouser: {
    id: '1657815929003-b97cc426cb3d',
    alt: 'Ivory wide-leg trousers in motion against a grey backdrop',
  },
  blackSuit: {
    id: '1697095098675-1d02496ef86a',
    alt: 'Model in black tailoring leaning on a rail',
  },
  blackSuitAlt: {
    id: '1697095378556-95a9bc1e8d2a',
    alt: 'Model in a black coat and trousers with a relaxed stance',
  },
  linenTank: {
    id: '1578747522731-9e5a179b02f7',
    alt: 'Natural linen sleeveless top on a wooden hanger',
  },
  shirtJacket: {
    id: '1507680434567-5739c80be1ac',
    alt: 'Detail of a black shirt jacket with a steel watch',
  },
  henley: {
    id: '1713881587420-113c1c43e28a',
    alt: 'Ivory linen henley hanging on a branch against a stone-coloured wall',
  },
  henleyAlt: {
    id: '1713881842156-3d9ef36418cc',
    alt: 'Pale blue striped linen henley hanging on a branch',
  },
} as const

export const WIDTHS = [480, 800, 1200, 1800, 2400]

export const photoUrl = (key: ImageKey, w: number, q = 72) =>
  `https://images.unsplash.com/photo-${PHOTOS[key].id}?auto=format&fit=crop&w=${w}&q=${q}`

export const photoSrcSet = (key: ImageKey, max = 2400) =>
  WIDTHS.filter((w) => w <= max)
    .map((w) => `${photoUrl(key, w)} ${w}w`)
    .join(', ')

export const photoAlt = (key: ImageKey) => PHOTOS[key].alt
