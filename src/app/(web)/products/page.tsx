import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";
import ProductsClient from "@/modules/products/products-client";

const page = () => {
  return (
    <LayoutContentWrapper>
      <ProductsClient />
    </LayoutContentWrapper>
  );
};

export default page;
