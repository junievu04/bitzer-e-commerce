import { getDashboardStats } from "@/lib/admin/manage/dashboard";
import DashboardClient from "@/modules/admin/layout/dashboard.client";
import withErrorBoundary from "@/utils/withErrorBoundary";

const page = async () => {
  const stats = await getDashboardStats();
  return <DashboardClient stats={stats} />;
};

export default withErrorBoundary(page);
