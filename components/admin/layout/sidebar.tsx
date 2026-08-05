"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navigation } from "../navigation";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 border-r bg-white lg:flex lg:flex-col">
      <div className="border-b px-8 py-8">
        <h1 className="text-2xl font-bold tracking-[0.3em]">
          WOGAH
        </h1>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
                pathname === item.href
                  ? "bg-black text-white"
                  : "text-neutral-600 hover:bg-neutral-100"
              )}
            >
              <Icon size={18} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}