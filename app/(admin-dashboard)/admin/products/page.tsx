import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-5xl">
            Products
          </h1>

          <p className="mt-2 text-muted-foreground">
            Manage your catalogue.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-xl bg-black px-5 py-3 text-white"
        >
          New Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="p-5 text-left">Product</th>
              <th className="p-5 text-left">Category</th>
              <th className="p-5 text-left">Price</th>
              <th className="p-5 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b transition hover:bg-muted/30"
              >
                <td className="p-5">
                  {product.name}
                </td>

                <td className="p-5">
                  {product.category}
                </td>

                <td className="p-5">
                  ${Number(product.price)}
                </td>

                <td className="p-5">
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}