"use client";

import type { Service } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { HeaderTitleWrapper } from "../layout/components/header-title-wrapper";
import ServiceList from "./service-list";

export default function ServicesClient({
  services,
}: {
  services: Service[] | null;
}) {
  const { t } = useIntl();

  const breadcrumbItems = [{ label: t("Dịch vụ"), href: "/services" }];

  return (
    <HeaderTitleWrapper
      breadcrumbItems={breadcrumbItems}
      title={t("Dịch vụ của chúng tôi")}
      description={t(
        "Chúng tôi cung cấp các dịch vụ chuyên nghiệp cho máy nén Bitzer, từ bảo trì định kỳ đến lắp đặt hệ thống hoàn chỉnh. Đội ngũ kỹ thuật viên giàu kinh nghiệm cam kết mang đến giải pháp tối ưu cho quý khách hàng.",
      )}
    >
      <ServiceList services={services} />
    </HeaderTitleWrapper>
  );
}
