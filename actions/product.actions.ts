"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const category = formData.get("category") as string;
  const price = Number(formData.get("price"));
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const stock = Number(formData.get("stock"));

  const bestseller = formData.get("bestseller") === "on";
  const isNew = formData.get("isNew") === "on";
  const published = formData.get("published") === "on";

  const sku = (formData.get("sku") as string) || null;

  // comma separated
  const details = (formData.get("details") as string)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  // comma separated
  const colors = (formData.get("colors") as string)
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

  // max 4 images
  const images = [
    formData.get("image1"),
    formData.get("image2"),
    formData.get("image3"),
    formData.get("image4"),
  ]
    .map((x) => (x as string)?.trim())
    .filter(Boolean);

  await prisma.product.create({
    data: {
      name,
      slug: slugify(name),
      sku,
      category,
      price,
      tagline,
      description,
      details,
      stock,
      bestseller,
      isNew,
      published,

      images: {
        create: images.map((url, index) => ({
          url,
          order: index,
        })),
      },

      colors: {
        create: colors.map((name) => ({
          name,
          hex: "#000000",
          stock,
        })),
      },
    },
  });

  revalidatePath("/admin/products");
  revalidatePath("/shop");
  revalidatePath("/");

  redirect("/admin/products");
}