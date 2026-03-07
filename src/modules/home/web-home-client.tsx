import {
  AboutSection,
  CtaBanner,
  GlobalSupplierSection,
  HeroBannerCarousel,
  NewsSection,
  ServiceCards,
  StatsStrip,
} from "@/modules/home/main-content";
import { PageWrapper } from "@/modules/home/web-home-wrapper";

export default function HomePage() {
  return (
    <PageWrapper>
      <HeroBannerCarousel />
      <ServiceCards />
      <AboutSection />
      <StatsStrip />
      <GlobalSupplierSection />
      <CtaBanner />
      <NewsSection />
    </PageWrapper>
  );
}
