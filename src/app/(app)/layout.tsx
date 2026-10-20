import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="h-dvh custom-scroll bg-background text-foreground">
      {children}
    </main>
  );
}
