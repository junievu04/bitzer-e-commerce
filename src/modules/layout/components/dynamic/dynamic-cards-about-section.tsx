"use client";
import { Carousel } from "@/components/carousel";
import Text from "@/components/text";
import { TextProps } from "@/components/text/text";
import AboutCard from "@/modules/about/about-card";
import AboutHeader from "@/modules/about/about-header";
import { MainContentWrapper } from "@/modules/layout/components/dynamic";
import { LayoutComponentDetail } from "@/types/api";
import { useIntl } from "@/utils/intl";
import { Box, Flex, Grid, Stack } from "@/vendors/styled-system/jsx";
import { useMemo } from "react";

interface Props {
  detail: LayoutComponentDetail;
}

export interface AboutCardProps {
  id: string;
  displayInRow?: boolean;
  minWidthCard?: number | string;
  title?: string;
  titleVariant?: TextProps["variant"];
  description?: string;
  image?: string;
  imageWidth?: number | string;
  imageHeight?: number | string;
  backgroundImage?: string;
}

interface DataComponentProps {
  id: string;
  type: "grid" | "horizontal" | "horizontal-carousel";
  numberOfItems?: number;
  numberOfColumns?: number;
  data: AboutCardProps[];
}

export default function DynamicCardsAboutSection({ detail }: Props) {
  const { t } = useIntl();
  const { label, title, subTitle, components } = detail;
  const dataComponents = components?.map(
    (component) => component as DataComponentProps,
  );

  const renderHeader = useMemo(() => {
    if (label && title) {
      return <AboutHeader label={label} title={title} center />;
    }
    return (
      <Stack gap="1">
        {subTitle && (
          <Text
            variant="caption-1"
            weight="bold"
            tone="inverse"
            textTransform="uppercase"
            opacity="0.7"
          >
            {t(subTitle)}
          </Text>
        )}
        {title && (
          <Text
            variant="page-heading-2"
            weight="bold"
            tone="inverse"
            textTransform="uppercase"
          >
            {t(title)}
          </Text>
        )}
        <Box w="10" h="3px" bg="white" mt="1" opacity="0.4" />
      </Stack>
    );
  }, [label, title, subTitle, t]);

  const aboutCards = useMemo(() => {
    if (!dataComponents) return null;

    return dataComponents.map((component) => {
      // ← thêm return
      if (!component) return null;

      if (component.type === "grid") {
        const baseColumns =
          component.numberOfColumns !== undefined &&
          component.numberOfColumns !== null
            ? component.numberOfColumns - 1 || 1
            : 1;

        return (
          <Grid
            key={component.id}
            columns={{
              base: baseColumns,
              md: component.numberOfColumns ?? 2,
            }}
            gap="6"
          >
            {component.data.map((item) => {
              if (!item) return null;
              return (
                <AboutCard
                  key={item.id}
                  {...item}
                  displayInRow
                  backgroundImage="brand.50"
                  imageWidth="12"
                  imageHeight="12"
                />
              );
            })}
          </Grid>
        );
      }

      if (component.type === "horizontal") {
        return (
          <Flex
            key={component.id}
            gap="6"
            flexWrap="wrap"
            justifyContent="center"
          >
            {component.data.map((item) => {
              if (!item) return null;
              return (
                <AboutCard
                  key={item.id}
                  {...item}
                  imageWidth="12"
                  imageHeight="12"
                  titleVariant="caption-1"
                />
              );
            })}
          </Flex>
        );
      }

      return (
        <Carousel
          key={component.id}
          variant={
            component.numberOfItems && component.numberOfItems <= 3
              ? "three"
              : "four"
          }
          navigation
          pagination
          loop
          gap={20}
        >
          {component.data.map((item) => {
            if (!item) return null;
            return <AboutCard key={item.id} {...item} />;
          })}
        </Carousel>
      );
    });
  }, [dataComponents]);

  return (
    <MainContentWrapper id="dynamic-cards-about-section">
      <Box pb={{ base: "12", md: "20" }}>
        <Stack gap="10">
          {renderHeader}
          {aboutCards}
        </Stack>
      </Box>
    </MainContentWrapper>
  );
}
