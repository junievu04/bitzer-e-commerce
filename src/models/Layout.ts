import { Document, Schema, model, models } from "mongoose";

export interface ILayout extends Document {
  key: string; // e.g. "header", "footer", "home", "about"
  locale: string; // e.g. "vi", "en"
  data: unknown; // flexible JSON payload for the layout
  createdAt: Date;
  updatedAt: Date;
}

const LayoutSchema = new Schema<ILayout>(
  {
    key: { type: String, required: true, lowercase: true, trim: true },
    locale: { type: String, required: true, lowercase: true, trim: true },
    data: { type: Schema.Types.Mixed, required: true, default: {} },
  },
  { timestamps: true },
);

LayoutSchema.index({ key: 1, locale: 1 }, { unique: true });
LayoutSchema.index({ updatedAt: -1 });

export const Layout = models.Layout || model<ILayout>("Layout", LayoutSchema);

