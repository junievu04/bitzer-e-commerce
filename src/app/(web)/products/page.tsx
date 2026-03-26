import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";
import ProductsClient from "@/modules/products/products-client";
import fetchCategories from "@/modules/products/utils/fetch-categories";
import fetchProducts from "@/modules/products/utils/fetch-products";
import withErrorBoundary from "@/utils/withErrorBoundary";

const page = async () => {
  const [products, categories] = await Promise.all([
    fetchProducts({
      searchParams: {
        text: "",
        categorySlug: "",
        sortBy: "default",
        next: null,
      },
    }),
    fetchCategories(),
  ]);
  return (
    <LayoutContentWrapper>
      <ProductsClient products={products} categories={categories} />
    </LayoutContentWrapper>
  );
};

export default withErrorBoundary(page);
