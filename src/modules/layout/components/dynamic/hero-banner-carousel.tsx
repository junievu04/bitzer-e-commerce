"use client";
import { Carousel } from "@/components/carousel";
import { Image } from "@/components/image";
import Link from "@/components/link";
import { LayoutComponentDetail } from "@/modules/layout";
import { MainContentWrapper } from "@/modules/layout/components/dynamic";
import { Box } from "@/vendors/styled-system/jsx";

interface Slide {
  id: string;
  image: string;
  ctaLink: string;
}

interface Props {
  detail: LayoutComponentDetail;
}

const defaultSlides: Slide[] = [
  {
    id: "hero-banner-1",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-1.jpg",
    ctaLink: "/products",
  },
  {
    id: "hero-banner-2",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-2.jpg",
    ctaLink: "/services",
  },
  {
    id: "hero-banner-3",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/hero-banner-3.jpg",
    ctaLink: "/contact",
  },
];

export default function HeroBannerCarousel({ detail }: Props) {
  //const { t } = useIntl();
  const object = detail.components?.[0] as { slides: Slide[] };
  if (!object || !object.slides) {
    return null;
  }
  const slides = object.slides || defaultSlides;

  return (
    <MainContentWrapper id="hero-banner-carousel">
      <Carousel
        variant="single"
        loop
        navigation
        navPosition="inside"
        pagination
        gap={0}
      >
        {slides.map((slide) => (
          <Link
            key={slide.id}
            href={slide.ctaLink}
            display="block"
            style={{ width: "100%", flexShrink: 0 }}
          >
            <Box
              position="relative"
              minH={{ base: "64", md: "420px" }}
              overflow="hidden"
            >
              <Image
                src={slide.image}
                alt={slide.id}
                width="100%"
                height="100%"
                aspectRatio="16/9"
                objectFit="cover"
                borderRadius="0"
                wrapperProps={{ position: "absolute", inset: "0" }}
              />
            </Box>
          </Link>
        ))}
        {/* {SLIDES.map((slide) => (
          <Link
            key={slide.id}
            href={slide.ctaPrimary.href}
            display="block"
            style={{ width: "100%", flexShrink: 0 }}
          >
            <Box
              position="relative"
              minH={{ base: "64", md: "420px" }}
              display="flex"
              alignItems="center"
              overflow="hidden"
            >
              <Image
                src={slide.image}
                alt={slide.tag}
                width="100%"
                height="100%"
                objectFit="cover"
                borderRadius="0"
                fallback={slide.fallback}
                wrapperProps={{
                  position: "absolute",
                  inset: "0",
                }}
              />
              <Box
                position="absolute"
                inset="0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.1) 100%)",
                }}
              />

              <Stack
                gap="5"
                maxW="520px"
                px={{ base: "8", md: "14" }}
                py={{ base: "10", md: "14" }}
                position="relative"
                zIndex="1"
              >
                <Box
                  display="inline-flex"
                  alignItems="center"
                  gap="2"
                  px="3"
                  py="1"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="brand.400"
                  w="fit-content"
                  className={css({ bg: "brand.900/40" })}
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

                <Stack gap="0">
                  {slide.heading.map((line, i) => (
                    <Text
                      key={i}
                      variant="page-heading-1"
                      weight="bold"
                      tone={i === slide.accentLine ? "trending" : "inverse"}
                      inline
                      className={css({
                        display: "block",
                        lineHeight: "1.2",
                        textTransform: "uppercase",
                      })}
                    >
                      {t(line)}
                    </Text>
                  ))}
                </Stack>

                <Text
                  variant="paragraph-1"
                  tone="inverse"
                  className={css({
                    opacity: "0.85",
                    lineHeight: "1.8",
                    maxW: "460px",
                  })}
                >
                  {t(slide.subtitle)}
                </Text>

                <Flex gap="3" flexWrap="wrap" pt="2">
                  <Button variant="default" size="lg">
                    {t(slide.ctaPrimary.label)}
                  </Button>
                  <Button variant="highlight-plain" size="lg" onDark>
                    {t(slide.ctaSecondary.label)}
                  </Button>
                </Flex>
              </Stack>
            </Box>
          </Link>
        ))} */}
      </Carousel>
    </MainContentWrapper>
  );
}
