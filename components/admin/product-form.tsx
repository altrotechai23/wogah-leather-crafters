"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema } from "@/lib/validators/product";
import { z } from "zod";
import { toast } from "sonner";
import { defaultProductValues } from "@/lib/defaults/product";
import { uploadImages } from "@/lib/upload-images";
import {createProduct, updateProduct,} from "@/actions/product.actions";
import { useRouter } from "next/navigation";
import ImageUploader from "./image-uploader";
import ProductColors from "./product-colors";
import ProductDetails from "./product-details";
import { ProductColor, ProductImage } from "@prisma/client";
type ProductFormValues = z.infer<typeof productSchema>;
const categories = [
  "Bags",
  "Backpacks",
  "Wallets",
  "Belts",
  "Footwear",
  "Accessories",
];

type ProductWithRelations = {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  price: number;
  stock: number;
  sku: string | null;
  bestseller: boolean;
  isNew: boolean;
  published: boolean;
  details: string[];
  images: ProductImage[];
  colors: ProductColor[];
};

type ProductFormProps = {
  mode?: "create" | "edit";
  product?: ProductFormValues;
  productId?: string;
};

export default function ProductForm({
  mode = "create",
  product,
  productId,
}: ProductFormProps) {
  const form = useForm<ProductFormValues>({
  resolver: zodResolver(productSchema) as any,

  defaultValues:
    mode === "edit" && product
      ? {
          ...defaultProductValues,
          ...product,
        }
      : defaultProductValues,
});
  const router = useRouter();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const name = watch("name");

  useEffect(() => {
    if (!name) {
      setValue("slug", "");
      return;
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-");

    setValue("slug", slug);
  }, [name, setValue]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      let imageUrls: string[] = [];

      if (data.images && data.images.length > 0) {
        imageUrls = await uploadImages(data.images);
      }

      const payload = {
        ...data,
        images: imageUrls,
      };

      const result =
        mode === "edit" && productId
          ? await updateProduct(productId, payload)
          : await createProduct(payload);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(
        mode === "edit"
          ? "Product updated successfully."
          : "Product created successfully."
      );

      if (mode === "create") {
        form.reset(defaultProductValues);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-8 lg:grid-cols-3"
      >
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* BASIC INFO */}
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">
              Basic Information
            </h2>

            <div className="space-y-5">
              {/* NAME */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Product Name
                </label>

                <input
                  {...register("name")}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-black"
                />

                {errors.name && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* SLUG */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Slug
                </label>

                <input
                  {...register("slug")}
                  readOnly
                  className="w-full rounded-xl border bg-neutral-100 px-4 py-3"
                />

                {errors.slug && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.slug.message}
                  </p>
                )}
              </div>

              {/* CATEGORY */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Category
                </label>

                <select
                  {...register("category")}
                  className="w-full rounded-xl border px-4 py-3"
                >
                  <option value="">Select Category</option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>

                {errors.category && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* TAGLINE */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Tagline
                </label>

                <input
                  {...register("tagline")}
                  className="w-full rounded-xl border px-4 py-3"
                />

                {errors.tagline && (
                  <p className="mt-2 text-sm text-red-500">
                    {errors.tagline.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-6 text-lg font-semibold">
              Description
            </h2>

            <textarea
              rows={8}
              {...register("description")}
              className="w-full rounded-xl border px-4 py-3"
            />

            {errors.description && (
              <p className="mt-2 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <ImageUploader />
          <ProductColors />
          <ProductDetails />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* PRICE */}
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-6 font-semibold">
              Pricing
            </h2>

            <input
              type="number"
              step="0.01"
              {...register("price", {
                valueAsNumber: true,
              })}
              className="w-full rounded-xl border px-4 py-3"
            />

            {errors.price && (
              <p className="mt-2 text-sm text-red-500">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* STOCK */}
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-6 font-semibold">
              Inventory
            </h2>

            <input
              type="number"
              {...register("stock", {
                valueAsNumber: true,
              })}
              className="w-full rounded-xl border px-4 py-3"
            />

            {errors.stock && (
              <p className="mt-2 text-sm text-red-500">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* STATUS */}
          <div className="rounded-2xl border bg-white p-6">
            <h2 className="mb-5 font-semibold">
              Status
            </h2>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                Published
                <input
                  type="checkbox"
                  {...register("published")}
                />
              </label>

              <label className="flex items-center justify-between">
                Bestseller
                <input
                  type="checkbox"
                  {...register("bestseller")}
                />
              </label>

              <label className="flex items-center justify-between">
                New Arrival
                <input
                  type="checkbox"
                  {...register("isNew")}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-black font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && (
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="white"
                  strokeWidth="3"
                  opacity=".2"
                />

                <path
                  d="M22 12a10 10 0 00-10-10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            )}

            {isSubmitting
                ? mode === "edit"
                  ? "Updating Product..."
                  : "Saving Product..."
                : mode === "edit"
                ? "Update Product"
                : "Save Product"
                }
          </button>
        </div>
      </form>
    </FormProvider>
  );
}