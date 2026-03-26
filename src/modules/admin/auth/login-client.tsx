"use client";

import Button from "@/components/button";
import { Image } from "@/components/image";
import Text from "@/components/text";
import TextField from "@/components/text-field";
import { INFO_COMPANY, LOGO_IMAGE } from "@/constants";
import { Box, Stack } from "@/vendors/styled-system/jsx";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsSubmitting(false);

    if (result?.error) {
      setErrorMessage("Sai tài khoản hoặc mật khẩu admin.");
      return;
    }

    router.push(result?.url ?? callbackUrl);
    router.refresh();
  }

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px="4"
    >
      <Box
        bg="white"
        borderRadius="2xl"
        border="1px solid {colors.gray.200}"
        p={{ base: "6", md: "10" }}
        w="full"
        maxW="420px"
        boxShadow="0 4px 24px {colors.gray.900/0.08}"
      >
        <Stack gap="6">
          {/* Header */}
          <Stack gap="1" alignItems="center">
            <Box
              w="12"
              h="12"
              borderRadius="xl"
              bg="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              mb="2"
            >
              <Image
                src={LOGO_IMAGE}
                alt={INFO_COMPANY.shortName}
                width="10"
                height="10"
                borderRadius="lg"
              />
            </Box>
            <Text variant="section-heading-1" weight="bold" tone="primary">
              Admin Dashboard
            </Text>
            <Text variant="paragraph-2" tone="secondary">
              Đăng nhập để quản lý hệ thống
            </Text>
          </Stack>

          {/* Form */}
          <Stack gap="4" as="form" onSubmit={handleSubmit}>
            <TextField
              label="Tên đăng nhập"
              placeholder="Nhập tên đăng nhập"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
            <TextField
              label="Mật khẩu"
              placeholder="Nhập mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            {errorMessage && (
              <Box
                bg="danger.light"
                borderRadius="md"
                px="3"
                py="2"
                border="1px solid {colors.danger.base}"
              >
                <Text variant="caption-1" tone="error">
                  {errorMessage}
                </Text>
              </Box>
            )}

            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
