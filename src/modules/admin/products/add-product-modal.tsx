"use client";
import Button from "@/components/button";
import Text from "@/components/text";
import TextArea from "@/components/text-area";
import TextField from "@/components/text-field";
import NumberField from "@/components/text-field/number-field";
import { createProduct } from "@/lib/admin/manage/products";
import type { CategoryDTO, ProductSpecification } from "@/modules/products";
import type { ProductFormInput } from "@/types/server-actions";
import { buildSlug } from "@/utils/helpers/shared-helpers";
import { Box, Flex, Grid, Stack, styled } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ErrorBox from "../layout/error-box";
import ModalBackdrop from "../layout/modal-backdrop";
import SpecificationFields from "./specification-fields";

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

type Tab = "vi" | "en";

export default function AddProductModal({
  categories,
  onClose,
  onSuccess,
}: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("vi");
  const [form, setForm] = useState<ProductFormInput>({
    name: "",
    brief: "",
    description: "",
    images: "",
    price: 0,
    stock: 0,
    categoryId: "",
    specifications: [] as ProductSpecification[],
  });
  const [slugPreview, setSlugPreview] = useState("");
  const set = (key: string, val: string | number) =>
    setForm((f) => ({ ...f, [key]: val }));

  // EN state
  const [enName, setEnName] = useState("");
  const [enBrief, setEnBrief] = useState("");
  const [enDescription, setEnDescription] = useState("");
  const [enSpecifications, setEnSpecifications] = useState<
    ProductSpecification[]
  >([]);

  useEffect(() => {
    /// eslint-disable-next-line react-hooks/exhaustive-deps
    setSlugPreview(form.name ? buildSlug(form.name) : "");
  }, [form.name]);

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

        {/* Tab switcher */}
        <Flex gap="2">
          <Button
            variant={activeTab === "vi" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("vi")}
          >
            🇻🇳 Tiếng Việt
          </Button>
          <Button
            variant={activeTab === "en" ? "default" : "secondary"}
            size="sm"
            onClick={() => setActiveTab("en")}
          >
            🇬🇧 English
          </Button>
        </Flex>

        {/* Tab VI */}
        {activeTab === "vi" && (
          <Grid columns={2} gap="4">
            <Box gridColumn="span 2">
              <TextField
                label="Tên sản phẩm *"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </Box>
            <Box gridColumn="span 2">
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
                  minH="40px"
                >
                  {slugPreview}
                </Text>
              </Stack>
            </Box>
            <NumberField
              label="Giá (VNĐ) *"
              value={form.price}
              onChange={(val) => set("price", val)}
              suffix="₫"
            />
            <NumberField
              label="Tồn kho"
              value={form.stock}
              onChange={(val) => set("stock", val)}
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
              <TextArea
                label="Ảnh"
                value={form.images}
                message="Mỗi dòng = 1 URL ảnh, ảnh đầu tiên là thumbnail"
                onChange={(e) => set("images", e.target.value)}
              />
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
                rows={6}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
              />
            </Box>
            <Box gridColumn="span 2">
              <SpecificationFields
                value={form.specifications ?? []}
                onChange={(specs) =>
                  setForm((f) => ({ ...f, specifications: specs }))
                }
              />
            </Box>
          </Grid>
        )}

        {/* Tab EN — chỉ content fields */}
        {activeTab === "en" && (
          <Grid columns={1} gap="4">
            <TextField
              label="Name (EN)"
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
            />
            <TextField
              label="Brief (EN)"
              value={enBrief}
              onChange={(e) => setEnBrief(e.target.value)}
            />
            <TextArea
              label="Description (EN)"
              rows={6}
              value={enDescription}
              onChange={(e) => setEnDescription(e.target.value)}
            />
            <SpecificationFields
              value={enSpecifications}
              onChange={setEnSpecifications}
            />
          </Grid>
        )}

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
                brief: form.brief,
                description: form.description,
                price: Number(form.price),
                stock: Number(form.stock),
                categoryId: form.categoryId,
                specifications: form.specifications,
                images: form.images,
                translations: {
                  en: {
                    name: enName || undefined,
                    brief: enBrief || undefined,
                    description: enDescription || undefined,
                    specifications:
                      enSpecifications.length > 0
                        ? enSpecifications
                        : undefined,
                  },
                },
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
