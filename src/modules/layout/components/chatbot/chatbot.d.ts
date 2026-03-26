export type TopicKey = "compressor" | "gas" | "repair" | "warranty" | "other";
export type SuggestionProduct = {
  id: string;
  name: string;
  slug: string;
  images?: string[];
};
export type ChatRule = {
  keywords: string[];
  response: string;
  topic?: TopicKey;
};
export type SuggestionService = {
  id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  brief?: string;
};
export type Message = {
  type: "user" | "bot";
  content: string;
  suggestions?: {
    products: SuggestionProduct[];
    services: SuggestionService[];
  };
  fallbackLink?: {
    link: string;
    label: string;
  };
};

/**
 * Chatbot
 */
export interface ChatbotData {
  suggestionProducts: {
    topiKey: string;
    products: ProductItem[];
  }[];
  suggestionServices: {
    topicKey: string;
    services: Service[];
  }[];
}
