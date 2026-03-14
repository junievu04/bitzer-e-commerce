import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";
import { ProductDetailClient } from "@/modules/products/product-detail-client";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetailPage = async ({ params }: ProductDetailPageProps) => {
  const { slug } = await params;

  return (
    <LayoutContentWrapper>
      <ProductDetailClient slug={slug} />
    </LayoutContentWrapper>
  );
};

export default ProductDetailPage;
