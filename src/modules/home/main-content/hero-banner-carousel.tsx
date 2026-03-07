"use client";
import Button from "@/components/button";
import { Carousel } from "@/components/carousel";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { MainContentWrapper } from "@/modules/home/main-content/main-content-wrapper";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";

// ─── Slide data ───────────────────────────────────────────────────────────────
// Swap `bg` + `imgEmoji` for a real <Image src="..." fill> when photos are ready

const SLIDES = [
  {
    id: 1,
    bg: "linear-gradient(135deg, #052e16 0%, #14532d 60%, #166534 100%)",
    imgEmoji: "🏭",
    tag: "Phụ tùng chính hãng",
    heading: ["Phụ tùng máy nén", "Bitzer chính hãng"],
    accentLine: 1, // which heading line gets brand color
    subtitle:
      "Hơn 500 sản phẩm phụ tùng, linh kiện điện lạnh. Giao hàng nhanh toàn quốc. Tư vấn kỹ thuật 24/7.",
    ctaPrimary: { label: "Xem sản phẩm", href: "/products" },
    ctaSecondary: { label: "Tư vấn ngay", href: "/contact" },
  },
  {
    id: 2,
    bg: "linear-gradient(135deg, #0a1628 0%, #0f2942 60%, #1a3a5c 100%)",
    imgEmoji: "🔧",
    tag: "Dịch vụ kỹ thuật",
    heading: ["Sửa chữa máy nén", "chuyên nghiệp"],
    accentLine: 1,
    subtitle:
      "Đội ngũ kỹ sư 15+ năm kinh nghiệm. Phục vụ tại chỗ trên toàn quốc. Cam kết bảo hành 12 tháng.",
    ctaPrimary: { label: "Đặt lịch sửa chữa", href: "/contact" },
    ctaSecondary: { label: "Xem dịch vụ", href: "/products?category=dich-vu" },
  },
  {
    id: 3,
    bg: "linear-gradient(135deg, #1c1008 0%, #3b1f05 60%, #78350f 100%)",
    imgEmoji: "❄️",
    tag: "Điện lạnh công nghiệp",
    heading: ["Giải pháp điện lạnh", "toàn diện"],
    accentLine: 1,
    subtitle:
      "Cung cấp đầy đủ gas lạnh, phụ kiện điện lạnh công nghiệp. Đại lý chính thức tại Việt Nam.",
    ctaPrimary: {
      label: "Xem giải pháp",
      href: "/products?category=dien-lanh",
    },
    ctaSecondary: { label: "Liên hệ ngay", href: "/contact" },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function HeroBannerCarousel() {
  const { t } = useIntl();
  return (
    <MainContentWrapper>
      <Box overflow="hidden">
        <Carousel
          variant="single"
          loop
          navigation
          navPosition="inside"
          pagination
          gap={0}
        >
          {SLIDES.map((slide) => (
            <Box
              key={slide.id}
              position="relative"
              minH={{ base: "64", md: "420px" }}
              display="flex"
              alignItems="center"
              // force each slide to 100% width — critical for single variant
              style={{ background: slide.bg, width: "100%", flexShrink: 0 }}
            >
              {/* Grid pattern overlay */}
              <Box
                position="absolute"
                inset="0"
                opacity="0.04"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40px)",
                }}
              />

              {/* Decorative right-side image */}
              <Box
                position="absolute"
                right="8"
                top="50%"
                transform="translateY(-50%)"
                display={{ base: "none", lg: "flex" }}
                alignItems="center"
                justifyContent="center"
                opacity="0.12"
                fontSize="220px"
              >
                {slide.imgEmoji}
              </Box>

              {/* Content */}
              <Stack
                gap="5"
                maxW="520px"
                px={{ base: "8", md: "14" }}
                py={{ base: "10", md: "14" }}
                position="relative"
                zIndex="1"
              >
                {/* Tag pill */}
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap="2"
                  px="3"
                  py="1"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="brand.600"
                  w="fit-content"
                  bgColor="brand.900/40"
                >
                  <Box w="1.5" h="1.5" borderRadius="full" bg="brand.400" />
                  <Text
                    variant="caption-1"
                    weight="bold"
                    tone="trending"
                    inline
                    className={css({
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                    })}
                  >
                    {t(slide.tag)}
                  </Text>
                </Box>

                {/* Heading */}
                <Stack gap="0">
                  {slide.heading.map((line, i) => (
                    <Text
                      key={i}
                      variant="page-heading-1"
                      weight="bold"
                      tone={i === slide.accentLine ? "trending" : "inverse"}
                      inline
                      display="block"
                      textTransform="uppercase"
                    >
                      {t(line)}
                    </Text>
                  ))}
                </Stack>

                {/* Subtitle */}
                <Text
                  variant="paragraph-1"
                  tone="inverse"
                  opacity="0.75"
                  maxW="460px"
                >
                  {t(slide.subtitle)}
                </Text>

                {/* CTAs */}
                <Flex gap="3" flexWrap="wrap" pt="2">
                  <Link href={slide.ctaPrimary.href}>
                    <Button variant="default" size="lg">
                      {t(slide.ctaPrimary.label)}
                    </Button>
                  </Link>
                  <Link href={slide.ctaSecondary.href}>
                    <Button variant="highlight-plain" size="lg" onDark>
                      {t(slide.ctaSecondary.label)}
                    </Button>
                  </Link>
                </Flex>
              </Stack>
            </Box>
          ))}
        </Carousel>
      </Box>
    </MainContentWrapper>
  );
}
