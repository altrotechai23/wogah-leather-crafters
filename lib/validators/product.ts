import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),

  sku: z.string().optional(),

  slug: z.string().min(3),

  category: z.enum([
    "Bags",
    "Wallets",
    "Belts",
    "Accessories",
  ]),

  price: z.coerce.number().positive(),

  tagline: z.string().min(3),

  description: z.string().min(20),

  stock: z.coerce.number().min(0),

  bestseller: z.boolean(),

  isNew: z.boolean(),

  published: z.boolean(),

  details: z.array(z.string().min(2)),

  colors: z.array(
    z.object({
      name: z.string().min(2),
      hex: z.string(),
      stock: z.coerce.number().min(0),
    })
  ),

  images: z
    .array(z.string().url())
    .min(1)
    .max(4),
});

export type ProductInput = z.infer<typeof productSchema>;