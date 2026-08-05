type Props = {
  title: string;
  description: string;
};

export function PageHeader({
  title,
  description,
}: Props) {
  return (
    <div className="mb-10">
      <h1 className="text-5xl font-bold tracking-tight">
        {title}
      </h1>

      <p className="mt-3 text-neutral-500">
        {description}
      </p>
    </div>
  );
}