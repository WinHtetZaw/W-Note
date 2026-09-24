import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-screen custom-scroll bg-background text-foreground">
      {children}
    </main>
  );
}
