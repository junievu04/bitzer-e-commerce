import { getCategories } from "@/lib/admin/manage/categories";
import { getProducts } from "@/lib/admin/manage/products";
import ProductManageClient from "@/modules/admin/products/product-manage.client";
import withErrorBoundary from "@/utils/withErrorBoundary";

const page = async () => {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);
  return (
    <ProductManageClient
      initialProducts={products}
      initialCategories={categories}
    />
  );
};

export default withErrorBoundary(page);
