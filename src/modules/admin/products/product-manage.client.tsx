"use client";

import Button from "@/components/button";
import Text from "@/components/text";
import { useToast } from "@/components/toast";
import { deleteProduct, type ProductPage } from "@/lib/admin/manage/products";
import ConfirmDialog from "@/modules/admin/layout/confirm-dialog";
import type { CategoryDTO, ProductDetail } from "@/modules/products";
import { formatPrice } from "@/utils/helpers/shared-helpers";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import SkeletonRows from "../layout/skeleton-list";
import AddProductModal from "./add-product-modal";
import EditProductModal from "./edit-product-modal";
import ProductPagination from "./product-pagination";
interface Props {
  initialData: ProductPage;
  initialCategories: CategoryDTO[];
}

export default function ProductManageClient({
  initialData,
  initialCategories,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showSuccess, showError, toastElement } = useToast();

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<ProductDetail | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function navigate(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) params.set("page", String(page));
    else params.delete("page");
    startTransition(() => {
      router.push(`/admin/products?${params.toString()}`, { scroll: false });
    });
  }

  function refreshCurrentPage() {
    startTransition(() => router.refresh());
  }

  const { mutate: doDelete } = useMutation({
    mutationFn: (id: string) => {
      setDeletingId(id);
      return deleteProduct(id);
    },
    onSuccess: (res) => {
      setDeletingId(null);
      if (res.success) {
        showSuccess("Xóa sản phẩm thành công");
        refreshCurrentPage();
      } else {
        showError(res.error ?? "Xóa thất bại");
      }
    },
    onError: (e) => {
      setDeletingId(null);
      showError(e instanceof Error ? e.message : "Lỗi không xác định");
    },
  });

  return (
    <Box p={{ base: "4", md: "8" }}>
      {toastElement}
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
              {initialData.total} sản phẩm
            </Text>
          </Stack>
          <Button variant="default" onClick={() => setShowAdd(true)}>
            + Thêm sản phẩm
          </Button>
        </Flex>

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

          {initialData.products.length === 0 ? (
            <Box px="4" py="12" textAlign="center">
              <Text tone="secondary">Không có sản phẩm nào</Text>
            </Box>
          ) : isPending ? (
            <SkeletonRows />
          ) : (
            initialData.products.map((product, i) => (
              <Flex
                key={product.id}
                px="4"
                py="3"
                borderBottom={
                  i < initialData.products.length - 1
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
                    disabled={deletingId === product.id}
                    onClick={() => setConfirmId(product.id)}
                    className={css({
                      color: "danger.base",
                      _hover: { bg: "danger.light" },
                    })}
                  >
                    {deletingId === product.id ? "..." : "Xóa"}
                  </Button>
                </Flex>
              </Flex>
            ))
          )}
        </Box>

        <ProductPagination
          page={initialData.page}
          totalPages={initialData.totalPages}
          total={initialData.total}
          pageSize={initialData.pageSize}
          hasNext={initialData.hasNext}
          hasPrev={initialData.hasPrev}
          onPageChange={navigate}
        />
      </Stack>

      {showAdd && (
        <AddProductModal
          categories={initialCategories}
          onClose={() => setShowAdd(false)}
          onSuccess={() => {
            setShowAdd(false);
            showSuccess("Thêm sản phẩm thành công");
            navigate(1);
          }}
        />
      )}

      {editing && (
        <EditProductModal
          product={editing}
          onClose={() => setEditing(null)}
          onSuccess={() => {
            setEditing(null);
            showSuccess("Cập nhật sản phẩm thành công");
            refreshCurrentPage();
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
          doDelete(confirmId!);
          setConfirmId(null);
        }}
        onCancel={() => setConfirmId(null)}
      />
    </Box>
  );
}
