"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { formatPrice } from "@/lib/catalog";
import { Product } from "@/lib/types/product";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const image = product.images[0] || "/placeholder.svg";

  return (
    <article className="group relative flex min-w-0 flex-col">
      {/* =====================================================
          PRODUCT IMAGE
      ===================================================== */}

      <Link
        href={`/products/${product.slug}`}
        className="
          relative
          block
          aspect-[4/5]
          overflow-hidden
          rounded-sm
          bg-secondary
        "
      >
        {/* Image */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            p-3
            sm:p-4
            md:p-5
            lg:p-6
          "
        >
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="
              (max-width: 640px) 50vw,
              (max-width: 1024px) 33vw,
              25vw
            "
            className="
              object-contain
              object-center
              p-3
              sm:p-4
              md:p-5
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.02]
            "
          />
        </div>

        {/* =================================================
            PRODUCT LABEL
        ================================================= */}

        {(product.isNew || product.bestseller) && (
          <span
            className="
              absolute
              left-3
              top-3
              z-10
              bg-background/90
              px-3
              py-1
              text-[9px]
              uppercase
              tracking-[0.16em]
              text-foreground
              backdrop-blur-sm
              md:left-4
              md:top-4
            "
          >
            {product.isNew ? "New" : "Bestseller"}
          </span>
        )}

        {/* =================================================
            IMAGE EDGE / HOVER DETAIL
        ================================================= */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            border
            border-foreground/[0.04]
            transition-colors
            duration-500
            group-hover:border-accent/20
          "
        />

        {/* =================================================
            ADD TO CART
        ================================================= */}

        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            addItem(product);
          }}
          className="
            absolute
            inset-x-3
            bottom-3
            z-20
            translate-y-3
            bg-primary
            py-3
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-primary-foreground
            opacity-0
            transition-all
            duration-300
            hover:bg-accent
            group-hover:translate-y-0
            group-hover:opacity-100
            focus:translate-y-0
            focus:opacity-100
            md:inset-x-4
            md:bottom-4
          "
        >
          Add to Cart
        </button>
      </Link>

      {/* =====================================================
          PRODUCT INFORMATION
      ===================================================== */}

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="
              font-serif
              text-lg
              leading-tight
              text-foreground
            "
          >
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors hover:text-accent"
            >
              {product.name}
            </Link>
          </h3>

          {product.colors.length > 0 && (
            <p
              className="
                mt-1
                text-[10px]
                uppercase
                tracking-[0.12em]
                text-muted-foreground
              "
            >
              {product.colors[0]?.name}

              {product.colors.length > 1 &&
                ` +${product.colors.length - 1} more`}
            </p>
          )}
        </div>

        <span
          className="
            shrink-0
            font-serif
            text-lg
            text-foreground
          "
        >
          {formatPrice(product.price)}
        </span>
      </div>
    </article>
  );
}