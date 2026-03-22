import { SelectDropdown, SelectOption } from "@/components/select-dropdown";
import type { CategoryDTO } from "./products.d";

interface ProductFilterProps {
  categories: CategoryDTO[];
  categorySlug: string;
  onCategoryChange: (categorySlug: string) => void;
}

export default function ProductFilter({
  categories,
  categorySlug,
  onCategoryChange,
}: ProductFilterProps) {
  const options: SelectOption[] = [
    { value: "", label: "Tất cả sản phẩm" },
    ...categories
      .filter((c) => c.isActive)
      .map((c) => ({ value: c.slug, label: c.name })),
  ];

  return (
    <SelectDropdown
      options={options}
      value={categorySlug}
      onChange={onCategoryChange}
      placeholder="Danh mục sản phẩm"
    />
  );
}
