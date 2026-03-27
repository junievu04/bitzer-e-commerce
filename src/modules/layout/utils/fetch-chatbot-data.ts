"use server";

import { getChatbotData } from "@/lib/web/chatbot-action";
import type { ChatbotData } from "../components/chatbot/chatbot.d";

export async function fetchChatbotData(): Promise<ChatbotData | null> {
  try {
    return await getChatbotData();
  } catch (error) {
    console.error("Error fetching chatbot data:", error);
    return null;
  }
}
