import { Footer } from "@/modules/layout/footer";
import { Header } from "@/modules/layout/header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <Header />

      {/* ── Page content ─────────────────────────────────────────────
          min-h calculation subtracts header (64px) so short pages
          never leave a gap above the footer.
      ──────────────────────────────────────────────────────────────── */}
      <main
        style={{
          minHeight: "calc(100vh - var(--header-height, 64px))",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </main>

      {/* ── Bottom ───────────────────────────────────────────────────── */}
      <Footer />

      {/* ── Floating widgets (fixed position, above everything) ──────── */}
      {/* <StickyContact />
      <ChatbotWidget /> */}
    </>
  );
}
