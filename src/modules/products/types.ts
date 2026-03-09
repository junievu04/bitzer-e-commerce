export interface Product {
  id: string;
  slug?: string;
  name: string;
  image: string;
  price: number | null;
  quantity: number;
  description: string;
  category: ProductCategory;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ProductFilterState {
  categorySlug: string | null;
  sortBy: "default" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
