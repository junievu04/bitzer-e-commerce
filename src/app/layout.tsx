import { CartProvider } from "@/hooks";
import { getMetadataBaseUrl } from "@/utils/app-url";
import { IntlProvider } from "@/utils/intl";
import TanStackQueryProvider from "@/vendors/tanstack-query/provider";
import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DAITIN — Phụ tùng máy nén Bitzer chính hãng",
    template: "%s | DAITIN",
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
  authors: [{ name: "DAITIN" }],
  creator: "DAITIN",
  metadataBase: getMetadataBaseUrl(process.env.NEXT_PUBLIC_APP_URL),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: "DAITIN",
    title: "DAITIN — Phụ tùng máy nén Bitzer chính hãng",
    description:
      "Chuyên cung cấp phụ tùng máy nén Bitzer, linh kiện điện lạnh chính hãng.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DAITIN — Phụ tùng máy nén Bitzer chính hãng",
    description:
      "Chuyên cung cấp phụ tùng máy nén Bitzer, linh kiện điện lạnh chính hãng.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${beVietnamPro.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <IntlProvider>
          <TanStackQueryProvider>
            <CartProvider>{children}</CartProvider>
          </TanStackQueryProvider>
        </IntlProvider>
      </body>
    </html>
  );
}
