export type Category =
  | "Bags"
  | "Wallets"
  | "Belts"
  | "Accessories";

export type Product = {
  id: string;

  slug: string;

  sku: string | null;

  name: string;

  category: Category;

  price: number;

  tagline: string;

  description: string;

  details: string[];

  images: string[];

  colors: {
    id: string;
    name: string;
    hex?: string | null;
    stock: number;
  }[];

  bestseller: boolean;

  isNew: boolean;

  stock: number;

  published: boolean;
};