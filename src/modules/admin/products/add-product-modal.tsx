"use client";
import Button from "@/components/button";
import Text from "@/components/text";
import TextArea from "@/components/text-area";
import TextField from "@/components/text-field";
import { createProduct } from "@/lib/admin/manage/products";
import { CategoryDTO } from "@/types/api";
import { Box, Flex, Grid, Stack, styled } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorBox from "../layout/error-box";
import ModalBackdrop from "../layout/modal-backdrop";

interface Props {
  categories: CategoryDTO[];
  onClose: () => void;
  onSuccess: () => void;
}

const Select = styled("select", {
  base: {
    w: "full",
    border: "2px solid",
    borderColor: "border.default",
    borderRadius: "lg",
    px: "3",
    py: "2",
    fontSize: "sm",
    fontFamily: "body",
    bg: "gray.50",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.2s",
    _focus: { borderColor: "brand.500", bg: "white" },
    _hover: { borderColor: "gray.300" },
  },
});

export default function AddProductModal({
  categories,
  onClose,
  onSuccess,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    brief: "",
    description: "",
    price: "",
    stock: "0",
    categoryId: "",
  });
  const set = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const {
    mutate: handleSubmit,
    isPending,
    error,
  } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      onSuccess();
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <ModalBackdrop onClose={onClose}>
      <Stack gap="5">
        <Text variant="section-heading-2" weight="bold" tone="primary">
          Thêm sản phẩm mới
        </Text>
        <Grid columns={2} gap="4">
          <Box gridColumn="span 2">
            <TextField
              label="Tên sản phẩm *"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
            />
          </Box>
          <Box gridColumn="span 2">
            <TextField
              label="Slug (tự tạo nếu để trống)"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
            />
          </Box>
          <TextField
            label="Giá (VNĐ) *"
            value={form.price}
            type="number"
            min="0"
            onChange={(e) => set("price", e.target.value)}
          />
          <TextField
            label="Tồn kho"
            value={form.stock}
            type="number"
            min="0"
            onChange={(e) => set("stock", e.target.value)}
          />
          <Box gridColumn="span 2">
            <Stack gap="1">
              <Text variant="paragraph-2" tone="primary">
                Danh mục *
              </Text>
              <Select
                value={form.categoryId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  set("categoryId", e.target.value)
                }
              >
                <option value="">-- Chọn danh mục --</option>
                {categories
                  .filter((c) => c.isActive)
                  .map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
              </Select>
            </Stack>
          </Box>
          <Box gridColumn="span 2">
            <TextField
              label="Mô tả ngắn"
              value={form.brief}
              onChange={(e) => set("brief", e.target.value)}
            />
          </Box>
          <Box gridColumn="span 2">
            <TextArea
              label="Mô tả chi tiết"
              rows={4}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Box>
        </Grid>
        {error && <ErrorBox message={error.message} />}
        <Flex gap="3" justifyContent="flex-end">
          <Button variant="plain" onClick={onClose}>
            Hủy
          </Button>
          <Button
            variant="default"
            disabled={isPending}
            onClick={() =>
              handleSubmit({
                name: form.name,
                slug: form.slug,
                brief: form.brief,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                categoryId: form.categoryId,
              })
            }
          >
            {isPending ? "Đang lưu..." : "Thêm sản phẩm"}
          </Button>
        </Flex>
      </Stack>
    </ModalBackdrop>
  );
}
