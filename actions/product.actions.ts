"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProductFormValues } from "@/lib/validators/product";

type CreateProductInput = Omit<ProductFormValues, "images"> & {
  images: string[];
};

export async function createProduct(data: CreateProductInput) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        category: data.category,
        tagline: data.tagline,
        description: data.description,

        price: data.price,

        stock: data.stock,

        sku: data.sku || null,

        bestseller: data.bestseller,
        isNew: data.isNew,
        published: data.published,

        details: data.details,

        images: {
          create: data.images.map((url, index) => ({
            url,
            order: index,
          })),
        },

        colors: {
          create: data.colors.map((color) => ({
            name: color.name,
            hex: color.hex,
            stock: color.stock,
          })),
        },
      },

      include: {
        images: true,
        colors: true,
      },
    });

    revalidatePath("/");
    revalidatePath("/shop");
    revalidatePath("/admin/products");
    revalidatePath("/admin/products/new");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to create product.",
    };
  }
}


export async function deleteProduct(id: string) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const { supabaseAdmin } = await import("@/lib/supabase-admin");

  for (const image of product.images) {
    try {
      const url = new URL(image.url);

      const marker = "/storage/v1/object/public/wogah-leather-crafters-storage/";

      const index = url.pathname.indexOf(marker);

      if (index !== -1) {
        const path = url.pathname.substring(index + marker.length);

        await supabaseAdmin.storage
          .from("wogah-leather-crafters-storage")
          .remove([path]);
      }
    } catch (error) {
      console.error("Failed deleting image:", image.url, error);
    }
  }

  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin/products");
}