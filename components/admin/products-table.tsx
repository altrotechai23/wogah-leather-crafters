"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Product, ProductImage } from "@prisma/client";
import {
  Pencil,
  Eye,
  Search,
  Star,
  Sparkles,
} from "lucide-react";
import DeleteProductButton from "./delete-product-button";

type ProductWithImages = Omit<Product, "price"> & {
  price: number;
  images: ProductImage[];
};

export default function ProductsTable({
  products,
}: {
  products: ProductWithImages[];
}) {
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase();

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.slug.toLowerCase().includes(value)
      );
    });
  }, [products, search]);

  return (
    <div className="space-y-6">

      {/* Search */}

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 outline-none transition-all focus:border-black"
        />

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">

        <table className="w-full">

          <thead className="border-b bg-zinc-50">

            <tr className="text-left text-sm font-medium text-zinc-500">

              <th className="px-6 py-4">Product</th>

              <th className="py-4">Category</th>

              <th className="py-4">Price</th>

              <th className="py-4">Status</th>

              <th className="py-4">Stock</th>

              <th className="py-4 text-right pr-6">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredProducts.map((product) => (

              <tr
                key={product.id}
                className="border-b border-zinc-100 transition-all hover:bg-zinc-50"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={
                        product.images[0]?.url ??
                        "https://placehold.co/80x80"
                      }
                      alt={product.name}
                      className="h-16 w-16 rounded-2xl border object-cover"
                    />

                    <div>

                      <div className="flex items-center gap-2">

                        <p className="font-semibold">
                          {product.name}
                        </p>

                        {product.bestseller && (
                          <Star
                            size={15}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        )}

                        {product.isNew && (
                          <Sparkles
                            size={15}
                            className="text-emerald-500"
                          />
                        )}

                      </div>

                      <p className="text-sm text-zinc-500">
                        {product.slug}
                      </p>

                    </div>

                  </div>

                </td>

                <td>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm">
                    {product.category}
                  </span>

                </td>

                <td className="font-semibold">
                  R{Number(product.price).toLocaleString()}
                </td>

                <td>

                  {product.published ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                      Published
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Draft
                    </span>
                  )}

                </td>

                <td>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.stock <= 5
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {product.stock} pcs
                  </span>

                </td>

                <td className="pr-6">

                  <div className="flex justify-end gap-2">

                    <Link
                      href={`/products/${product.slug}`}
                      target="_blank"
                      className="rounded-xl border border-zinc-200 p-2 transition hover:bg-zinc-100"
                    >
                      <Eye size={18} />
                    </Link>

                    <Link
                      href={`/admin/products/${product.id}`}
                      className="rounded-xl border border-zinc-200 p-2 transition hover:bg-zinc-100"
                    >
                      <Pencil size={18} />
                    </Link>

                    <DeleteProductButton id={product.id} />

                  </div>

                </td>

              </tr>

            ))}

            {filteredProducts.length === 0 && (

              <tr>

                <td
                  colSpan={6}
                  className="py-20 text-center text-zinc-400"
                >
                  No products found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}