"use client";

import { useIntl } from "@/utils/intl";
import { Grid } from "@/vendors/styled-system/jsx";
import { HeaderTitleWrapper } from "../layout/header-title-wrapper";
import { CompanyInfomation } from "./company-infomation";
import { ContactForm } from "./contact-form";

export function ContactClient() {
  const { t } = useIntl();
  const breadcrumbItems = [{ label: t("Liên hệ") }];

  return (
    <HeaderTitleWrapper breadcrumbItems={breadcrumbItems} title={t("Liên hệ")}>
      <Grid columns={{ base: 1, lg: 2 }} gap="8">
        <CompanyInfomation />
        <ContactForm />
      </Grid>
    </HeaderTitleWrapper>
  );
}
