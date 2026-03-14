import { Document, Schema, model, models } from "mongoose";

export interface ILayout extends Document {
  layoutKey: string;
  name: string;
  locale: string; // e.g. "vi", "en"
  data: unknown; // flexible JSON payload for the layout
  createdAt: Date;
  updatedAt: Date;
}

const LayoutSchema = new Schema<ILayout>(
  {
    layoutKey: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, required: false, trim: false, default: "" },
    locale: { type: String, required: true, lowercase: true, trim: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true },
);

LayoutSchema.index({ layoutKey: 1, locale: 1 }, { unique: true });
LayoutSchema.index({ updatedAt: -1 });

export const Layout = models.Layout || model<ILayout>("Layout", LayoutSchema);
