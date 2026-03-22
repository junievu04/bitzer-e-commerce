"use server";

import { fetchResources } from "@/utils/fetchers/fetchers.server";
import type { ServiceDetail } from "../services.d";

const fetchServiceDetail = async (
  slug: string,
): Promise<ServiceDetail | null> => {
  try {
    const response = await fetchResources<ServiceDetail>(
      `/api/services/${slug}`,
      {
        cache: "no-store",
      },
    );
    return response;
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
};

export default fetchServiceDetail;
