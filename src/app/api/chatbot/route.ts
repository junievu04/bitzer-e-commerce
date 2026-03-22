import type { ChatbotData } from "@/modules/layout/components/chatbot/chatbot.d";
import type { ProductItem } from "@/modules/products";
import type { Service } from "@/modules/services";
import { NextRequest, NextResponse } from "next/server";

type TopicKey = "compressor" | "gas" | "repair" | "warranty";

interface SuggestionResponse {
  topic: TopicKey;
  products: ProductItem[];
  services: Service[];
}

const TOPICS: TopicKey[] = ["compressor", "gas", "repair", "warranty"];

export async function GET(request: NextRequest) {
  try {
    const origin = request.nextUrl.origin;

    const responses = await Promise.all(
      TOPICS.map(async (topic) => {
        const res = await fetch(
          `${origin}/api/chatbot/suggestions?topic=${encodeURIComponent(topic)}`,
          { cache: "no-store" },
        );
        if (!res.ok) return null;
        return (await res.json()) as SuggestionResponse;
      }),
    );

    const suggestionProducts: NonNullable<ChatbotData["suggestionProducts"]> =
      [];
    const suggestionServices: NonNullable<ChatbotData["suggestionServices"]> =
      [];

    for (const item of responses) {
      if (!item) continue;
      if (item.products.length > 0) {
        suggestionProducts.push({
          topiKey: item.topic,
          products: item.products.slice(0, 2),
        });
      }
      if (item.services.length > 0) {
        suggestionServices.push({
          topicKey: item.topic,
          services: item.services.slice(0, 2),
        });
      }
    }

    const data: ChatbotData = {
      suggestionProducts,
      suggestionServices,
    };

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("GET /api/chatbot error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
