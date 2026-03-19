import type { ProductSearchParams } from "@/types/api";

export const INITIAL_SEARCH_PARAMS: ProductSearchParams = {
  text: "",
  categorySlug: "",
  sortBy: "default",
  next: null,
};
