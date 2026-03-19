// models/Service.ts

import { Document, Schema, model, models } from "mongoose";

export interface IService extends Document {
  name: string;
  slug: string;
  thumbnail: string;
  brief: string;
  images: string[];
  description: string[];
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    thumbnail: { type: String, default: "" },
    brief: { type: String, default: "" },
    images: { type: [String], default: [] },
    description: { type: [String], default: [] }, // ← string[]
    features: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

ServiceSchema.index({ name: "text" });

export const Service =
  models.Service || model<IService>("Service", ServiceSchema);
