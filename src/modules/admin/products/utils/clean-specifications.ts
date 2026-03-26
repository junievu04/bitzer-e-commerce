import { ProductSpecification } from "@/modules/products";

export const cleanSpecs = (specs: ProductSpecification[]) =>
  specs.filter((s) => s.label.trim() && s.value.trim());
