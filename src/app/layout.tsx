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
    default: "Điện Lạnh Đại Tín — Công nghệ lạnh & Cơ điện công trình",
    template: "%s | Cong Nghe Dien Lanh Dai Tin",
  },
  description:
    "Công ty TNHH TM và DV Công Nghệ Điện Lạnh Đại Tín tại Việt Nam. Cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà máy và công trình xây dựng; luôn ưu tiên tính minh bạch và hiệu quả sử dụng vốn của khách hàng.",
  keywords: [
    "máy nén Bitzer",
    "máy nén piston Bitzer",
    "máy nén trục vít Bitzer",
    "cụm máy nén Bitzer",
    "phụ kiện máy nén Bitzer",
    "dầu Bitzer BSE170 BSE32",
    "bảo trì sửa chữa máy nén",
    "điện lạnh công nghiệp",
    "Bitzer Việt Nam",
    "Đại Tín điện lạnh",
    "spare parts Bitzer Vietnam",
    "công nghệ lạnh",
    "cơ điện công trình",
    "hệ thống lạnh",
    "kho lạnh",
    "nhà máy",
    "công trình xây dựng",
    "minh bạch",
    "hiệu quả sử dụng vốn",
    "tư vấn kỹ thuật",
    "dịch vụ kỹ thuật",
    "dịch vụ bảo trì",
    "dịch vụ sửa chữa",
    "dịch vụ bảo trì máy nén",
    "dịch vụ sửa chữa máy nén",
    "dịch vụ bảo trì máy nén Bitzer",
    "dịch vụ sửa chữa máy nén Bitzer",
    "dịch vụ bảo trì máy nén Bitzer",
    "dịch vụ sửa chữa máy nén Bitzer",
    "Gas lạnh",
    "an toàn vận hành kho đông",
    "kỹ thuật",
    "đại tín",
    "cong nghệ lạnh",
    "cơ điện công trình",
    "hệ thống lạnh",
    "kho lạnh",
    "nhà máy",
    "công trình xây dựng",
    "minh bạch",
    "hiệu quả sử dụng vốn",
    "tư vấn kỹ thuật",
    "dịch vụ kỹ thuật",
    "dịch vụ bảo trì",
  ],
  authors: [{ name: "Công ty TNHH TM và DV Công Nghệ Điện Lạnh Đại Tín" }],
  creator: "Công nghệ điện lạnh đại tín",
  metadataBase: getMetadataBaseUrl(process.env.NEXT_PUBLIC_APP_URL),
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    siteName: "Điện Lạnh Đại Tín",
    title: "Điện Lạnh Đại Tín — Máy nén Bitzer & Dịch vụ lạnh công nghiệp",
    description:
      "Cung cấp máy nén, phụ kiện, dầu bôi trơn và dịch vụ bảo trì sửa chữa máy nén Bitzer chuyên nghiệp.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Điện Lạnh Đại Tín — Công nghệ lạnh & Cơ điện công trình",
    description:
      "Cung cấp thiết bị, vật tư, phụ tùng và dịch vụ kỹ thuật cho hệ thống lạnh, kho lạnh, nhà máy và công trình xây dựng; luôn ưu tiên tính minh bạch và hiệu quả sử dụng vốn của khách hàng.",
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
    icon: [{ url: "/logo.png", sizes: "512x512", type: "image/png" }],
    shortcut: "/logo.png",
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
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
