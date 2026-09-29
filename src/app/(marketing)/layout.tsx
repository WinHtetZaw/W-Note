import Footer from "@/components/footer";
import Header from "@/components/header";
import BackgroundGlow from "@/components/ui/background-glow";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-transparent">
      <BackgroundGlow />
      <Header />
      <main className="page-container">{children}</main>
      <Footer />
    </div>
  );
}
