import { login } from "@/actions/auth.actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        action={login}
        className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm"
      >
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl">WOGAH Admin</h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your store.
          </p>
        </div>

        {error === "invalid" && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            Invalid username or password.
          </div>
        )}

        <div className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-black"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            required
            className="w-full rounded-lg border border-border bg-background px-4 py-3 outline-none transition focus:border-black"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-black py-3 text-white transition hover:opacity-90"
        >
          Login
        </button>
      </form>
    </main>
  );
}