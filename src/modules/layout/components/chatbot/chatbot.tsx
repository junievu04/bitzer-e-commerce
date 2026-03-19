"use client";

import Button from "@/components/button/button";
import {
  ArrowRight,
  Chatbot as ChatbotIcon,
  CrossDiagonal,
  TravelNavigation,
} from "@/components/icons";
import { Image } from "@/components/image";
import Link from "@/components/link";
import Text from "@/components/text";
import TextField from "@/components/text-field";
import { DAITIN_IMAGE, INFO_COMPANY } from "@/constants";
import type { ProductCard, Service } from "@/types/api";
import { useIntl } from "@/utils/intl/use-intl";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  ChatbotData,
  ChatRule,
  Message,
  SuggestionProduct,
  SuggestionService,
  TopicKey,
} from "./chatbot.d";
import { CHATBOT_RULES, SUGGESTION_TOPICS } from "./constant";

interface ChatbotProps {
  data?: ChatbotData | null;
}

function getChatbotResponse(message: string): ChatRule {
  const lower = message.toLowerCase().trim();
  for (const rule of CHATBOT_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule;
    }
  }
  return {
    keywords: [],
    response: `"Vui lòng liên hệ hotline ${INFO_COMPANY.phone} hoặc chat trực tiếp qua Zalo/Messenger.`,
  };
}

