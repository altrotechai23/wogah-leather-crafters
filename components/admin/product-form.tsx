"use client";

import { useEffect, useState } from "react";
import ImageUploader from "./image-uploader";
import ProductColors from "./product-colors";

const categories = [
  "Bags",
  "Backpacks",
  "Wallets",
  "Belts",
  "Footwear",
  "Accessories",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function ProductForm() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  useEffect(() => {
    setSlug(slugify(name));
  }, [name]);

  return (
    <form className="grid gap-8 lg:grid-cols-3">
      {/* LEFT */}
      <div className="space-y-6 lg:col-span-2">

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="mb-6 text-lg font-semibold">
            Basic Information
          </h2>

          <div className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-medium">
                Product Name
              </label>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Slug
              </label>

              <input
                value={slug}
                readOnly
                className="w-full rounded-xl border bg-neutral-100 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <select className="w-full rounded-xl border px-4 py-3">

                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}

              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Tagline
              </label>

              <input
                className="w-full rounded-xl border px-4 py-3"
              />
            </div>

          </div>

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="mb-6 text-lg font-semibold">
            Description
          </h2>

          <textarea
            rows={10}
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>
        <ImageUploader />
        <ProductColors />
      </div>

      {/* RIGHT */}

      <div className="space-y-6">

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="mb-6 font-semibold">
            Pricing
          </h2>

          <input
            type="number"
            placeholder="250000"
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="mb-6 font-semibold">
            Inventory
          </h2>

          <input
            type="number"
            placeholder="25"
            className="w-full rounded-xl border px-4 py-3"
          />

        </div>

        <div className="rounded-2xl border bg-white p-6">

          <h2 className="mb-5 font-semibold">
            Status
          </h2>

          <div className="space-y-4">

            <label className="flex justify-between">
              Published
              <input type="checkbox" />
            </label>

            <label className="flex justify-between">
              Bestseller
              <input type="checkbox" />
            </label>

            <label className="flex justify-between">
              New Arrival
              <input type="checkbox" />
            </label>

          </div>

        </div>

        <button className="w-full rounded-xl bg-black py-3 font-semibold text-white">
          Save Product
        </button>

      </div>

    </form>
  );
}