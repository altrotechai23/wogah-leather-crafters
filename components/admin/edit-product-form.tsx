"use client";

import ProductForm from "./product-form";
import { Product, ProductColor, ProductImage } from "@prisma/client";

type EditableProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  stock: number;
  sku: string | null;
  bestseller: boolean;
  isNew: boolean;
  published: boolean;
  details: string[];
  images: ProductImage[];
  colors: ProductColor[];
};

export default function EditProductForm({
  product,
}: {
  product: EditableProduct;
}) {
  return (
    <ProductForm
  mode="edit"
  productId={product.id}
  product={{
    name: product.name,
    slug: product.slug,
    category: product.category,
    tagline: product.tagline,
    description: product.description,
    price: Number(product.price),
    stock: product.stock,
    sku: product.sku ?? "",
    bestseller: product.bestseller,
    isNew: product.isNew,
    published: product.published,
    details: product.details,
    colors: product.colors.map((color) => ({
      name: color.name,
      hex: color.hex ?? "#000000",
      stock: color.stock,
    })),
    images: [],
  }}
/>
  );
}