export function Topbar() {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <p className="text-sm text-neutral-500">
          Welcome back
        </p>

        <h2 className="text-2xl font-semibold">
          Dashboard
        </h2>
      </div>

      <p className="text-sm text-neutral-500">
        {date}
      </p>
    </header>
  );
}