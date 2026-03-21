import { getServices } from "@/lib/admin/manage/services";
import ServiceManageClient from "@/modules/admin/services/service-manage.client";
import withErrorBoundary from "@/utils/withErrorBoundary";

const page = async () => {
  const services = await getServices();
  return <ServiceManageClient initialServices={services} />;
};

export default withErrorBoundary(page);
