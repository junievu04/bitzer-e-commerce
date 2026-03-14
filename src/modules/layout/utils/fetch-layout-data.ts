"use server";

import type { LayoutData, LayoutDTO } from "@/types/api";
import { fetchResources } from "@/utils/fetchers/fetchers.server";

const fetchLayoutData = async (
  layoutKey: string,
): Promise<LayoutData | null> => {
  try {
    const layout = await fetchResources<LayoutDTO>(
      `/api/layouts/${layoutKey}`,
      {
        cache: "no-store",
      },
    );
    return layout.data;
  } catch (error) {
    console.error(`Error fetching ${layoutKey} layout:`, error);
    return null;
  }
};

export default fetchLayoutData;
