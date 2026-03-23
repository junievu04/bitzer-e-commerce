"use client";
import Button from "@/components/button";
import Text from "@/components/text";
import TextArea from "@/components/text-area";
import NumberField from "@/components/text-field/number-field";
import { updateProduct } from "@/lib/admin/manage/products";
import type { ProductDetail } from "@/modules/products";
import { Flex, Grid, Stack } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorBox from "../layout/error-box";
import ModalBackdrop from "../layout/modal-backdrop";

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
  const {
    mutate: handleSubmit,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({
      slug,
      price,
      stock,
      description,
    }: {
      slug: string;
      price?: number;
      stock?: number;
      description?: string;
    }) => updateProduct(slug, { price, stock, description }),
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
                slug: product.slug,
                price: Number(price),
                stock: Number(stock),
                description,
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
