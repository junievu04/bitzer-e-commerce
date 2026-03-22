import { Grid } from "@/vendors/styled-system/jsx";
import ProductCard from "./product-card";
import type { ProductItem } from "./products.d";

interface ProductListProps {
  products: ProductItem[];
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
