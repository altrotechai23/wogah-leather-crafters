import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditProductForm from "@/components/admin/edit-product-form";


export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: {
      id,
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

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Product
        </h1>

        <p className="mt-2 text-neutral-500">
          Update your leather product.
        </p>
      </div>

      <EditProductForm
            product={{
                id: product.id,
                name: product.name,
                slug: product.slug,
                category: product.category,
                tagline: product.tagline,
                description: product.description,

                price: Number(product.price), // ✅ convert Decimal

                stock: product.stock,
                sku: product.sku,

                bestseller: product.bestseller,
                isNew: product.isNew,
                published: product.published,

                details: product.details,

                images: product.images,

                colors: product.colors.map((color) => ({
                id: color.id,
                name: color.name,
                hex: color.hex ?? "", // convert null -> ""
                stock: color.stock,
                productId: color.productId,
                })),
            }}
            />
    </div>
  );
}