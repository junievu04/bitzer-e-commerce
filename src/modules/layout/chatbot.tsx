"use client";

import Button from "@/components/button/button";
import {
  CrossDiagonal,
  RoundSpeechBubble,
  TravelNavigation,
} from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import TextField from "@/components/text-field";
import { getChatbotResponse } from "@/constants/chatbot-rule";
import { useIntl } from "@/utils/intl/use-intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const MOCK_PRODUCTS = [
  {
    id: "2DTS-2Y-40S",
    slug: "may-nen-bitzer-2dts-2y-40s",
    name: "Máy Nén Bitzer 2DTS-2Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Máy nén bán kín 2 xi lanh, công suất cao.",
  },
  {
    id: "2DES-3Y-40S",
    slug: "may-nen-bitzer-2des-3y-40s",
    name: "Máy Nén Bitzer 2DES-3Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Máy nén bán kín 2 xi lanh, hiệu suất cao.",
  },
  {
    id: "4TES-9Y-40S",
    slug: "may-nen-bitzer-4tes-9y-40s",
    name: "Máy Nén Bitzer 4TES-9Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Máy nén 4 xi lanh, kho lạnh công nghiệp.",
  },
  {
    id: "4CES-6Y-40S",
    slug: "may-nen-bitzer-4ces-6y-40s",
    name: "Máy Nén Bitzer 4CES-6Y-40S",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Máy nén bán kín, tiết kiệm điện năng.",
  },
  {
    id: "HSK-5343-30",
    slug: "may-nen-truc-vit-bitzer-hsk-5343-30",
    name: "Máy Nén Trục Vít HSK-5343-30",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Máy nén trục vít công suất lớn.",
  },
  {
    id: "4FES-3Y",
    slug: "4fes-3y",
    name: "Bitzer 4FES-3Y",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Phụ tùng máy nén 4HP chính hãng.",
  },
  {
    id: "K013N008",
    slug: "k013n008",
    name: "Bitzer K013N008",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Phụ tùng máy nén 4HP chính hãng.",
  },
  {
    id: "GAS-R22",
    slug: "gas-r22",
    name: "Gas Lạnh R22",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Gas R22 dùng cho điều hòa và kho lạnh.",
  },
  {
    id: "GAS-R410A",
    slug: "gas-r410a",
    name: "Gas Lạnh R410A",
    image: "/images/products/bitzer-compressor-1.png",
    description: "Gas R410A thân thiện môi trường.",
  },
];
type ProductSuggestion = (typeof MOCK_PRODUCTS)[number];

function getProduct(code: string): ProductSuggestion | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === code);
}

const SUGGESTION_TOPICS = [
  { label: "Máy nén", key: "compressor" },
  { label: "Gas", key: "gas" },
  { label: "Giá", key: "price" },
  { label: "Sửa chữa", key: "repair" },
  { label: "Bảo hành", key: "warranty" },
  { label: "Khác", key: "other" },
];

type Message = { type: "user" | "bot"; content: string; products?: string[] };

