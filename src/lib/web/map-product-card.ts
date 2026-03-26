import { IProduct } from "@/models/Product";
import { ProductItem } from "@/modules/products";
import { Types } from "mongoose";

export function mapProductToCard(
  doc: IProduct & { _id: Types.ObjectId },
): ProductItem {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    price: typeof doc.price === "number" ? doc.price : undefined,
    stock: typeof doc.stock === "number" ? doc.stock : undefined,
    images: Array.isArray(doc.images) ? doc.images : [],
    translations: doc.translations,
  };
}
