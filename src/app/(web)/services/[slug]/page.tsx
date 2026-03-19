import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";
import ServiceDetailClient from "@/modules/services/service-detail-client";
import fetchServiceDetail from "@/modules/services/utils/fetch-service-detail";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

const ServiceDetailPage = async ({ params }: ServiceDetailPageProps) => {
  const { slug } = await params;
  const data = await fetchServiceDetail(slug);
  return (
    <LayoutContentWrapper>
      <ServiceDetailClient data={data} />
    </LayoutContentWrapper>
  );
};

export default ServiceDetailPage;
