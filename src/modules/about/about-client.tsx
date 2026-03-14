"use client";
import { Carousel } from "@/components/carousel";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text/text";
import { useIntl } from "@/utils/intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Grid, HStack, Stack } from "@/vendors/styled-system/jsx";
import AboutHeader from "./about-header";

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { num: "20+", label: "Năm kinh nghiệm" },
  { num: "500+", label: "Sản phẩm chính hãng" },
  { num: "90+", label: "Kỹ sư chuyên nghiệp" },
  { num: "27+", label: "Dự án hoàn thành" },
];

const VALUES = [
  {
    icon: "🏆",
    title: "Chính hãng 100%",
    desc: "Toàn bộ phụ tùng và nhớt chỉ sử dụng hàng chính hãng Bitzer, cam kết chất lượng tuyệt đối.",
  },
  {
    icon: "🔧",
    title: "Kỹ thuật chuyên sâu",
    desc: "Đội ngũ kỹ sư được đào tạo chuyên môn bởi tập đoàn Bitzer Đức, nắm vững công nghệ tiên tiến.",
  },
  {
    icon: "🌿",
    title: "Bảo vệ môi trường",
    desc: "Cam kết sử dụng các giải pháp thân thiện môi trường, hướng tới phát triển bền vững.",
  },
  {
    icon: "🤝",
    title: "Dịch vụ tận tâm",
    desc: "Luôn đặt lợi ích khách hàng lên hàng đầu, hỗ trợ kỹ thuật 24/7 trên toàn quốc.",
  },
];

const SERVICES = [
  { label: "Genuine spare parts", sub: "Phụ tùng chính hãng" },
  { label: "Professionalism", sub: "Dịch vụ chuyên nghiệp" },
  { label: "Expertise", sub: "Kỹ thuật chuyên môn đào tạo bởi BITZER" },
  { label: "Environmental care", sub: "Bảo vệ môi trường" },
];

const CLIENTS = [
  "Lotte",
  "M&M",
  "GO!",
  "Thai Som Group",
  "Vinamilk",
  "Kinh Đô",
  "Kido",
  "CP Group",
];

const CERTS = [
  { label: "Giấy phép kinh doanh", emoji: "📄" },
  { label: "Chứng nhận đại lý Bitzer", emoji: "🏅" },
  { label: "ISO 9001:2015", emoji: "✅" },
];

const COMPRESSOR_LINES = [
  {
    name: "Máy nén Scroll",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/breakfast.jpg",
  },
  {
    name: "Máy nén Piston",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/breakfast.jpg",
  },
  {
    name: "Máy nén Trục vít",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/breakfast.jpg",
  },
  {
    name: "Máy nén Semi-hermetic",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/breakfast.jpg",
  },
  {
    name: "Máy nén Inverter",
    image:
      "https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/breakfast.jpg",
  },
];

