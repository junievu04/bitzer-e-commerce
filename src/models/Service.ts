import { Document, Schema, model, models } from "mongoose";

export interface IService extends Document {
  name: {
    vi: string;
    en: string;
  };
  slug: string;
  summary?: {
    vi?: string;
    en?: string;
  };
  description?: {
    vi?: string;
    en?: string;
  };
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
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
    summary: {
      vi: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    description: {
      vi: { type: String, default: "" },
      en: { type: String, default: "" },
    },
    images: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ServiceSchema.index({ slug: 1 }, { unique: true });
ServiceSchema.index({ "name.vi": "text", "name.en": "text" });

export const Service =
  models.Service || model<IService>("Service", ServiceSchema);

