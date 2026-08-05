import { AdminShell } from "@/components/admin/layout/admin-shell";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}