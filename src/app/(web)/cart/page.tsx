import { LayoutContentWrapper } from "@/modules/layout/layout-content-wrapper";
import { CartClient } from "@/modules/cart";

export default function CartPage() {
  return (
    <LayoutContentWrapper>
      <CartClient />
    </LayoutContentWrapper>
  );
}
