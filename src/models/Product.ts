import { ProductTranslation } from "@/modules/products/products";
import { Document, model, models, Schema, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
  brief?: string;
  description?: string;
  specifications?: { label: string; value: string }[];
  category: Types.ObjectId;
  translations?: Record<string, ProductTranslation>;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    images: [{ type: String }],
    brief: { type: String },
    description: { type: String },
    specifications: [
      {
        label: { type: String },
        value: { type: String },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    translations: { type: Map, of: Object, default: {} },
  },
  { timestamps: true },
);

ProductSchema.index({ name: "text" }, { default_language: "none" });
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ isActive: 1, createdAt: -1 });

export const Product =
  models.Product || model<IProduct>("Product", ProductSchema);
