"use client";

import Button from "@/components/button";
import Text from "@/components/text";
import TextArea from "@/components/text-area";
import TextField from "@/components/text-field";
import { createService, updateService } from "@/lib/admin/manage/services";
import type { ServiceDetail } from "@/modules/services";
import { ServiceFormInput } from "@/types/server-actions";
import { Flex, Stack } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorBox from "../layout/error-box";
import ModalBackdrop from "../layout/modal-backdrop";

interface Props {
  service?: ServiceDetail | null;
  onClose: () => void;
  onSuccess: (data: ServiceDetail) => void;
}

export default function ServiceModal({ service, onClose, onSuccess }: Props) {
  const isEdit = !!service;
  const [form, setForm] = useState({
    name: service?.name ?? "",
    slug: service?.slug ?? "",
    brief: service?.brief ?? "",
    description: (service?.description ?? []).join("\n"),
    features: (service?.features ?? []).join("\n"),
  });
  const [localError, setLocalError] = useState("");
  const set = (key: string, val: string) =>
    setForm((f) => ({ ...f, [key]: val }));

  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: ServiceFormInput) =>
      isEdit ? updateService(service!.id, payload) : createService(payload),
    onSuccess: (res) => {
      if (!res.success || !res.data) return;
      onSuccess(res.data);
      onClose();
    },
  });

  function handleSubmit() {
    if (!form.name.trim()) {
      setLocalError("Tên dịch vụ không được trống");
      return;
    }
    setLocalError("");
    mutate({
      name: form.name,
      slug: form.slug,
      brief: form.brief,
      description: form.description,
      features: form.features,
    });
  }

  const displayError =
    localError || (error instanceof Error ? error.message : "");

  return (
    <ModalBackdrop onClose={onClose}>
      <Stack gap="5">
        <Text variant="section-heading-2" weight="bold" tone="primary">
          {isEdit ? "Cập nhật dịch vụ" : "Thêm dịch vụ mới"}
        </Text>
        <Stack gap="4">
          <TextField
            label="Tên dịch vụ *"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
          <TextField
            label="Slug (tự tạo nếu để trống)"
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
          />
          <TextField
            label="Mô tả ngắn"
            value={form.brief}
            onChange={(e) => set("brief", e.target.value)}
          />
          <TextArea
            label="Mô tả chi tiết"
            message="Mỗi dòng = 1 đoạn văn"
            rows={5}
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
          />
          <TextArea
            label="Điểm nổi bật (features)"
            message="Mỗi dòng = 1 điểm nổi bật"
            rows={4}
            value={form.features}
            onChange={(e) => set("features", e.target.value)}
          />
        </Stack>
        {displayError && <ErrorBox message={displayError} />}
        <Flex gap="3" justifyContent="flex-end">
          <Button variant="plain" onClick={onClose}>
            Hủy
          </Button>
          <Button variant="default" disabled={isPending} onClick={handleSubmit}>
            {isPending ? "Đang lưu..." : isEdit ? "Cập nhật" : "Thêm dịch vụ"}
          </Button>
        </Flex>
      </Stack>
    </ModalBackdrop>
  );
}
