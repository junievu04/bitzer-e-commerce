import type { Metadata, Viewport } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "BITZERshop — Phụ tùng máy nén Bitzer chính hãng",
    template: "%s | BITZERshop",
  },
  description:
    "Chuyên cung cấp phụ tùng máy nén Bitzer, linh kiện điện lạnh, gas lạnh chính hãng. Giao hàng toàn quốc. Tư vấn kỹ thuật 24/7.",
  keywords: [
    "phụ tùng máy nén Bitzer",
    "linh kiện điện lạnh",
    "gas lạnh",
    "máy nén lạnh",
    "Bitzer Việt Nam",
    "spare parts Bitzer",
  ],
  authors: [{ name: "BITZERshop" }],
  creator: "BITZERshop",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: "BITZERshop",
    title: "BITZERshop — Phụ tùng máy nén Bitzer chính hãng",
    description:
      "Chuyên cung cấp phụ tùng máy nén Bitzer, linh kiện điện lạnh chính hãng.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BITZERshop",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITZERshop — Phụ tùng máy nén Bitzer chính hãng",
    description:
      "Chuyên cung cấp phụ tùng máy nén Bitzer, linh kiện điện lạnh chính hãng.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#16a34a",
};

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${lato.variable}`}>
      <body>
        {/*
         * Providers go here as the project grows:
         *
         * <CartProvider>
         *   <LanguageProvider>
         *     <ToastProvider>
         *       {children}
         *     </ToastProvider>
         *   </LanguageProvider>
         * </CartProvider>
         *
         * For now, render children directly so the file compiles
         * before context files are created.
         */}
        {children}
      </body>
    </html>
  );
}
