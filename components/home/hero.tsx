import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <Image
        src="/hero-leather.png"
        alt="A handcrafted tan leather weekender bag resting on an artisan workbench"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="max-w-xl text-background">
          <p className="text-xs uppercase tracking-[0.35em] text-background/80">
             QUALITY LEATHER PRODUCTS.
          </p>
          <h1 className="mt-6 text-balance font-serif text-5xl leading-[1.05] md:text-7xl">
           WOGAH LEATHER CRAFTERS
          </h1>
          <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-background/85">
            AT AFFORDABLE PRICE! AT YOUR DOOR STEP.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/shop"
              className="bg-background px-9 py-4 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Shop the Collection
            </Link>
            <Link
              href="/#story"
              className="border-b border-background/60 pb-1 text-xs uppercase tracking-[0.2em] text-background transition-colors hover:border-accent hover:text-accent"
            >
              Our Craft
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
