import Breadcrumbs from "@/components/breadcrumbs";
import { BreadcrumbItem } from "@/components/breadcrumbs/breadcrumbs";
import Text from "@/components/text";
import { Box, Divider } from "@/vendors/styled-system/jsx";
import React from "react";

interface HeaderTitleProps {
  breadcrumbItems: BreadcrumbItem[];
  children: React.ReactNode;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
}

export const HeaderTitleWrapper = ({
  breadcrumbItems,
  title,
  children,
  description,
}: HeaderTitleProps) => {
  return (
    <Box py="6" px="3">
      <Box mb="6">
        <Breadcrumbs items={breadcrumbItems} />
      </Box>

      {(title || description) && (
        <Box textAlign="center">
          {title && (
            <>
              <Text variant="section-heading-1" weight="bold" tone="primary">
                {title}
              </Text>
              <Divider
                w="16"
                h="3px"
                bgColor="brand.500"
                color="brand.500"
                borderRadius="full"
                mt="3"
              />
            </>
          )}
          {description && (
            <Text variant="paragraph-2" tone="secondary" mt="4">
              {description}
            </Text>
          )}
        </Box>
      )}

      <Box mt="8">{children}</Box>
    </Box>
  );
};
