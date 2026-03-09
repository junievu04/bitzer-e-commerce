import {
  AboutSection,
  CtaBanner,
  GlobalSupplierSection,
  HeroBannerCarousel,
  NewsSection,
  ServiceCards,
  StatsStrip,
} from "@/modules/home/main-content";
import { LayoutContentWrapper } from "@/modules/layout/layout-content-wrapper";

export default function HomePage() {
  return (
    <LayoutContentWrapper>
      <HeroBannerCarousel />
      <ServiceCards />
      <AboutSection />
      <StatsStrip />
      <GlobalSupplierSection />
      <CtaBanner />
      <NewsSection />
    </LayoutContentWrapper>
  );
}
