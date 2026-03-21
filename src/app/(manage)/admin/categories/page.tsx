import { getCategories } from "@/lib/admin/manage/categories";
import CategoryClient from "@/modules/admin/categories/category-client";
import withErrorBoundary from "@/utils/withErrorBoundary";

const page = async () => {
  const categories = await getCategories();
  return <CategoryClient categories={categories} />;
};

export default withErrorBoundary(page);
