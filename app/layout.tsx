import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Toaster } from "sonner";

import { CartProvider } from "@/components/cart/cart-provider";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Wogah — Leather Crafters | Handmade Full-Grain Leather Goods",
  description:
    "Wogah Leather Crafters handcrafts timeless full-grain leather bags, wallets, belts and accessories. Heritage craftsmanship, built to last a lifetime.",
  generator: "v0.app",
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#f2ede2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`light ${cormorant.variable} ${jost.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        <CartProvider>
          {children}
        </CartProvider>

        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}