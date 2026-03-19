"use server";

import type { Service, ServicesDTO } from "@/types/api";
import { fetchResources } from "@/utils/fetchers/fetchers.server";

const fetchServices = async (): Promise<Service[] | null> => {
  try {
    const response = await fetchResources<ServicesDTO>(`/api/services`, {
      cache: "no-store",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    return null;
  }
};

export default fetchServices;
