import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),

  slug: z.string().min(3),

  category: z.string().min(1),

  tagline: z.string().min(3),

  description: z.string().min(10),

  price: z.coerce.number().positive(),

  stock: z.coerce.number().min(0),

  sku: z.string().optional(),

  bestseller: z.boolean(),

  isNew: z.boolean(),

  published: z.boolean(),

  details: z.array(z.string()),

  colors: z.array(
    z.object({
      name: z.string(),
      hex: z.string(),
      stock: z.coerce.number(),
    })
  ),

  images: z.array(z.instanceof(File)).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;