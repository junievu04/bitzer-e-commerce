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
interface ProductBase {
  id: string;
  name: string;
  slug: string;
  stock?: number;
  price?: number;
  images?: string[];
  brief?: string;
  description?: string;
  specifications?: ProductSpecification[];
}

export type ProductTranslation = Translation<ProductBase>;

export type ProductItem = Translatable<ProductBase>;

export type ProductDetail = Translatable<
  ProductBase & {
    specifications?: ProductSpecification[];
    category: CategoryDTO;
  }
>;
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
