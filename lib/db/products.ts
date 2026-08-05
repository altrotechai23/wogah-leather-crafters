import { prisma } from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany({
    where: {
      published: true,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
      colors: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products.map((product) => ({
    id: product.id,

    slug: product.slug,

    sku: product.sku,

    name: product.name,

    category: product.category as
      | "Bags"
      | "Wallets"
      | "Belts"
      | "Accessories",

    price: Number(product.price),

    tagline: product.tagline,

    description: product.description,

    details: product.details,

    bestseller: product.bestseller,

    isNew: product.isNew,

    stock: product.stock,

    published: product.published,

    images: product.images.map((image) => image.url),

    colors: product.colors.map((color) => ({
      id: color.id,
      name: color.name,
      hex: color.hex,
      stock: color.stock,
    })),
  }));
}

export async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      images: {
        orderBy: {
          order: "asc",
        },
      },
      colors: true,
    },
  });

  if (!product) return null;

  return {
    id: product.id,

    slug: product.slug,

    sku: product.sku,

    name: product.name,

    category: product.category as
      | "Bags"
      | "Wallets"
      | "Belts"
      | "Accessories",

    price: Number(product.price),

    tagline: product.tagline,

    description: product.description,

    details: product.details,

    bestseller: product.bestseller,

    isNew: product.isNew,

    stock: product.stock,

    published: product.published,

    images: product.images.map((image) => image.url),

    colors: product.colors.map((color) => ({
      id: color.id,
      name: color.name,
      hex: color.hex,
      stock: color.stock,
    })),
  };
}