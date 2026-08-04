import Image from 'next/image'
import Link from 'next/link'

export function Story() {
  return (
    <section id="story" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-20 md:px-8 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary lg:aspect-square">
          <Image
            src="/workshop.png"
            alt="An artisan hand-stitching leather at the Wogah workshop"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">
            The Workshop
          </span>
          <h2 className="mt-4 text-balance font-serif text-4xl leading-tight text-foreground md:text-5xl">
            A craft passed down through generations
          </h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            Wogah began at a single workbench, with a handful of tools and a
            belief that things worth owning are worth making well. We still work
            that way today — no shortcuts, no assembly lines, just skilled hands
            and honest materials.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Each piece is saddle-stitched by hand, a technique that takes longer
            but creates a seam that will not unravel. It is slower. It is the way
            it should be done.
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
            <div>
              <dt className="font-serif text-3xl text-foreground">100%</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Full-grain leather
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl text-foreground">Hand</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Cut & stitched
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl text-foreground">Life</dt>
              <dd className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                Time repairs
              </dd>
            </div>
          </dl>

          <Link
            href="/shop"
            className="mt-10 inline-block bg-primary px-9 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-accent"
          >
            Explore Our Goods
          </Link>
        </div>
      </div>
    </section>
  )
}
