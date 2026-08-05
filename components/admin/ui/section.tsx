import { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
};

export function Section({
  title,
  children,
}: Props) {
  return (
    <section className="rounded-3xl border bg-white p-8">
      <h3 className="mb-8 text-xl font-semibold">
        {title}
      </h3>

      {children}
    </section>
  );
}