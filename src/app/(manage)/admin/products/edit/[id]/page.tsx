type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditAdminProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  return (
    <main>
      <h1>Sửa sản phẩm</h1>
      <p>Product ID: {id}</p>
      <p>Cập nhật giá và số lượng qua API PUT `/api/products/[slug]`.</p>
    </main>
  );
}
