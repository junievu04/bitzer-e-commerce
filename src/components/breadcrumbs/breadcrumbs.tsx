"use client";

import { ArrowRight } from "@/components/icons";
import Link from "@/components/link";
import Text from "@/components/text";
import { useIntl } from "@/utils/intl";
import { Flex } from "@/vendors/styled-system/jsx";
import { Fragment } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { t } = useIntl();

  const allItems: BreadcrumbItem[] = [
    { label: t("Trang chủ"), href: "/" },
    ...items,
  ];
  return (
    <Flex align="center" gap="2" flexWrap="wrap">
      {allItems.map((item, index) => {
        const isLast = index === allItems.length - 1;

        return (
          <Fragment key={index}>
            {item.href && !isLast ? (
              <Link href={item.href} tone="primary" size="sm" hover="none">
                {t(item.label)}
              </Link>
            ) : (
              <Text
                variant="caption-1"
                tone={isLast ? "link" : "secondary"}
                weight={isLast ? "medium" : "normal"}
              >
                {t(item.label)}
              </Text>
            )}
            {!isLast && <ArrowRight size="xs" tone="secondary" />}
          </Fragment>
        );
      })}
    </Flex>
  );
}
