"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/shop");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete product.",
    };
  }
}