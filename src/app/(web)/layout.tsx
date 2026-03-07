import { Footer } from "@/modules/layout/footer";
import { Header } from "@/modules/layout/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: "calc(100vh - var(--header-height, 64px))",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>
      <Footer />
      {/* <StickyContact />
      <ChatbotWidget /> */}
    </>
  );
}
