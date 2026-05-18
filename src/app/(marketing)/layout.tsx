import Footer from "@/components/footer";
import Header from "@/components/header";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen overflow-hidden bg-zinc-950 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-125 max-w-125 -translate-x-1/2 rounded-full bg-violet-600/30 blur-[140px]" />
      </div>
      <Header />
      {children}
      <Footer />
    </main>
  );
}
