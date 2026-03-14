import { CartClient } from "@/modules/cart";
import LayoutContentWrapper from "@/modules/layout/layout-content-wrapper";

export default function CartPage() {
  return (
    <LayoutContentWrapper>
      <CartClient />
    </LayoutContentWrapper>
  );
}
