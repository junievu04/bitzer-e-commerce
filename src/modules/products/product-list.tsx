import type { ProductCard as ProductCardType } from "@/types/api";
import { Grid } from "@/vendors/styled-system/jsx";
import ProductCard from "./product-card";

interface ProductListProps {
  products: ProductCardType[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <Grid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap="3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
