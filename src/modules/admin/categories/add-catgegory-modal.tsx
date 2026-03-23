"use client";
import Button from "@/components/button";
import Text from "@/components/text";
import TextField from "@/components/text-field";
import { useMutation } from "@/hooks/use-mutate";
import { createCategory } from "@/lib/admin/manage/categories";
import type { CategoryDTO } from "@/modules/products";
import { buildBaseSlug } from "@/utils/helpers/shared-helpers";
import { Flex, Stack } from "@/vendors/styled-system/jsx";
import { useEffect, useState } from "react";
import ErrorBox from "../layout/error-box";
import ModalBackdrop from "../layout/modal-backdrop";

export default function AddCategoryModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: (cat: CategoryDTO) => void;
}) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    /// eslint-disable-next-line react-hooks/exhaustive-deps
    setSlug(name ? buildBaseSlug(name) : "");
  }, [name]);

  const {
    mutate,
    isPending,
    error: mutationError,
  } = useMutation(createCategory);

  async function handleSubmit() {
    if (!name.trim()) {
      setLocalError("Tên danh mục không được trống");
      return;
    }
    setLocalError("");

    const res = await mutate({
      name: name.trim(),
      description: description.trim(),
      isActive: true,
    });

    if (!res?.success) return;
    onSuccess({
      id: Date.now().toString(),
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      isActive: true,
    });
    onClose();
  }

  const error = localError || mutationError;

  return (
    <ModalBackdrop onClose={onClose}>
      <Stack gap="5">
        <Text variant="section-heading-2" weight="bold" tone="primary">
          Thêm danh mục mới
        </Text>
        <Stack gap="4">
          <TextField
            label="Tên danh mục *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {slug && (
            <Stack gap="1">
              <Text variant="caption-1" weight="medium" tone="secondary">
                Slug (tự tạo)
              </Text>
              <Text
                variant="caption-1"
                tone="secondary"
                fontFamily="mono"
                bg="gray.50"
                px="3"
                py="2"
                borderRadius="md"
                border="1px solid {colors.gray.200}"
              >
                {slug}
              </Text>
            </Stack>
          )}
          <TextField
            label="Mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
        {error && <ErrorBox message={error} />}
        <Flex gap="3" justifyContent="flex-end">
          <Button variant="plain" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="default" disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Đang lưu..." : "Thêm danh mục"}
          </Button>
        </Flex>
      </Stack>
    </ModalBackdrop>
  );
}
