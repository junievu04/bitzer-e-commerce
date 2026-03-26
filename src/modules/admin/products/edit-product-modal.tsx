"use client";
import Button from "@/components/button";
import Text from "@/components/text";
import TextArea from "@/components/text-area";
import NumberField from "@/components/text-field/number-field";
import { updateProduct } from "@/lib/admin/manage/products";
import type {
  ProductDetail,
  ProductSpecification,
  ProductTranslation,
} from "@/modules/products";
import { Flex, Grid, Stack } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorBox from "../layout/error-box";
import ModalBackdrop from "../layout/modal-backdrop";
import SpecificationFields from "./specification-fields";
import { cleanSpecs } from "./utils/clean-specifications";

type Tab = "vi" | "en";

export default function EditProductModal({
  product,
  onClose,
  onSuccess,
}: {
  product: ProductDetail;
  onClose: () => void;
  onSuccess: (price: number, stock: number) => void;
}) {
  const [price, setPrice] = useState(product.price ?? 0);
  const [stock, setStock] = useState(product.stock ?? 0);
  const [description, setDescription] = useState(product.description ?? "");
  const [images, setImages] = useState(product.images?.join("\n") ?? "");
  const [specifications, setSpecifications] = useState(
    product.specifications ?? [],
  );
  const [activeTab, setActiveTab] = useState<Tab>("vi");

  const [enName, setEnName] = useState(product.translations?.en?.name ?? "");
  const [enBrief, setEnBrief] = useState(product.translations?.en?.brief ?? "");
  const [enDescription, setEnDescription] = useState(
    product.translations?.en?.description ?? "",
  );
  const [enSpecifications, setEnSpecifications] = useState<
    ProductSpecification[]
  >(product.translations?.en?.specifications ?? []);
  const {
    mutate: handleSubmit,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      id,
      price,
      stock,
      description,
      images,
      specifications,
      translations,
    }: {
      id: string;
      price?: number;
      stock?: number;
      description?: string;
      images?: string;
      specifications?: ProductSpecification[];
      translations?: Record<string, ProductTranslation>;
    }) =>
      updateProduct(id, {
        price,
        stock,
        description,
        images,
        specifications,
        translations,
      }),
    onSuccess: () => {
      onSuccess(Number(price), Number(stock));
      onClose();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <ModalBackdrop onClose={onClose}>
      <Stack gap="5">
        <Stack gap="1">
          <Text variant="section-heading-2" weight="bold" tone="primary">
            Cập nhật sản phẩm
          </Text>
          <Text variant="caption-1" tone="secondary">
            {product.name}
          </Text>
        </Stack>

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

        {/* Tab VI — giữ nguyên hoàn toàn */}
        {activeTab === "vi" && (
          <Grid columns={1} gap="4">
            <NumberField
              label="Giá (VNĐ)"
              value={price}
              onChange={setPrice}
              suffix="₫"
            />
            <NumberField label="Tồn kho" value={stock} onChange={setStock} />
            <TextArea
              label="Mô tả"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextArea
              label="Ảnh"
              value={images}
              message="Mỗi dòng = 1 URL ảnh, ảnh đầu tiên là thumbnail"
              onChange={(e) => setImages(e.target.value)}
            />
            <SpecificationFields
              value={specifications}
              onChange={setSpecifications}
            />
          </Grid>
        )}

        {/* Tab EN — chỉ có content fields */}
        {activeTab === "en" && (
          <Grid columns={1} gap="4">
            <TextArea
              label="Name (EN)"
              value={enName}
              onChange={(e) => setEnName(e.target.value)}
            />
            <TextArea
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
                id: product.id,
                price: Number(price),
                stock: Number(stock),
                description,
                images,
                specifications: cleanSpecs(specifications ?? []),
                translations: {
                  en: {
                    name: enName || undefined,
                    brief: enBrief || undefined,
                    description: enDescription || undefined,
                    specifications: cleanSpecs(enSpecifications) || undefined,
                  },
                },
              })
            }
          >
            {isPending ? "Đang lưu..." : "Cập nhật"}
          </Button>
        </Flex>
      </Stack>
    </ModalBackdrop>
  );
}
