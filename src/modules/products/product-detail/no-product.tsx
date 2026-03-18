"use client";
import { ArrowLeft } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Box } from "@/vendors/styled-system/jsx";

export default function NoProduct() {
  const { t } = useIntl();
  return (
    <Box py="10" px="3">
      <Text variant="section-heading-1" tone="primary">
        {t("Không tìm thấy sản phẩm")}
      </Text>
      <Box mt="4" display="flex" justifyContent="center">
        <Link href="/products" tone="link">
          <Text tone="success" display="flex" alignItems="center" gap="1">
            <ArrowLeft tone="success" />
            {t("Quay lại danh sách sản phẩm")}
          </Text>
        </Link>
      </Box>
    </Box>
  );
}
