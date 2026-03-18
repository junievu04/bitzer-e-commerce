"use server";

import type { ProductDetail } from "@/types/api";
import { fetchResources } from "@/utils/fetchers/fetchers.server";

const fetchProductDetail = async (
  slug: string,
): Promise<ProductDetail | null> => {
  try {
    const data = await fetchResources<ProductDetail>(`/api/products/${slug}`, {
      cache: "no-store",
    });
    return data;
  } catch (error) {
    console.error(`Error fetching product detail:`, error);
    return null;
  }
};

export default fetchProductDetail;
