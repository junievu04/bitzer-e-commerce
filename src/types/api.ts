import { ButtonVariants } from "@/components/button/button";

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
export interface ProductCard {
  id: string;
  name: string;
  slug: string;
  stock?: number;
  price?: number;
  images?: string[];
}
export interface ProductDetail extends ProductCard {
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
  products: ProductCard[];
  next: string | null;
  searchParams: ProductSearchParams;
}

/**
 * Service
 */
export interface ServiceDTO {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  slug: string;
  summary?: {
    vi?: string;
    en?: string;
  };
  description?: {
    vi?: string;
    en?: string;
  };
  images: string[];
  isActive: boolean;
}

/**
 * Layout
 */
export type LayoutType = "home" | "content";

export interface LayoutComponentDetail {
  title?: string;
  subTitle?: string;
  label?: string;
  description?: string;
  image?: string;
  imagePosition?: "left" | "right";
  cta?: {
    link: string;
    text: string;
    position?: "left" | "right" | "center";
    variant?: ButtonVariants;
  };
  theme?: string;
  components?: unknown[];
}

export interface LayoutComponent {
  tag: string; // e.g. "hero-banner-carousel", "section", "text-block", "image", "footer-component", "header-component"
  detail: LayoutComponentDetail;
}

export interface LayoutData {
  type: LayoutType;
  components: LayoutComponent[];
}

export interface LayoutDTO {
  layoutKey: string; // e.g. "home-1"
  name: string;
  locale: string;
  data: LayoutData;
  updatedAt: string | null;
}
