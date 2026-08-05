import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: Props) {
  return (
    <div className="group rounded-3xl border border-neutral-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="rounded-2xl bg-neutral-100 p-3">
          <Icon className="h-5 w-5 text-neutral-700" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-neutral-400">
          LIVE
        </span>
      </div>

      <p className="text-sm text-neutral-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold tracking-tight">
        {value}
      </h2>

      {subtitle && (
        <p className="mt-4 text-sm text-neutral-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}