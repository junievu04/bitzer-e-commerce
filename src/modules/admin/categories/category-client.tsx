"use client";
import Button from "@/components/button";
import Skeleton from "@/components/skeleton";
import Text from "@/components/text";
import { useMutation } from "@/hooks/use-mutate";
import { deleteCategory } from "@/lib/admin/manage/categories";
import type { CategoryDTO } from "@/modules/products";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { useState } from "react";
import ConfirmDialog from "../layout/confirm-dialog";
import ErrorBox from "../layout/error-box";
import AddCategoryModal from "./add-catgegory-modal";

interface Props {
  categories?: CategoryDTO[] | null;
}

export default function CategoryClient({
  categories: initialCategories,
}: Props) {
  const [categories, setCategories] = useState<CategoryDTO[]>(
    initialCategories ?? [],
  );
  const [showAdd, setShowAdd] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  function handleAdded(cat: CategoryDTO) {
    setCategories((prev) => [cat, ...prev]);
  }

  const {
    mutate: doDelete,
    isPending: isDeleting,
    error: deleteError,
    reset: resetDelete,
  } = useMutation(deleteCategory);

  async function handleDelete(id: string) {
    resetDelete();
    const res = await doDelete(id);
    if (res?.success) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
    }
  }

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
              Quản lý danh mục
            </Text>
            <Text variant="caption-1" tone="secondary">
              {categories.length} danh mục
            </Text>
          </Stack>
          <Button variant="default" onClick={() => setShowAdd(true)}>
            + Thêm danh mục
          </Button>
        </Flex>

        {deleteError && <ErrorBox message={deleteError} />}

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
            <Box flex="1">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Tên danh mục
              </Text>
            </Box>
            <Box flex="1">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Slug
              </Text>
            </Box>
            <Box flex="1">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Mô tả
              </Text>
            </Box>
            <Box w="80px" textAlign="center">
              <Text variant="caption-1" weight="bold" tone="secondary">
                Trạng thái
              </Text>
            </Box>
            <Box w="80px" />
          </Flex>

          {isDeleting ? (
            <Stack gap="0">
              {[1, 2, 3].map((i) => (
                <Flex
                  key={i}
                  px="4"
                  py="4"
                  gap="4"
                  alignItems="center"
                  borderBottom="1px solid {colors.gray.100}"
                >
                  <Skeleton flex="1" h="20px" />
                  <Skeleton flex="1" h="16px" />
                  <Skeleton flex="1" h="16px" />
                  <Skeleton w="60px" h="20px" />
                  <Skeleton w="60px" h="32px" borderRadius="md" />
                </Flex>
              ))}
            </Stack>
          ) : categories.length === 0 ? (
            <Box px="4" py="12" textAlign="center">
              <Text tone="secondary">Chưa có danh mục nào</Text>
            </Box>
          ) : (
            categories.map((cat, i) => (
              <Flex
                key={cat.id}
                px="4"
                py="3"
                borderBottom={
                  i < categories.length - 1
                    ? "1px solid {colors.gray.100}"
                    : "none"
                }
                alignItems="center"
                className={css({ _hover: { bg: "gray.50" } })}
              >
                <Box flex="1">
                  <Text variant="paragraph-2" weight="medium" tone="primary">
                    {cat.name}
                  </Text>
                </Box>
                <Box flex="1">
                  <Text variant="caption-1" tone="secondary">
                    {cat.slug}
                  </Text>
                </Box>
                <Box flex="1">
                  <Text
                    variant="caption-1"
                    tone="secondary"
                    className={css({ truncate: true })}
                  >
                    {cat.description ?? "—"}
                  </Text>
                </Box>
                <Box w="80px" textAlign="center">
                  <Box
                    display="inline-flex"
                    px="2"
                    py="0.5"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="medium"
                    bg={cat.isActive ? "brand.100" : "gray.100"}
                    color={cat.isActive ? "brand.700" : "gray.500"}
                  >
                    {cat.isActive ? "Hiện" : "Ẩn"}
                  </Box>
                </Box>
                <Box w="80px" textAlign="right">
                  <Button
                    variant="plain"
                    size="sm"
                    disabled={isDeleting}
                    onClick={() => setConfirmId(cat.id)}
                    className={css({
                      color: "danger.base",
                      _hover: { bg: "danger.light" },
                    })}
                  >
                    {isDeleting ? "..." : "Xóa"}
                  </Button>
                </Box>
              </Flex>
            ))
          )}
        </Box>
      </Stack>

      {showAdd && (
        <AddCategoryModal
          onClose={() => setShowAdd(false)}
          onSuccess={handleAdded}
        />
      )}

      <ConfirmDialog
        open={confirmId !== null}
        title="Xóa danh mục này?"
        description="Chỉ xóa được nếu không còn sản phẩm nào thuộc danh mục."
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
