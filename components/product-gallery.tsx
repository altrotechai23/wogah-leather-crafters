"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const galleryImages =
    images.length > 0 ? images : ["/placeholder.svg"];

  const [activeIndex, setActiveIndex] = useState(0);

  const currentImage = galleryImages[activeIndex];

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? galleryImages.length - 1 : current - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === galleryImages.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="w-full">
      {/* =====================================================
          MAIN IMAGE
      ===================================================== */}

      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentImage}-${activeIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage}
              alt={`${productName} - image ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Image counter */}

        {galleryImages.length > 1 && (
          <div className="absolute left-4 top-4 z-10 rounded-full bg-background/85 px-3 py-1.5 backdrop-blur-sm">
            <span className="font-mono text-[9px] tracking-[0.2em] text-foreground">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(galleryImages.length).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Navigation */}

        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <ChevronLeft className="size-4" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/60"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* =====================================================
          THUMBNAILS
      ===================================================== */}

      {galleryImages.length > 1 && (
        <div className="mt-4">
          <div
            className="
              flex
              gap-3
              overflow-x-auto
              pb-2
              scrollbar-none
              snap-x
              snap-mandatory
            "
          >
            {galleryImages.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View product image ${index + 1}`}
                  aria-current={isActive}
                  className={`
                    relative
                    aspect-[4/5]
                    w-20
                    shrink-0
                    snap-start
                    overflow-hidden
                    rounded-sm
                    bg-secondary
                    transition-all
                    duration-300
                    md:w-24
                    ${
                      isActive
                        ? "ring-1 ring-accent ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100"
                    }
                  `}
                >
                  <Image
                    src={image}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />

                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================
          MOBILE DOTS
      ===================================================== */}

      {galleryImages.length > 1 && (
        <div className="mt-4 flex justify-center gap-1.5 md:hidden">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`
                h-1 transition-all duration-300
                ${
                  index === activeIndex
                    ? "w-6 bg-accent"
                    : "w-1.5 bg-border"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}