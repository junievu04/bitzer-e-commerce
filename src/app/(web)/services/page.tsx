import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";
import { ServicesClient } from "@/modules/services";
import fetchServices from "@/modules/services/utils/fetch-services";
import withErrorBoundary from "@/utils/withErrorBoundary";

const page = async () => {
  const services = await fetchServices();
  return (
    <LayoutContentWrapper>
      <ServicesClient services={services} />
    </LayoutContentWrapper>
  );
};

export default withErrorBoundary(page);
