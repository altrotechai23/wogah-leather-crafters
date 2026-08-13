"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const story = [
  {
    number: "01",
    text: "As the founder of Wogah Leather Crafters, Polo Joel Wogah is a talented Cameroonian living in Cape Town, South Africa.",
  },
  {
    number: "02",
    text: "Polo's journey into leather crafting began alongside his elder brother, selling their products to satisfied customers in and around the city.",
  },
  {
    number: "03",
    text: "In 2018, Polo's brother passed away, leaving him to shoulder the responsibility of managing the growing demand from their loyal clients.",
  },
  {
    number: "04",
    text: "Determined to honor his brother's legacy, Polo made the courageous decision to leave his other work behind and fully immerse himself in the art of crafting leather.",
  },
  {
    number: "05",
    text: "Seeking to enhance his skills, Polo pursued a course with a renowned leather crafting institution in South Africa. The experience transformed his craftsmanship.",
  },
  {
    number: "06",
    text: "Today, Polo continues to create exquisite leather products while sharing his talents with underprivileged individuals in our communities.",
  },
];

export function Story() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-background"
    >
      {/* Subtle editorial grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "90px 90px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 md:px-8">

        {/* =====================================================
            HERO STORY + OWNER
        ===================================================== */}

        <div className="grid lg:min-h-[780px] lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT — STORY */}

          <div className="order-2 flex flex-col justify-center py-20 lg:order-1 lg:py-24 lg:pr-16">

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="h-px w-10 bg-accent" />

              <span className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Our Story
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-8 max-w-xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
            >
              Built from
              <br />

              <span className="text-muted-foreground/50">
                passion.
              </span>

              <br />

              Carried by{" "}

              <span className="text-accent">
                legacy.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              Wogah Leather Crafters is the story of family, resilience and
              craftsmanship — a journey shaped by loss, transformed through
              purpose, and carried forward through every piece we create.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border">
                <ArrowDown className="h-4 w-4 text-accent" />
              </div>

              <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                The journey
              </span>
            </motion.div>
          </div>

          {/* RIGHT — OWNER IMAGE */}

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 relative lg:order-2"
          >
            <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden lg:h-[780px]">

              <Image
                src="/owner.png"
                alt="Polo Joel Wogah, founder of Wogah Leather Crafters"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-contain transition-transform duration-[1400ms] hover:scale-[1.02]"
              />

              {/* Cinematic overlay */}

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5" />

              {/* Inner frame */}

              <div className="absolute inset-4 border border-white/25 md:inset-6" />

              {/* Owner information */}

              <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white md:bottom-10 md:left-10 md:right-10">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">
                    Founder
                  </p>

                  <p className="mt-1 font-serif text-xl md:text-2xl">
                    Polo Joel Wogah
                  </p>
                </div>

                <span className="hidden text-[9px] uppercase tracking-[0.25em] text-white/60 sm:block">
                  Cape Town
                </span>
              </div>

              {/* Year */}

              <div className="absolute right-6 top-6 hidden md:block">
                <span className="font-mono text-[9px] tracking-[0.3em] text-white/60 [writing-mode:vertical-rl]">
                  2018 · LEGACY
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            JOURNEY INTRO
        ===================================================== */}

        <div className="border-t border-border">

          <div className="grid lg:grid-cols-[0.35fr_1fr]">

            <div className="border-b border-border py-10 lg:border-b-0 lg:border-r lg:py-14 lg:pr-10">

              <span className="text-[10px] uppercase tracking-[0.35em] text-accent">
                The Journey
              </span>

              <p className="mt-3 font-serif text-2xl">
                From brotherhood
                <br />
                to legacy.
              </p>

            </div>

            <div className="py-10 lg:py-14 lg:pl-14">

              <p className="max-w-3xl font-serif text-3xl leading-[1.2] tracking-tight text-foreground/80 md:text-4xl">
                What began as two brothers selling handcrafted products
                became a responsibility, a calling, and ultimately a
                lifelong commitment to the art of leather.
              </p>

            </div>
          </div>
        </div>

        {/* =====================================================
            STORY TIMELINE
        ===================================================== */}

        <div className="border-t border-border">

          {story.map((item, index) => (

            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.6,
                delay: index * 0.04,
              }}
              className="group grid gap-6 border-b border-border py-9 md:grid-cols-[80px_1fr_auto] md:items-start md:gap-8 md:py-12"
            >

              <span className="font-mono text-[10px] tracking-[0.25em] text-accent">
                {item.number}
              </span>

              <p className="max-w-4xl font-serif text-2xl leading-[1.35] text-foreground/75 transition-colors duration-500 group-hover:text-foreground md:text-3xl">
                {item.text}
              </p>

              <div className="hidden h-9 w-9 items-center justify-center rounded-full border border-border transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground md:flex">
                <ArrowUpRight className="h-4 w-4" />
              </div>

            </motion.article>
          ))}
        </div>

        {/* =====================================================
            CLOSING
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 md:py-32"
        >

          <div className="mx-auto max-w-4xl text-center">

            <span className="text-[10px] uppercase tracking-[0.35em] text-accent">
              Our Philosophy
            </span>

            <h3 className="mt-7 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Craft with purpose.
              <br />

              <span className="text-muted-foreground/50">
                Create with dignity.
              </span>
            </h3>

            <div className="mx-auto mt-8 h-px w-12 bg-accent" />

            <p className="mx-auto mt-7 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Creativity · Respect · Dignity
            </p>

          </div>
        </motion.div>

      </div>
    </section>
  );
}