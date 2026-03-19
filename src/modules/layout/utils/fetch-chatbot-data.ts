"use server";

import { fetchResources } from "@/utils/fetchers/fetchers.server";
import type { ChatbotData } from "../components/chatbot/chatbot.d";

export async function fetchChatbotData(): Promise<ChatbotData | null> {
  try {
    return await fetchResources<ChatbotData>("/api/chatbot", {
      cache: "no-store",
    });
  } catch (error) {
    console.error("Error fetching chatbot data:", error);
    return null;
  }
}
