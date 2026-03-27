import { IService } from "@/models/Service";
import { Service } from "@/modules/services";
import { Types } from "mongoose";

export function mapServiceToListDTO(
  doc: IService & { _id: Types.ObjectId },
): Service {
  return {
    id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    thumbnail: doc.thumbnail,
    brief: doc.brief,
  };
}
