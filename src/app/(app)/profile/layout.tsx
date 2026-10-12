import Footer from "@/components/footer";
import Header from "@/components/header";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="page-container p-6 lg:px-8 lg:py-12 space-y-8">
        {children}
      </div>
      <Footer />
    </div>
  );
}
