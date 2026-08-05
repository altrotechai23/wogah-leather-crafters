import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

type Props = {
  children: ReactNode;
};

export function AdminShell({ children }: Props) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}