"use server";

import type { CategoryDTO } from "@/types/api";
import { fetchResources } from "@/utils/fetchers/fetchers.server";

const fetchCategories = async (): Promise<CategoryDTO[]> => {
  try {
    const data = await fetchResources<{ categories: CategoryDTO[] }>(
      "/api/categories",
    );
    return data?.categories ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export default fetchCategories;
