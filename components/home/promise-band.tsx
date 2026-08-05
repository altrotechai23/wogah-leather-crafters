import { Hammer, PackageCheck, RefreshCcw, Truck } from 'lucide-react'

const PROMISES = [
  {
    icon: Hammer,
    title: 'Handmade to Order',
    copy: 'Each piece is crafted by hand, never mass-produced.',
  },
  {
    icon: RefreshCcw,
    title: 'Lifetime Repairs',
    copy: 'We restore and repair every Wogah piece, for life.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    copy: 'Complimentary delivery on all orders over R2000.',
  },
  {
    icon: PackageCheck,
    title: '30-Day Returns',
    copy: 'Not the right fit? Return it within 30 days.',
  },
]

export function PromiseBand() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-14 md:grid-cols-4 md:px-8">
        {PROMISES.map((item) => (
          <div key={item.title} className="flex flex-col items-center text-center">
            <item.icon className="size-6 text-accent" strokeWidth={1.5} />
            <h3 className="mt-4 text-sm uppercase tracking-[0.15em] text-foreground">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {item.copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
