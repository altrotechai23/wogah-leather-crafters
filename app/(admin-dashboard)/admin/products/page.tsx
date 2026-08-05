import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/products-table";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
      colors: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Products
          </h1>

          <p className="mt-2 text-neutral-500">
            Manage your leather collection.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white transition hover:opacity-90"
        >
          <Plus size={18} />
          New Product
        </Link>
      </div>

      <ProductsTable products={products} />
    </div>
  );
}