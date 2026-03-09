import { LayoutContentWrapper } from "@/modules/layout/layout-content-wrapper";
import { ServiceDetailClient } from "@/modules/services/service-detail-client";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { slug } = await params;

  return (
    <LayoutContentWrapper>
      <ServiceDetailClient slug={slug} />
    </LayoutContentWrapper>
  );
};

export default ServiceDetailPage;
