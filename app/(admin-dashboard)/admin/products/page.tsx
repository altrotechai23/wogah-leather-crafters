import Link from "next/link";
import { Plus, Package, Star, Eye } from "lucide-react";

import { prisma } from "@/lib/prisma";
import ProductsTable from "@/components/admin/products-table";
import AnimatedTable from "@/components/admin/animated-table";

export default async function ProductsPage() {
  const dbProducts = await prisma.product.findMany({
    include: {
      images: true,
      colors: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  

const products = dbProducts.map((product) => ({
  ...product,
  price: Number(product.price),
}));

  const totalProducts = products.length;
  const publishedProducts = products.filter(p => p.published).length;
  const featuredProducts = products.filter(p => p.bestseller).length;
  const totalStock = products.reduce((a, b) => a + b.stock, 0);

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

  <div className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    <Package className="mb-5 text-zinc-700 transition group-hover:scale-110" />

    <p className="text-sm text-zinc-500">
      Total Products
    </p>

    <h2 className="mt-3 text-4xl font-bold tracking-tight">
      {totalProducts}
    </h2>
  </div>

  <div className="group rounded-3xl border border-green-200 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <Eye className="mb-5 text-green-600 transition group-hover:scale-110" />

    <p className="text-sm text-green-700">
      Published
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      {publishedProducts}
    </h2>

  </div>

  <div className="group rounded-3xl border border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <Star className="mb-5 fill-yellow-400 text-yellow-500 transition group-hover:rotate-12" />

    <p className="text-sm text-yellow-700">
      Best Sellers
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      {featuredProducts}
    </h2>

  </div>

  <div className="group rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    <Package className="mb-5 text-blue-600 transition group-hover:scale-110" />

    <p className="text-sm text-blue-700">
      Inventory
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      {totalStock}
    </h2>

  </div>

</div>

      <AnimatedTable>
        <ProductsTable products={products} />
      </AnimatedTable>

    </div>
  );
}