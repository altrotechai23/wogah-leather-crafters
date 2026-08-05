import {
  Package,
  ShoppingBag,
  CheckCircle2,
  Clock3,
} from "lucide-react";

type Props = {
  totalProducts: number;
  publishedProducts: number;
  totalOrders: number;
  pendingOrders: number;
};

export default function DashboardCards({
  totalProducts,
  publishedProducts,
  totalOrders,
  pendingOrders,
}: Props) {
  const cards = [
    {
      title: "Products",
      value: totalProducts,
      icon: Package,
    },
    {
      title: "Published",
      value: publishedProducts,
      icon: CheckCircle2,
    },
    {
      title: "Orders",
      value: totalOrders,
      icon: ShoppingBag,
    },
    {
      title: "Pending",
      value: pendingOrders,
      icon: Clock3,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.value}
              </h2>
            </div>

            <div className="rounded-xl bg-black p-3 text-white dark:bg-white dark:text-black">
              <card.icon size={22} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}