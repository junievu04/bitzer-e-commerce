/**
 * Category
 */
export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  description?: string;
}

/**
 * Product
 */
export type ProductSortType =
  | "default"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc";

export interface ProductSpecification {
  label: string;
  value: string;
}
export interface ProductCategory {
  name: string;
  slug: string;
}
export interface ProductTranslation {
  name?: string;
  brief?: string;
  description?: string;
  specifications?: ProductSpecification[];
}
export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  stock?: number;
  price?: number;
  images?: string[];
  translations?: Record<string, ProductTranslation>;
}
export interface ProductDetail extends ProductItem {
  brief?: string;
  description?: string;
  specifications?: ProductSpecification[];
  category: CategoryDTO;
}
export interface ProductSearchParams {
  text?: string;
  categorySlug?: string;
  sortBy?: ProductSortType;
  next?: string | null;
}
export interface ProductsDTO {
  products: ProductItem[];
  next: string | null;
  searchParams: ProductSearchParams;
}
