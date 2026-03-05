import { Document, Schema, model, models } from "mongoose";

export interface IProduct extends Document {
  name: { vi: string; en: string };
  code: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
  description: { vi: string; en: string };
  specs: Record<string, string>;
  category: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      vi: { type: String, required: true },
      en: { type: String, required: true },
    },
    code: { type: String, required: true, unique: true, uppercase: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, default: 0, min: 0 },
    images: [{ type: String }],
    description: { vi: String, en: String },
    specs: { type: Map, of: String, default: {} },
    category: { type: String, required: true },
    tags: [String],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ProductSchema.index({
  "name.vi": "text",
  "name.en": "text",
  code: "text",
  tags: "text",
});
ProductSchema.index({ category: 1, price: 1 });
ProductSchema.index({ slug: 1 }, { unique: true });

export const Product =
  models.Product || model<IProduct>("Product", ProductSchema);
