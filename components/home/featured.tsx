import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/lib/db/products";

export async function Featured() {
  const products = await getProducts();

  const featured =
    products.filter((product) => product.bestseller).length > 0
      ? products.filter((product) => product.bestseller).slice(0, 4)
      : products.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-accent">
              Favourites
            </span>

            <h2 className="mt-4 text-balance font-serif text-4xl text-foreground md:text-5xl">
              Our most loved pieces
            </h2>
          </div>

          <Link
            href="/shop"
            className="hidden shrink-0 border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em] text-foreground transition-colors hover:border-accent hover:text-accent md:block"
          >
            View All
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link
            href="/shop"
            className="border-b border-foreground pb-1 text-xs uppercase tracking-[0.2em] text-foreground"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}