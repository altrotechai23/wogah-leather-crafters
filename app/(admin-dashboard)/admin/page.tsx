import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const [products, orders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
  ]);

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <h1 className="font-serif text-5xl">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back, WOGAH.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <StatCard
            title="Products"
            value={products}
            href="/admin/products"
          />

          <StatCard
            title="Orders"
            value={orders}
            href="/admin/orders"
          />

          <StatCard
            title="Revenue"
            value="$0"
          />
        </div>
      </div>
    </main>
  );
}

function StatCard({
  title,
  value,
  href,
}: {
  title: string;
  value: string | number;
  href?: string;
}) {
  const card = (
    <div className="rounded-3xl border bg-card p-8 transition hover:-translate-y-1 hover:shadow-xl">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <h2 className="mt-3 text-5xl font-serif">
        {value}
      </h2>
    </div>
  );

  if (!href) return card;

  return <Link href={href}>{card}</Link>;
}