export default function AboutClient() {
  const { t } = useIntl();

  return (
    <Box bg="bg.default">
      <Box
        position="relative"
        minH={{ base: "56", md: "72" }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
        style={{
          background:
            "linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)",
        }}
      >
        {/* Grid overlay */}
        <Box
          position="absolute"
          inset="0"
          opacity="0.05"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 0,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 40px)",
          }}
        />
        {/* Left accent bar */}
        <Box
          position="absolute"
          left="0"
          top="0"
          bottom="0"
          w="1"
          bg="brand.400"
        />

        <Stack
          gap="3"
          alignItems="center"
          textAlign="center"
          position="relative"
          zIndex="1"
          px="6"
        >
          <Text
            variant="page-heading-1"
            weight="bold"
            tone="inverse"
            className={css({
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            })}
          >
            {t("GREEN POINT VIỆT NAM")}
          </Text>
          <Text variant="paragraph-1" tone="trending" weight="medium">
            {t("BITZER GROUP")}
          </Text>
          <Box w="16" h="1" bg="brand.400" borderRadius="full" mt="2" />
        </Stack>
      </Box>

      <Box maxW="1280px" mx="auto" px={{ base: "4", md: "8" }}>
        {/* ══ 2. INTRO ═════════════════════════════════════════════════════ */}
        <Box py={{ base: "12", md: "20" }}>
          <Grid columns={{ base: 1, md: 2 }} gap="12" alignItems="center">
            {/* Text */}
            <Stack gap="6">
              <AboutHeader label="Giới thiệu" title="Khái niệm Green Point" />
              <Stack gap="4">
                {[
                  "Công ty Green Point Việt Nam là đại lý nhượng quyền duy nhất của tập đoàn Bitzer Đức chuyên cung cấp dịch vụ sửa chữa, bảo dưỡng, phụ tùng và dầu nhớt cho hệ thống lạnh tại Việt Nam.",
                  "Với gần 20 năm kinh nghiệm, chúng tôi không ngừng phát triển và chuẩn hóa chất lượng dịch vụ để đáp ứng ngày càng cao yêu cầu của quý khách hàng và khẳng định uy tín và thương hiệu trên thị trường Việt Nam.",
                  "Đội ngũ kỹ sư, kỹ thuật viên của chúng tôi có tay nghề cao, trách nhiệm cao, tận tâm trong công việc, được đào tạo và chuyên giao công nghệ từ tập đoàn Bitzer bởi các chuyên gia kinh nghiệm.",
                ].map((para, i) => (
                  <Text
                    key={i}
                    variant="paragraph-1"
                    tone="secondary"
                    className={css({ lineHeight: "1.8" })}
                  >
                    {t(para)}
                  </Text>
                ))}
              </Stack>
            </Stack>

            {/* Image placeholder */}
            <Image
              src="https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/food/dessert.jpg"
              alt="Kho hàng Green Point Việt Nam"
              aspectRatio="4/3"
              width="100%"
              objectFit="cover"
              borderRadius="2xl"
              fallback="https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/cup-on-a-table.jpg"
            />
          </Grid>
        </Box>

        {/* ══ 3. STATS ═════════════════════════════════════════════════════ */}
        <Box
          bg="white"
          borderRadius="2xl"
          border="1px solid {colors.gray.200}"
          py={{ base: "8", md: "12" }}
          mb={{ base: "12", md: "20" }}
        >
          <Flex
            justifyContent="center"
            alignItems="stretch"
            flexWrap="wrap"
            gap={{ base: "6", md: "0" }}
          >
            {STATS.map((s, i) => (
              <Flex key={s.num} alignItems="stretch">
                <Stack gap="3" alignItems="center" px={{ base: "8", md: "16" }}>
                  <Box
                    h="16"
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="center"
                  >
                    <Text variant="metric-1" weight="bold" tone="link">
                      {s.num}
                    </Text>
                  </Box>
                  <Box
                    h="10"
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="center"
                  >
                    <Text
                      variant="paragraph-2"
                      tone="secondary"
                      maxW={120}
                      textAlign="center"
                    >
                      {t(s.label)}
                    </Text>
                  </Box>
                </Stack>
                {i < STATS.length - 1 && (
                  <Box
                    display={{ base: "none", md: "block" }}
                    w="1px"
                    alignSelf="stretch"
                    bg="gray.200"
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Box>

        {/* ══ 4. LĨNH VỰC HOẠT ĐỘNG ═══════════════════════════════════════ */}
        <Box pb={{ base: "12", md: "20" }}>
          <Grid columns={{ base: 1, md: 2 }} gap="12" alignItems="center">
            {/* Image placeholder */}
            <Image
              src="https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/food/pot-mussels.jpg"
              alt="Lĩnh vực hoạt động"
              aspectRatio="4/3"
              width="100%"
              objectFit="cover"
              borderRadius="2xl"
              fallback="https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/cup-on-a-table.jpg"
            />

            {/* Content */}
            <Stack gap="6">
              <AboutHeader label="Hoạt động" title="Lĩnh vực hoạt động" />
              <Text
                variant="paragraph-1"
                tone="secondary"
                className={css({ lineHeight: "1.8" })}
              >
                {t(
                  "Công ty TNHH Green Point Vietnam là trung tâm dịch vụ được ủy quyền duy nhất tại Việt Nam cho việc sửa chữa, bảo trì toàn diện máy nén BITZER. Hệ thống Green Point cung cấp cho khách hàng dịch vụ sửa chữa máy nén với các giá trị cốt lõi sau:",
                )}
              </Text>
              <Stack gap="3">
                {SERVICES.map((svc) => (
                  <HStack key={svc.label} gap="3" alignItems="flex-start">
                    <Box
                      w="2"
                      h="2"
                      borderRadius="full"
                      bg="brand.500"
                      mt="2"
                      flexShrink={0}
                    />
                    <Box>
                      <Text
                        variant="paragraph-1"
                        weight="bold"
                        tone="primary"
                        inline
                      >
                        {svc.label}
                      </Text>
                      <Text variant="paragraph-1" tone="secondary" inline>
                        {" // "}
                        {t(svc.sub)}
                      </Text>
                    </Box>
                  </HStack>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Box>

        {/* ══ 5. GIÁ TRỊ ══════════════════════════════════════════════════ */}
        <Box pb={{ base: "12", md: "20" }}>
          <Stack gap="10">
            <AboutHeader
              label="Cam kết"
              title="Về giá trị Green Point"
              center
            />
            <Grid columns={{ base: 1, md: 2 }} gap="6">
              {VALUES.map((v) => (
                <Box
                  key={v.title}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid {colors.gray.200}"
                  p="6"
                  className={css({
                    transition: "all 0.25s ease",
                    _hover: {
                      borderColor: "brand.200",
                      boxShadow: "0 8px 24px token(colors.brand.500/0.1)",
                      transform: "translateY(-2px)",
                    },
                  })}
                >
                  <HStack gap="4" alignItems="flex-start">
                    <Box
                      w="12"
                      h="12"
                      borderRadius="xl"
                      bg="brand.50"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="2xl"
                      flexShrink={0}
                    >
                      {v.icon}
                    </Box>
                    <Stack gap="2">
                      <Text variant="paragraph-1" weight="bold" tone="primary">
                        {t(v.title)}
                      </Text>
                      <Text
                        variant="paragraph-2"
                        tone="secondary"
                        className={css({ lineHeight: "1.7" })}
                      >
                        {t(v.desc)}
                      </Text>
                    </Stack>
                  </HStack>
                </Box>
              ))}
            </Grid>
          </Stack>
        </Box>

        {/* ══ 6. CHỨNG NHẬN ═══════════════════════════════════════════════ */}
        <Box pb={{ base: "12", md: "20" }}>
          <Stack gap="10">
            <AboutHeader
              label="Pháp lý"
              title="Giấy chứng nhận của Green Point Việt Nam"
            />
            <Flex gap="6" flexWrap="wrap">
              {CERTS.map((cert) => (
                <Box
                  key={cert.label}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid {colors.gray.200}"
                  p="6"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  gap="3"
                  minW="40"
                  className={css({
                    transition: "all 0.2s",
                    _hover: {
                      borderColor: "brand.300",
                      boxShadow: "0 4px 12px token(colors.brand.500/0.12)",
                    },
                  })}
                >
                  <Box fontSize="3xl">{cert.emoji}</Box>
                  <Text
                    variant="caption-1"
                    weight="bold"
                    tone="secondary"
                    textAlign="center"
                  >
                    {t(cert.label)}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Stack>
        </Box>

        {/* ══ 7. DÒNG MÁY NÉN ════════════════════════════════════════════ */}
        <Box pb={{ base: "12", md: "20" }}>
          <Stack gap="10">
            <AboutHeader label="Sản phẩm" title="Một số dòng máy nén" center />
            <Carousel variant="three" navigation pagination loop gap={20}>
              {COMPRESSOR_LINES.map((item) => (
                <Box
                  key={item.name}
                  bg="white"
                  borderRadius="xl"
                  border="1px solid {colors.gray.200}"
                  overflow="hidden"
                  className={css({
                    transition: "all 0.25s ease",
                    _hover: {
                      borderColor: "brand.200",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 32px token(colors.gray.900/0.1)",
                    },
                  })}
                >
                  {/* Image area */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    aspectRatio="4/3"
                    width="100%"
                    objectFit="cover"
                    borderRadius="0"
                    fallback="https://res.cloudinary.com/dsw4o0hjl/image/upload/samples/cup-on-a-table.jpg"
                  />
                  {/* Label */}
                  <Box p="4">
                    <Text
                      variant="paragraph-1"
                      weight="bold"
                      tone="primary"
                      textAlign="center"
                    >
                      {t(item.name)}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Carousel>
          </Stack>
        </Box>

        {/* ══ 8. KHÁCH HÀNG ═══════════════════════════════════════════════ */}
        <Box pb={{ base: "12", md: "20" }}>
          <Stack gap="8">
            <AboutHeader label="Đối tác" title="Khách hàng tiêu biểu" center />
            <Flex flexWrap="wrap" gap="4" justifyContent="center">
              {CLIENTS.map((name) => (
                <Box
                  key={name}
                  bg="white"
                  border="1px solid {colors.gray.200}"
                  borderRadius="xl"
                  px="6"
                  py="4"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minW="28"
                  className={css({
                    transition: "all 0.2s",
                    _hover: { borderColor: "brand.400", bg: "brand.50" },
                  })}
                >
                  <Text variant="paragraph-2" weight="bold" tone="secondary">
                    {name}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Stack>
        </Box>
      </Box>

      {/* ══ 9. CTA BANNER ════════════════════════════════════════════════ */}
      <Box
        style={{ background: "linear-gradient(90deg, #15803d, #22c55e)" }}
        py={{ base: "10", md: "16" }}
        borderRadius="xl"
        mb="10"
      >
        <Stack alignItems="center" gap="4" px="4" textAlign="center">
          <Text
            variant="page-heading-2"
            weight="bold"
            tone="inverse"
            className={css({ textTransform: "uppercase" })}
          >
            {t("LIÊN HỆ TƯ VẤN")}
          </Text>
          <Text variant="metric-1" weight="bold" tone="inverse">
            (+84) 975 187 429
          </Text>
          <Link href="/contact">
            <Box
              as="button"
              mt="2"
              px="8"
              py="3"
              bg="white"
              color="brand.700"
              borderRadius="full"
              fontWeight="700"
              fontSize="md"
              border="none"
              cursor="pointer"
              className={css({
                transition: "all 0.2s",
                _hover: {
                  bg: "brand.50",
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                },
              })}
            >
              {t("Gửi yêu cầu tư vấn")}
            </Box>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
