"use server";

import type { LayoutData, LayoutDTO } from "@/types/api";
import { fetchResources } from "@/utils/fetchers/fetchers.server";

const fetchHomeLayout = async (): Promise<LayoutData | null> => {
  try {
    const layout = await fetchResources<LayoutDTO>(`/api/layouts/home`, {
      cache: "no-store",
    });
    return layout.data;
  } catch (error) {
    console.error("Error fetching home layout:", error);
    return null;
  }
};

export default fetchHomeLayout;
