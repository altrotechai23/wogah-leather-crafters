import ProductForm from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          New Product
        </h1>

        <p className="mt-2 text-neutral-500">
          Create a product for your store.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}