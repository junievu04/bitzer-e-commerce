import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";
import NoProduct from "@/modules/products/product-detail/no-product";
import ProductDetailClient from "@/modules/products/product-detail/product-detail-client";
import fetchProductDetail from "@/modules/products/utils/fetch-product-detail";
import fetchProducts from "@/modules/products/utils/fetch-products";
import withErrorBoundary from "@/utils/withErrorBoundary";
interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;
  const [product, suggestionsResponse] = await Promise.all([
    fetchProductDetail(slug),
    fetchProducts({ slug }),
  ]);

  return (
    <LayoutContentWrapper>
      {product ? (
        <ProductDetailClient
          product={product}
          suggestions={suggestionsResponse?.products ?? []}
        />
      ) : (
        <NoProduct />
      )}
    </LayoutContentWrapper>
  );
};

export default withErrorBoundary(ProductDetailPage);
