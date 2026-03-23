import { getCategories } from "@/lib/admin/manage/categories";
import { getProducts } from "@/lib/admin/manage/products";
import ProductManageClient from "@/modules/admin/products/product-manage.client";

interface Props {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const { page, search } = await searchParams;

  const [productPage, categories] = await Promise.all([
    getProducts(Math.max(1, Number(page) || 1), search ?? ""),
    getCategories(),
  ]);

  return (
    <ProductManageClient
      initialData={productPage}
      initialCategories={categories}
    />
  );
}