export const Chatbot = () => {
  const { t } = useIntl();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleOpen = useCallback(() => {
    if (open) return;
    setOpen(true);
    setMessages([
      { type: "bot", content: t("Chào bạn! Tôi có thể giúp gì cho bạn?") },
    ]);
  }, [open, t]);

  const handleSendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { type: "user", content: trimmed }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const rule = getChatbotResponse(trimmed.toLowerCase());
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: rule.response, products: rule.products },
      ]);
    }, 600);
  }, []);

  const handleSelectTopic = useCallback((label: string, key: string) => {
    setSelectedTopic(key);
    setTyping(true);
    setMessages([{ type: "user", content: label }]);
    setTimeout(() => {
      setTyping(false);
      const rule = getChatbotResponse(key);
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: rule.response, products: rule.products },
      ]);
    }, 600);
  }, []);

  const handleReset = useCallback(() => {
    setSelectedTopic(null);
    setMessages([
      { type: "bot", content: t("Chào bạn! Tôi có thể giúp gì cho bạn?") },
    ]);
  }, [t]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setMessages([]);
    setInput("");
    setSelectedTopic(null);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  return (
    <Box position="fixed" bottom="6" right="6" zIndex="topmost">
      {!open ? (
        <Button
          size="lg"
          minH="0"
          p="4"
          onClick={handleOpen}
          className={css({
            borderRadius: "full",
            boxShadow: "0 8px 24px {colors.brand.500/0.4}",
            transition: "all 0.2s ease",
            _hover: {
              transform: "scale(1.08)",
              boxShadow: "0 12px 32px {colors.brand.500/0.5}",
            },
          })}
        >
          <RoundSpeechBubble tone="inverse" />
        </Button>
      ) : (
        <Stack
          bg="white"
          borderRadius="2xl"
          overflow="hidden"
          w="80"
          h={480}
          gap="0"
          className={css({
            boxShadow: "0 20px 60px token(colors.gray.900/0.15)",
            border: "1px solid token(colors.gray.100)",
          })}
        >
          <Flex
            bg="brand.500"
            alignItems="center"
            justifyContent="space-between"
            px="4"
            py="3"
            flexShrink={0}
          >
            <Flex alignItems="center" gap="2">
              <Box
                w="8"
                h="8"
                borderRadius="full"
                bg="white/20"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <RoundSpeechBubble tone="inverse" size="sm" />
              </Box>
              <Stack gap="0">
                <Text weight="bold" tone="inverse" variant="paragraph-2">
                  {t("Hỗ trợ tư vấn")}
                </Text>
                <Flex alignItems="center" gap="1">
                  <Box w="1.5" h="1.5" borderRadius="full" bg="brand.300" />
                  <Text
                    variant="caption-2"
                    tone="inverse"
                    className={css({ opacity: "0.8" })}
                  >
                    {t("Trực tuyến")}
                  </Text>
                </Flex>
              </Stack>
            </Flex>

            <Button
              onClick={handleClose}
              p="1.5"
              minH="0"
              className={css({
                bg: "white/15",
                borderRadius: "full",
                _hover: { bg: "white/30" },
              })}
            >
              <CrossDiagonal tone="inverse" size="sm" />
            </Button>
          </Flex>

          <Flex
            direction="column"
            flex="1"
            px="4"
            py="3"
            gap="3"
            overflowY="auto"
            minH="0"
            style={{ maxHeight: "280px" }}
          >
            {messages.map((msg, i) => (
              <Flex
                key={i}
                direction="column"
                alignItems={msg.type === "user" ? "flex-end" : "flex-start"}
                gap="2"
              >
                <Box
                  px="3"
                  py="2"
                  borderRadius="xl"
                  maxW="60"
                  bg={msg.type === "user" ? "brand.500" : "gray.100"}
                  className={css({
                    borderBottomRightRadius: msg.type === "user" ? "sm" : "xl",
                    borderBottomLeftRadius: msg.type === "bot" ? "sm" : "xl",
                  })}
                >
                  <Text
                    variant="paragraph-2"
                    tone={msg.type === "user" ? "inverse" : "primary"}
                    className={css({ lineHeight: "1.55" })}
                  >
                    {t(msg.content)}
                  </Text>
                </Box>

                {/* Product chips */}
                {msg.products && msg.products.length > 0 && (
                  <Stack gap="2" w="full">
                    {msg.products.map((code) => {
                      const product = getProduct(code);
                      if (!product) return null;
                      return (
                        <Link
                          key={code}
                          href={`/products/${product.slug}`}
                          className={css({
                            display: "block",
                            textDecoration: "none",
                            borderRadius: "xl",
                            overflow: "hidden",
                            border: "1.5px solid token(colors.gray.200)",
                            bg: "white",
                            transition: "all 0.2s ease",
                            _hover: {
                              borderColor: "brand.400",
                              boxShadow:
                                "0 4px 16px token(colors.brand.500/0.15)",
                              transform: "translateY(-1px)",
                            },
                          })}
                        >
                          <Flex alignItems="center" gap="0">
                            {/* Image */}
                            <Box
                              position="relative"
                              w="16"
                              h="16"
                              flexShrink={0}
                              bg="gray.100"
                            >
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: "cover" }}
                              />
                            </Box>

                            {/* Info */}
                            <Stack gap="0.5" px="3" py="2" flex="1" minW="0">
                              {/* Model code badge */}
                              <Box
                                display="inline-flex"
                                alignSelf="flex-start"
                                px="1.5"
                                py="0.5"
                                bg="brand.50"
                                borderRadius="md"
                              >
                                <Text
                                  variant="caption-2"
                                  weight="bold"
                                  tone="link"
                                  inline
                                >
                                  {code}
                                </Text>
                              </Box>
                              <Text
                                variant="caption-1"
                                weight="bold"
                                tone="primary"
                                className={css({
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                })}
                              >
                                {product.name}
                              </Text>
                              <Text
                                variant="caption-2"
                                tone="secondary"
                                className={css({
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                })}
                              >
                                {product.description}
                              </Text>
                            </Stack>

                            {/* Arrow */}
                            <Box pr="3" flexShrink={0} color="brand.500">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                              </svg>
                            </Box>
                          </Flex>
                        </Link>
                      );
                    })}
                  </Stack>
                )}
              </Flex>
            ))}

            {/* Typing indicator */}
            {typing && (
              <Flex justifyContent="flex-start">
                <Box
                  px="4"
                  py="3"
                  bg="gray.100"
                  borderRadius="xl"
                  borderBottomLeftRadius="sm"
                >
                  <Flex gap="1" alignItems="center">
                    {[0, 1, 2].map((i) => (
                      <Box
                        key={i}
                        w="1.5"
                        h="1.5"
                        borderRadius="full"
                        bg="gray.400"
                        className={css({
                          animation: "bounce-dot 1.2s ease-in-out infinite",
                        })}
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </Flex>
                </Box>
              </Flex>
            )}

            {/* Topic suggestions */}
            {!selectedTopic && !typing && (
              <Flex flexWrap="wrap" gap="1.5" mt="1">
                {SUGGESTION_TOPICS.map((topic) => (
                  <Button
                    variant="secondary"
                    key={topic.key}
                    onClick={() => handleSelectTopic(topic.label, topic.key)}
                    size="sm"
                  >
                    {topic.label}
                  </Button>
                ))}
              </Flex>
            )}

            <div ref={bottomRef} />
          </Flex>

          <Box
            px="3"
            py="3"
            borderTop="1px solid"
            borderColor="gray.100"
            bg="gray.50"
            flexShrink={0}
          >
            <Box mb="2">
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(input)}
                placeholder={t("Nhập tin nhắn...")}
                action={
                  <Button
                    onClick={() => handleSendMessage(input)}
                    p="2"
                    minH="0"
                    h="full"
                    className={css({
                      bg: "brand.500",
                      borderRadius: "full",
                      _hover: { bg: "brand.600" },
                    })}
                  >
                    <TravelNavigation tone="inverse" size="sm" />
                  </Button>
                }
              />
            </Box>

            <Flex justifyContent="center">
              <Button
                variant="none"
                onClick={handleReset}
                size="sm"
                className={css({
                  fontWeight: "normal",
                  color: "brand.500",
                  textDecoration: "underline",
                  fontSize: "xs",
                })}
              >
                {t("Đổi chủ đề")}
              </Button>
            </Flex>
          </Box>
        </Stack>
      )}
    </Box>
  );
};
