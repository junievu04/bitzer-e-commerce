import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { Product, type IProduct } from "@/models/Product";
import { Service as ServiceModel, type IService } from "@/models/Service";
import type { ProductItem } from "@/modules/products";
import type { Service } from "@/modules/services";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

type TopicKey = "compressor" | "gas" | "repair" | "warranty";

type ProductDoc = IProduct & { _id: Types.ObjectId };
type ServiceDoc = IService & { _id: Types.ObjectId };

interface ChatbotSuggestionsResponse {
  topic: TopicKey;
  products: ProductItem[];
  services: Service[];
}

function mapProduct(doc: ProductDoc): ProductItem {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    price: typeof doc.price === "number" ? doc.price : undefined,
    stock: typeof doc.stock === "number" ? doc.stock : undefined,
    images: Array.isArray(doc.images) ? doc.images : [],
  };
}

function mapService(doc: ServiceDoc): Service {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    thumbnail: doc.thumbnail,
    brief: doc.brief,
  };
}

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

  return docs.map(mapProduct);
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

  return docs.map(mapService);
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic") as TopicKey | null;

    if (
      !topic ||
      !["compressor", "gas", "repair", "warranty"].includes(topic)
    ) {
      return NextResponse.json({ error: "Invalid topic" }, { status: 400 });
    }

    const [products, services] = await Promise.all([
      getProductsByTopic(topic),
      getServicesByTopic(topic),
    ]);

    const response: ChatbotSuggestionsResponse = {
      topic,
      products,
      services,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("GET /api/chatbot/suggestions error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
