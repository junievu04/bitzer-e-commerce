import { ButtonVariants } from "@/components/button/button";

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
