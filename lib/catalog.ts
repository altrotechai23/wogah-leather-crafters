export type Category = 'Bags' | 'Wallets' | 'Belts' | 'Accessories'

export type Product = {
  slug: string
  name: string
  category: Category
  price: number
  image: string
  color: string
  tagline: string
  description: string
  details: string[]
  bestseller?: boolean
  isNew?: boolean
}

export const products: Product[] = [
  {
    slug: 'heritage-weekender',
    name: 'Heritage Weekender',
    category: 'Bags',
    price: 480,
    image: '/product-weekender.png',
    color: 'Saddle Tan',
    tagline: 'The one bag for every journey',
    description:
      'Our signature weekender is cut from a single hide of vegetable-tanned full-grain leather and hand-stitched to endure decades of travel. Solid brass hardware and a canvas-lined interior make it as practical as it is handsome.',
    details: [
      'Vegetable-tanned full-grain leather',
      'Solid brass zippers and feet',
      'Cotton canvas lining with interior pocket',
      'Dimensions: 20" × 11" × 10"',
    ],
    bestseller: true,
  },
  {
    slug: 'bifold-wallet',
    name: 'The Bifold Wallet',
    category: 'Wallets',
    price: 95,
    image: '/product-wallet.png',
    color: 'Cognac',
    tagline: 'Everyday essential, refined',
    description:
      'A slim bifold that ages beautifully. Six card slots and a full-length note compartment, saddle-stitched by hand with waxed linen thread that will outlast the leather itself.',
    details: [
      'Full-grain cognac leather',
      'Six card slots, two hidden pockets',
      'Hand saddle-stitched with waxed linen',
      'Dimensions: 4.3" × 3.5" closed',
    ],
    bestseller: true,
  },
  {
    slug: 'full-grain-belt',
    name: 'Full-Grain Belt',
    category: 'Belts',
    price: 120,
    image: '/product-belt.png',
    color: 'Dark Walnut',
    tagline: 'Cut to your exact size',
    description:
      'A single strip of thick full-grain leather with a solid cast-brass buckle. No layers, no fillers — just one honest piece of leather that develops a rich patina with wear.',
    details: [
      '3.5mm thick full-grain leather',
      'Solid cast-brass buckle',
      'Hand-burnished and waxed edges',
      'Made to order in your waist size',
    ],
  },
  {
    slug: 'structured-tote',
    name: 'Structured Tote',
    category: 'Bags',
    price: 340,
    image: '/product-tote.png',
    color: 'Natural Tan',
    tagline: 'Carry the day with ease',
    description:
      'A clean-lined tote that holds its shape and your essentials. Tall rolled handles sit comfortably on the shoulder, and the open top makes for effortless everyday use.',
    details: [
      'Vegetable-tanned full-grain leather',
      'Rolled and stitched handles',
      'Interior zip and slip pockets',
      'Dimensions: 15" × 13" × 5"',
    ],
    isNew: true,
  },
  {
    slug: 'slim-card-holder',
    name: 'Slim Card Holder',
    category: 'Wallets',
    price: 55,
    image: '/product-cardholder.png',
    color: 'Onyx Black',
    tagline: 'Minimal by design',
    description:
      'For those who carry less. Three snug card slots and a central pocket in a profile thin enough to disappear in a front pocket.',
    details: [
      'Full-grain onyx leather',
      'Three card slots + centre pocket',
      'Hand-finished edges',
      'Dimensions: 4" × 2.8"',
    ],
    isNew: true,
  },
  {
    slug: 'messenger-briefcase',
    name: 'Messenger Briefcase',
    category: 'Bags',
    price: 520,
    image: '/product-messenger.png',
    color: 'Chestnut',
    tagline: 'Made for the working day',
    description:
      'A structured briefcase with buckle-strap closures and a padded laptop sleeve. Refined enough for the boardroom, rugged enough for the daily commute.',
    details: [
      'Full-grain chestnut leather',
      'Padded 15" laptop compartment',
      'Adjustable shoulder strap',
      'Solid brass buckles',
    ],
    bestseller: true,
  },
  {
    slug: 'leather-journal-cover',
    name: 'Leather Journal Cover',
    category: 'Accessories',
    price: 78,
    image: '/product-journal.png',
    color: 'Cognac',
    tagline: 'For the daily record',
    description:
      'A refillable journal cover with a leather tie closure. Fits standard A5 notebooks and softens beautifully with every day it spends in your hands.',
    details: [
      'Full-grain cognac leather',
      'Fits A5 refill notebooks',
      'Leather wrap-tie closure',
      'Interior pen loop and card slot',
    ],
  },
  {
    slug: 'leather-watch-strap',
    name: 'Leather Watch Strap',
    category: 'Accessories',
    price: 65,
    image: '/product-watchstrap.png',
    color: 'Saddle Tan',
    tagline: 'A finishing touch',
    description:
      'Hand-cut and stitched watch strap with quick-release spring bars. Available to fit most standard lug widths and finished with a solid brass keeper.',
    details: [
      'Vegetable-tanned full-grain leather',
      'Quick-release spring bars',
      'Solid brass hardware',
      'Fits 18–22mm lug widths',
    ],
  },
]

export const categories: { label: string; value: Category | 'All' }[] = [
  { label: 'All Goods', value: 'All' },
  { label: 'Bags', value: 'Bags' },
  { label: 'Wallets', value: 'Wallets' },
  { label: 'Belts', value: 'Belts' },
  { label: 'Accessories', value: 'Accessories' },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(price: number) {
  return `R${price.toLocaleString('en-US')}`
}
