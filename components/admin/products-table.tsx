import Link from "next/link";
import { Product, ProductImage } from "@prisma/client";
import { Pencil, Eye } from "lucide-react";

type ProductWithImages = Product & {
  images: ProductImage[];
};

export default function ProductsTable({
  products,
}: {
  products: ProductWithImages[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full">
        <thead className="border-b border-zinc-200 dark:border-zinc-800">
          <tr className="text-left text-sm text-zinc-500">
            <th className="px-6 py-4">Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-zinc-100 transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-950"
            >
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      product.images[0]?.url ||
                      "https://placehold.co/60x60"
                    }
                    className="h-14 w-14 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-semibold">
                      {product.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {product.slug}
                    </p>
                  </div>
                </div>
              </td>

              <td>{product.category}</td>

              <td>₦{product.price.toString()}</td>

              <td>
                {product.published ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Published
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                    Draft
                  </span>
                )}
              </td>

              <td>{product.stock}</td>

              <td>
                <div className="flex gap-2">
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    className="rounded-xl border p-2 hover:bg-zinc-100"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    href={`/admin/products/${product.id}`}
                    className="rounded-xl border p-2 hover:bg-zinc-100"
                  >
                    <Pencil size={18} />
                  </Link>
                </div>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-12 text-center text-zinc-500"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}