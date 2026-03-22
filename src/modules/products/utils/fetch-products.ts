"use server";

import { fetchResources } from "@/utils/fetchers/fetchers.server";
import type { ProductsDTO, ProductSearchParams } from "../products.d";

interface FetchProductsParams {
  searchParams?: ProductSearchParams;
  slug?: string;
}

const fetchProducts = async ({
  searchParams,
  slug,
}: FetchProductsParams): Promise<ProductsDTO | null> => {
  try {
    if (slug) {
      const data = await fetchResources<ProductsDTO>(
        `/api/products/suggestions?slug=${encodeURIComponent(slug)}`,
        { cache: "no-store" },
      );
      return data;
    }

    const params = new URLSearchParams();
    if (searchParams?.text) params.set("text", searchParams.text);
    if (searchParams?.categorySlug)
      params.set("categorySlug", searchParams.categorySlug);
    if (searchParams?.sortBy) params.set("sortBy", searchParams.sortBy);
    if (searchParams?.next) params.set("next", searchParams.next);

    const data = await fetchResources<ProductsDTO>(
      `/api/products?${params.toString()}`,
      { cache: "no-store" },
    );
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export default fetchProducts;
