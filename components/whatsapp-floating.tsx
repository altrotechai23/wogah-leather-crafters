"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloating() {
  const phone = "27639324694";
  const message = encodeURIComponent(
    "Hi Wogah! I'm interested in your leather products."
  );

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Glow */}
      <div className="absolute inset-0 animate-pulse rounded-full bg-green-500/25 blur-2xl" />

      {/* Ripple */}
      <span className="absolute inset-0 animate-[ping_2.5s_ease-in-out_infinite] rounded-full border border-green-400/50" />

      {/* Button */}
      <Link
        href={`https://wa.me/${phone}?text=${message}`}
        target="_blank"
        aria-label="Chat with Wogah on WhatsApp"
        className="
          group
          relative
          flex
          h-16
          w-16
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border
          border-white/20
          bg-white/10
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(34,197,94,0.35)]
          transition-all
          duration-500
          hover:scale-110
          hover:rotate-6
          hover:shadow-[0_15px_60px_rgba(34,197,94,0.6)]
          active:scale-95
        "
      >
        {/* Animated gradient */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-green-400
            via-green-500
            to-emerald-600
            transition-transform
            duration-700
            group-hover:scale-125
          "
        />

        {/* Shine */}
        <div
          className="
            absolute
            -left-20
            top-0
            h-full
            w-10
            rotate-12
            bg-white/40
            blur-md
            transition-all
            duration-700
            group-hover:left-24
          "
        />

        <MessageCircle
          className="
            relative
            z-10
            h-8
            w-8
            text-white
            transition-transform
            duration-300
            group-hover:scale-110
          "
        />
      </Link>

      {/* Tooltip */}
      <div
        className="
          pointer-events-none
          absolute
          right-20
          top-1/2
          -translate-y-1/2
          rounded-full
          bg-black/85
          px-4
          py-2
          text-sm
          font-medium
          whitespace-nowrap
          text-white
          opacity-0
          backdrop-blur-xl
          transition-all
          duration-300
          group-hover:opacity-100
        "
      >
        Chat with us
      </div>
    </div>
  );
}