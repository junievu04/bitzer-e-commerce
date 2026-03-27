"use server";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Product, type IProduct } from "@/models/Product";
import { Service as ServiceModel, type IService } from "@/models/Service";
import type { ChatbotData } from "@/modules/layout/components/chatbot/chatbot.d";
import type { ProductItem } from "@/modules/products";
import type { Service } from "@/modules/services";
import { Types } from "mongoose";
import { mapProductToCard } from "./map-product-card";
import { mapServiceToListDTO } from "./map-services";

type TopicKey = "compressor" | "gas" | "repair" | "warranty";
type ProductDoc = IProduct & { _id: Types.ObjectId };
type ServiceDoc = IService & { _id: Types.ObjectId };

const TOPICS: TopicKey[] = ["compressor", "gas", "repair", "warranty"];

async function getProductsByTopic(topic: TopicKey): Promise<ProductItem[]> {
  if (topic !== "compressor" && topic !== "gas") return [];

  const categoryQuery =
    topic === "gas"
      ? { slug: { $regex: /gas/i } }
      : { slug: { $regex: /^may-nen/i } };
  const categories = await Category.find(categoryQuery)
    .select({ _id: 1 })
    .limit(10)
    .lean<{ _id: Types.ObjectId }[]>();
  const categoryIds = categories.map((cat) => cat._id);
  if (categoryIds.length === 0) return [];

  const docs = await Product.find({ category: { $in: categoryIds } })
    .sort({ createdAt: -1, _id: -1 })
    .limit(2)
    .lean<ProductDoc[]>();

  return docs.map(mapProductToCard);
}

async function getServicesByTopic(topic: TopicKey): Promise<Service[]> {
  if (topic !== "repair" && topic !== "warranty") return [];

  const serviceRegex =
    topic === "repair"
      ? /(sua chua|sửa chữa|repair)/i
      : /(bao tri|bảo trì|maintenance)/i;

  const docs = await ServiceModel.find({
    isActive: true,
    $or: [
      { name: { $regex: serviceRegex } },
      { brief: { $regex: serviceRegex } },
      { description: { $elemMatch: { $regex: serviceRegex } } },
      { features: { $elemMatch: { $regex: serviceRegex } } },
    ],
  })
    .sort({ createdAt: -1, _id: -1 })
    .limit(2)
    .lean<ServiceDoc[]>();

  return docs.map(mapServiceToListDTO);
}

export async function getChatbotData(): Promise<ChatbotData> {
  await connectDB();

  const results = await Promise.all(
    TOPICS.map(async (topic) => {
      const [products, services] = await Promise.all([
        getProductsByTopic(topic),
        getServicesByTopic(topic),
      ]);
      return { topic, products, services };
    }),
  );

  const suggestionProducts: NonNullable<ChatbotData["suggestionProducts"]> = [];
  const suggestionServices: NonNullable<ChatbotData["suggestionServices"]> = [];

  for (const item of results) {
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

  return { suggestionProducts, suggestionServices };
}
