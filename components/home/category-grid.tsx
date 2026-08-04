import Image from 'next/image'
import Link from 'next/link'

const CATEGORIES = [
  {
    label: 'Bags',
    href: '/shop?category=Bags',
    image: '/product-weekender.png',
    caption: 'Weekenders, totes & briefcases',
  },
  {
    label: 'Wallets',
    href: '/shop?category=Wallets',
    image: '/product-wallet.png',
    caption: 'Bifolds & card holders',
  },
  {
    label: 'Belts',
    href: '/shop?category=Belts',
    image: '/product-belt.png',
    caption: 'Full-grain, made to size',
  },
  {
    label: 'Accessories',
    href: '/shop?category=Accessories',
    image: '/product-journal.png',
    caption: 'Journals, straps & more',
  },
]

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <div className="flex flex-col items-center text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-accent">
          The Collection
        </span>
        <h2 className="mt-4 text-balance font-serif text-4xl text-foreground md:text-5xl">
          Crafted for a lifetime of use
        </h2>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4">
        {CATEGORIES.map((cat) => (
          <Link key={cat.label} href={cat.href} className="group flex flex-col">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-secondary">
              <Image
                src={cat.image || '/placeholder.svg'}
                alt={cat.label}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" />
            </div>
            <h3 className="mt-4 font-serif text-2xl text-foreground transition-colors group-hover:text-accent">
              {cat.label}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{cat.caption}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
