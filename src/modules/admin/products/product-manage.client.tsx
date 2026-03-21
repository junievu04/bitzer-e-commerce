"use client";

import Button from "@/components/button";
import Skeleton from "@/components/skeleton";
import Text from "@/components/text";
import TextField from "@/components/text-field";
import { deleteProduct } from "@/lib/admin/manage/products";
import { CategoryDTO, ProductDetail } from "@/types/api";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ConfirmDialog from "../layout/confirm-dialog";
import ErrorBox from "../layout/error-box";
import AddProductModal from "./add-product-modal";
import EditProductModal from "./edit-product-modal";

const formatPrice = (price?: number) =>
  price === undefined
    ? "—"
    : new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

interface Props {
  initialProducts: ProductDetail[];
  initialCategories: CategoryDTO[];
}

export default function ProductClient({
  initialProducts,
  initialCategories,
}: Props) {
  const [products, setProducts] = useState<ProductDetail[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<ProductDetail | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const {
    mutate: handleDelete,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (data, id) => {
      if (data?.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function handleAdded() {
    window.location.reload();
  }

  function handleUpdated(id: string, price: number, stock: number) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price, stock } : p)),
    );
  }

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box p={{ base: "4", md: "8" }}>
      <Stack gap="6">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap="3"
        >
          <Stack gap="1">
            <Text variant="section-heading-1" weight="bold" tone="primary">
              Quản lý sản phẩm
            </Text>
            <Text variant="caption-1" tone="secondary">
              {filtered.length} sản phẩm
            </Text>
          </Stack>
          <Button variant="default" onClick={() => setShowAdd(true)}>
            + Thêm sản phẩm
          </Button>
        </Flex>

        <Box maxW="400px">
          <TextField
            placeholder="Tìm theo tên hoặc slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        {error && <ErrorBox message={error.message} />}

        <Box
          bg="white"
          borderRadius="xl"
          border="1px solid {colors.gray.200}"
          overflow="hidden"
        >
          <Flex
            px="4"
            py="3"
            bg="gray.50"
            borderBottom="1px solid {colors.gray.200}"
            display={{ base: "none", md: "flex" }}
          >
            <Box flex="2">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Sản phẩm
              </Text>
            </Box>
            <Box flex="1">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Danh mục
              </Text>
            </Box>
            <Box flex="1">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Giá
              </Text>
            </Box>
            <Box w="80px" textAlign="center">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Tồn kho
              </Text>
            </Box>
            <Box w="120px" />
          </Flex>

          {isPending ? (
            <Stack gap="0">
              {[1, 2, 3, 4, 5].map((i) => (
                <Flex
                  key={i}
                  px="4"
                  py="4"
                  gap="4"
                  alignItems="center"
                  borderBottom="1px solid {colors.gray.100}"
                >
                  <Skeleton flex="2" h="20px" />
                  <Skeleton flex="1" h="16px" />
                  <Skeleton flex="1" h="16px" />
                  <Skeleton w="60px" h="16px" />
                  <Skeleton w="110px" h="32px" borderRadius="md" />
                </Flex>
              ))}
            </Stack>
          ) : filtered.length === 0 ? (
            <Box px="4" py="12" textAlign="center">
              <Text tone="secondary">Không có sản phẩm nào</Text>
            </Box>
          ) : (
            filtered.map((product, i) => (
              <Flex
                key={product.id}
                px="4"
                py="3"
                borderBottom={
                  i < filtered.length - 1
                    ? "1px solid {colors.gray.100}"
                    : "none"
                }
                alignItems="center"
                gap={{ base: "2", md: "0" }}
                direction={{ base: "column", md: "row" }}
                className={css({ _hover: { bg: "gray.50" } })}
              >
                <Box flex="2">
                  <Text
                    variant="paragraph-2"
                    weight="medium"
                    tone="primary"
                    className={css({ truncate: true })}
                  >
                    {product.name}
                  </Text>
                  <Text variant="caption-2" tone="secondary">
                    {product.slug}
                  </Text>
                </Box>
                <Box flex="1">
                  <Text variant="caption-1" tone="secondary">
                    {product.category?.name ?? "—"}
                  </Text>
                </Box>
                <Box flex="1">
                  <Text variant="paragraph-2" weight="bold" tone="error">
                    {formatPrice(product.price)}
                  </Text>
                </Box>
                <Box w="80px" textAlign="center">
                  <Text
                    variant="paragraph-2"
                    tone={(product.stock ?? 0) > 0 ? "success" : "error"}
                  >
                    {product.stock ?? 0}
                  </Text>
                </Box>
                <Flex gap="2" w="120px" justifyContent="flex-end">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setEditing(product)}
                  >
                    Sửa
                  </Button>
                  <Button
                    variant="plain"
                    size="sm"
                    disabled={isPending}
                    onClick={() => setConfirmId(product.id)}
                    className={css({
                      color: "danger.base",
                      _hover: { bg: "danger.light" },
                    })}
                  >
                    {isPending ? "..." : "Xóa"}
                  </Button>
                </Flex>
              </Flex>
            ))
          )}
        </Box>
      </Stack>

      {showAdd && (
        <AddProductModal
          categories={initialCategories}
          onClose={() => setShowAdd(false)}
          onSuccess={handleAdded}
        />
      )}
      {editing && (
        <EditProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onSuccess={(price, stock) => {
            handleUpdated(editing.id, price, stock);
            setEditing(null);
          }}
        />
      )}

      <ConfirmDialog
        open={confirmId !== null}
        title="Xóa sản phẩm này?"
        description="Hành động này không thể hoàn tác."
        confirmLabel="Xóa"
        cancelLabel="Huỷ"
        danger
        onConfirm={() => {
          handleDelete(confirmId!);
          setConfirmId(null);
        }}
        onCancel={() => setConfirmId(null)}
      />
    </Box>
  );
}
