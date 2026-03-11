import { Document, Schema, model, models } from "mongoose";

export interface ICategory extends Document {
  name: {
    vi: string;
    en: string;
  };
  slug: string;
  description?: {
    vi?: string;
    en?: string;
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: {
      vi: { type: String, required: true, trim: true },
      en: { type: String, required: true, trim: true },
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      vi: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ "name.vi": "text", "name.en": "text" });

export const Category =
  models.Category || model<ICategory>("Category", CategorySchema);

