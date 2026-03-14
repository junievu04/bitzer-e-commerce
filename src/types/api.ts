/**
 * Category
 */
export interface CategoryDTO {
  id: string;
  slug: string;
  name: {
    vi: string;
    en: string;
  };
  description?: {
    vi?: string;
    en?: string;
  };
  isActive: boolean;
}

/**
 * Product
 */
export interface ProductDTO {
  id: string;
  name: {
    vi: string;
    en: string;
  };
  code: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
  description: {
    vi: string;
    en: string;
  };
  specs: Record<string, string>;
  category: CategoryDTO;
  tags: string[];
  isActive: boolean;
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
  description?: string;
  image?: string;
  ctaLink?: string;
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