function normalizeText(text?: string) {
  return (text ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function matchServiceByTopic(service: SuggestionService, topic: TopicKey) {
  const source = `${normalizeText(service.name)} ${normalizeText(service.brief)}`;
  if (topic === "repair") {
    return source.includes("sua chua") || source.includes("repair");
  }
  if (topic === "warranty") {
    return source.includes("bao tri") || source.includes("maintenance");
  }
  return false;
}

export default function Chatbot({ data }: ChatbotProps) {
  const { t } = useIntl();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topicMap = useMemo(
    () =>
      new Map<string, TopicKey>([
        ["compressor", "compressor"],
        ["gas", "gas"],
        ["repair", "repair"],
        ["warranty", "warranty"],
      ]),
    [],
  );

  const productSuggestionsByTopic = useMemo(
    () =>
      new Map<string, ProductCard[]>(
        (data?.suggestionProducts ?? []).map((item) => [
          item.topiKey,
          item.products,
        ]),
      ),
    [data],
  );
  const serviceSuggestionsByTopic = useMemo(
    () =>
      new Map<string, Service[]>(
        (data?.suggestionServices ?? []).map((item) => [
          item.topicKey,
          item.services,
        ]),
      ),
    [data],
  );

  const getTopicSuggestions = useCallback(
    (topic: TopicKey) => {
      const rawProducts = (productSuggestionsByTopic.get(topic) ??
        []) as SuggestionProduct[];
      const rawServices = (serviceSuggestionsByTopic.get(topic) ??
        []) as SuggestionService[];

      const services =
        topic === "repair" || topic === "warranty"
          ? rawServices.filter((service) => matchServiceByTopic(service, topic))
          : rawServices;

      return {
        products: rawProducts.slice(0, 2),
        services: services.slice(0, 2),
      };
    },
    [productSuggestionsByTopic, serviceSuggestionsByTopic],
  );
  const getFallbackLinkByTopic = useCallback(
    (topic?: TopicKey) => {
      if (!topic) return undefined;
      if (topic === "compressor" || topic === "gas") {
        return {
          link: "/products",
          label: t("Xem tất cả sản phẩm"),
        };
      }
      if (topic === "repair" || topic === "warranty") {
        return {
          link: "/services",
          label: t("Xem tất cả dịch vụ"),
        };
      }
      return undefined;
    },
    [t],
  );

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

  const handleSendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((prev) => [...prev, { type: "user", content: trimmed }]);
      setInput("");
      setTyping(true);
      setTimeout(() => {
        const rule = getChatbotResponse(trimmed.toLowerCase());
        const topic = rule.topic;
        const suggestions = topic
          ? getTopicSuggestions(topic)
          : { products: [], services: [] };
        const shouldShowFallback =
          !!topic &&
          suggestions.products.length === 0 &&
          suggestions.services.length === 0;
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: rule.response,
            suggestions,
            fallbackLink: shouldShowFallback
              ? getFallbackLinkByTopic(topic)
              : undefined,
          },
        ]);
      }, 600);
    },
    [getFallbackLinkByTopic, getTopicSuggestions],
  );

  const handleSelectTopic = useCallback(
    (label: string, key: string) => {
      setSelectedTopic(key);
      setTyping(true);
      setMessages([{ type: "user", content: label }]);
      setTimeout(() => {
        const rule = getChatbotResponse(key);
        const topic = topicMap.get(key);
        const suggestions = topic
          ? getTopicSuggestions(topic)
          : { products: [], services: [] };
        const shouldShowFallback =
          !!topic &&
          suggestions.products.length === 0 &&
          suggestions.services.length === 0;
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: rule.response,
            suggestions,
            fallbackLink: shouldShowFallback
              ? getFallbackLinkByTopic(topic)
              : undefined,
          },
        ]);
      }, 600);
    },
    [getFallbackLinkByTopic, getTopicSuggestions, topicMap],
  );

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
        <Box
          minH="0"
          p="4"
          onClick={handleOpen}
          bg="warning.base"
          borderRadius="full"
          cursor="pointer"
          className={css({
            shadow: "0 8px 24px token(colors.warning.light/0.4)",
            transition: "all 0.2s ease",
            _hover: {
              opacity: "0.88",
              transform: "scale(1.08)",
              boxShadow: "0 12px 32px token(colors.warning.light/0.5)",
            },
          })}
        >
          <ChatbotIcon tone="inverse" />
        </Box>
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
            bg="warning.base"
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
                <ChatbotIcon tone="inverse" size="sm" />
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
              variant="none"
              onClick={handleClose}
              p="1.5"
              minH="0"
              _hover={{ bg: "warning.base" }}
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
                  bg={msg.type === "user" ? "warning.base" : "gray.100"}
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

                {/* Product and service chips */}
                {msg.suggestions &&
                  (msg.suggestions.products.length > 0 ||
                    msg.suggestions.services.length > 0) && (
                    <Stack gap="2" w="full">
                      {msg.suggestions.products.map((product) => (
                        <Link
                          key={product.id}
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
                              borderColor: "warning.base",
                              boxShadow:
                                "0 4px 16px token(colors.warning.base/0.15)",
                              transform: "translateY(-1px)",
                            },
                          })}
                        >
                          <Flex alignItems="center" gap="0" px="1">
                            <Box
                              position="relative"
                              w="16"
                              h="16"
                              flexShrink={0}
                              bg="gray.100"
                            >
                              <Image
                                aspectRatio="1/1"
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                src={product.images?.[0] || DAITIN_IMAGE}
                                alt={product.name}
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                            <Stack gap="0.5" px="3" py="2" flex="1" minW="0">
                              <Text
                                variant="caption-2"
                                weight="bold"
                                tone="link"
                                inline
                              >
                                {product.slug}
                              </Text>
                              <Text
                                variant="caption-1"
                                weight="bold"
                                truncate={1}
                              >
                                {product.name}
                              </Text>
                              <Text
                                variant="caption-2"
                                tone="secondary"
                                truncate={1}
                              >
                                {t("Nhấn để xem chi tiết sản phẩm")}
                              </Text>
                            </Stack>
                            <ArrowRight
                              pr="3"
                              flexShrink={0}
                              tone="warning"
                              size="sm"
                            />
                          </Flex>
                        </Link>
                      ))}
                      {msg.suggestions.services.map((service) => (
                        <Link
                          key={service.id}
                          href={`/services/${service.slug}`}
                          className={css({
                            display: "block",
                            textDecoration: "none",
                            borderRadius: "xl",
                            overflow: "hidden",
                            border: "1.5px solid token(colors.gray.200)",
                            bg: "white",
                            transition: "all 0.2s ease",
                            _hover: {
                              borderColor: "warning.base",
                              boxShadow:
                                "0 4px 16px token(colors.warning.base/0.15)",
                              transform: "translateY(-1px)",
                            },
                          })}
                        >
                          <Flex alignItems="center" gap="0" px="1">
                            <Box
                              position="relative"
                              w="16"
                              h="16"
                              flexShrink={0}
                              bg="gray.100"
                            >
                              <Image
                                aspectRatio="1/1"
                                width="100%"
                                height="100%"
                                objectFit="cover"
                                src={service.thumbnail || DAITIN_IMAGE}
                                alt={service.name}
                                style={{ objectFit: "cover" }}
                              />
                            </Box>
                            <Stack gap="0.5" px="3" py="2" flex="1" minW="0">
                              <Text
                                variant="caption-2"
                                weight="bold"
                                tone="link"
                                inline
                              >
                                {t("Dịch vụ")}
                              </Text>
                              <Text
                                variant="caption-1"
                                weight="bold"
                                truncate={1}
                              >
                                {service.name}
                              </Text>
                              <Text
                                variant="caption-2"
                                tone="secondary"
                                truncate={1}
                              >
                                {service.brief ||
                                  t("Nhấn để xem chi tiết dịch vụ")}
                              </Text>
                            </Stack>
                            <ArrowRight
                              pr="3"
                              flexShrink={0}
                              tone="warning"
                              size="sm"
                            />
                          </Flex>
                        </Link>
                      ))}
                    </Stack>
                  )}
                {msg.fallbackLink && (
                  <Link
                    href={msg.fallbackLink.link}
                    display="flex"
                    alignItems="center"
                    gap="1"
                    px="3"
                    py="2"
                    borderRadius="lg"
                    border="1px solid token(colors.warning.base)"
                    _hover={{ bg: "warning.light" }}
                  >
                    <Text variant="caption-1" tone="warning" inline>
                      {msg.fallbackLink.label}
                    </Text>
                    <ArrowRight tone="warning" size="sm" />
                  </Link>
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
                    variant="none"
                    border="1px solid {colors.warning.base}"
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
                    variant="none"
                    onClick={() => handleSendMessage(input)}
                    p="2"
                    minH="0"
                    h="full"
                    className={css({
                      bgColor: "warning.base",
                      borderRadius: "full",
                      _hover: { bg: "warning.base" },
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
                  color: "warning.base",
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
}
