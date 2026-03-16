import Skeleton from "@/components/skeleton";
import {
  AboutSection,
  CtaBanner,
  HeroBannerCarousel,
  IntroCards,
  StatsStrip,
  ThemedBannerGridOverlay,
} from "@/modules/home/components";
import { Footer } from "@/modules/layout/components";
import dynamic, { DynamicOptionsLoadingProps } from "next/dynamic";
import type { ComponentType } from "react";
import DynamicCardsAboutSection from "../home/components/dynamic-cards-about-section";

type DynamicOptions = {
  loading?: (props: DynamicOptionsLoadingProps) => React.ReactNode | null;
  ssr?: boolean;
};

const dynamicWithSkeleton = <P extends object>(
  loader: () => Promise<{ default: ComponentType<P> }>,
  options: DynamicOptions = {},
): ComponentType<P> =>
  dynamic(loader, {
    loading: options.loading,
    ssr: options.ssr ?? true,
  });

const NewsSection = dynamicWithSkeleton(
  () => import("@/modules/home/components/news-section"),
  {
    loading: () => <Skeleton height="400px" />,
  },
);

// Lookup table: type từ MongoDB → React Component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const layoutComponents: Record<string, ComponentType<any>> = {
  "hero-banner-carousel": HeroBannerCarousel,
  "themed-banner-grid-overlay": ThemedBannerGridOverlay,
  "dynamic-cards-about-section": DynamicCardsAboutSection,
  "intro-cards": IntroCards,
  "about-section": AboutSection,
  "stats-strip": StatsStrip,
  "cta-banner": CtaBanner,
  "news-section": NewsSection,
  "layout-footer": Footer,
};

export default layoutComponents;
