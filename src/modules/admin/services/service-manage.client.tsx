"use client";

import Button from "@/components/button";
import Skeleton from "@/components/skeleton";
import Text from "@/components/text";
import { deleteService } from "@/lib/admin/manage/services";
import ConfirmDialog from "@/modules/admin/layout/confirm-dialog";
import type { ServiceDetail } from "@/modules/services";
import { css } from "@/vendors/styled-system/css";
import { Box, Flex, Stack } from "@/vendors/styled-system/jsx";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import ErrorBox from "../layout/error-box";
import ServiceModal from "./service-modal";

interface Props {
  initialServices?: ServiceDetail[] | null;
}

export default function ServiceManageClient({ initialServices }: Props) {
  const [services, setServices] = useState<ServiceDetail[]>(
    initialServices ?? [],
  );
  const [editing, setEditing] = useState<ServiceDetail | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { mutate: doDelete, error: deleteError } = useMutation({
    mutationFn: (id: string) => {
      setDeletingId(id);
      return deleteService(id);
    },
    onSuccess: (res, id) => {
      setDeletingId(null);
      if (res.success) setServices((prev) => prev.filter((s) => s.id !== id));
    },
    onError: () => setDeletingId(null),
  });

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
              Quản lý dịch vụ
            </Text>
            <Text variant="caption-1" tone="secondary">
              {services.length} dịch vụ
            </Text>
          </Stack>
          <Button variant="default" onClick={() => setShowAdd(true)}>
            + Thêm dịch vụ
          </Button>
        </Flex>

        {deleteError && (
          <ErrorBox
            message={
              deleteError instanceof Error
                ? deleteError.message
                : "Lỗi không xác định"
            }
          />
        )}

        <Stack gap="3">
          {services.length === 0 ? (
            <Box
              bg="white"
              borderRadius="xl"
              border="1px solid {colors.gray.200}"
              py="12"
              textAlign="center"
            >
              <Text tone="secondary">Chưa có dịch vụ nào</Text>
            </Box>
          ) : (
            services.map((svc) => (
              <Box
                key={svc.id}
                bg="white"
                borderRadius="xl"
                border="1px solid {colors.gray.200}"
                p="4"
                className={css({
                  transition: "all 0.15s",
                  _hover: { borderColor: "brand.200" },
                })}
              >
                <Flex alignItems="flex-start" gap="4" flexWrap="wrap">
                  <Stack gap="1" flex="1">
                    <Text variant="paragraph-1" weight="bold" tone="primary">
                      {svc.name}
                    </Text>
                    <Text variant="caption-1" tone="secondary">
                      {svc.slug}
                    </Text>
                    {svc.brief && (
                      <Text
                        variant="caption-1"
                        tone="secondary"
                        className={css({ mt: "1" })}
                      >
                        {svc.brief}
                      </Text>
                    )}
                    {(svc.features ?? []).length > 0 && (
                      <Flex gap="1" flexWrap="wrap" mt="1">
                        {(svc.features ?? []).slice(0, 3).map((f, i) => (
                          <Box
                            key={i}
                            px="2"
                            py="0.5"
                            borderRadius="full"
                            bg="brand.50"
                            border="1px solid {colors.brand.200}"
                          >
                            <Text variant="caption-2" tone="link">
                              {f}
                            </Text>
                          </Box>
                        ))}
                        {(svc.features ?? []).length > 3 && (
                          <Text variant="caption-2" tone="secondary">
                            +{(svc.features ?? []).length - 3}
                          </Text>
                        )}
                      </Flex>
                    )}
                  </Stack>
                  <Flex gap="2" flexShrink={0}>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setEditing(svc)}
                    >
                      Sửa
                    </Button>
                    <Button
                      variant="plain"
                      size="sm"
                      disabled={deletingId === svc.id}
                      onClick={() => setConfirmId(svc.id)}
                      className={css({
                        color: "danger.base",
                        _hover: { bg: "danger.light" },
                      })}
                    >
                      {deletingId === svc.id ? (
                        <Skeleton w="24px" h="16px" />
                      ) : (
                        "Xóa"
                      )}
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))
          )}
        </Stack>
      </Stack>

      {showAdd && (
        <ServiceModal
          onClose={() => setShowAdd(false)}
          onSuccess={(newSvc) => {
            setServices((prev) => [newSvc, ...prev]);
            setShowAdd(false);
          }}
        />
      )}

      {editing && (
        <ServiceModal
          service={editing}
          onClose={() => setEditing(null)}
          onSuccess={(updated) => {
            setServices((prev) =>
              prev.map((s) => (s.id === updated.id ? updated : s)),
            );
            setEditing(null);
          }}
        />
      )}

      <ConfirmDialog
        open={confirmId !== null}
        title="Xóa dịch vụ này?"
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
