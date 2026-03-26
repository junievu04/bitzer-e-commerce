import type { ProductDetail, ProductItem } from "../products.d";

/**
 * Các field có thể được dịch từ backend translations.
 * Mở rộng khi backend trả thêm field mới.
 */
export interface ProductTranslation {
  name?: string;
  brief?: string;
  description?: string;
}

/**
 * Lấy giá trị field của product theo ngôn ngữ hiện tại.
 * Ưu tiên: backend translations[lang] → translations["vi"] → field gốc trên product.
 *
 * @param product - ProductItem hoặc ProductDetail
 * @param field   - Tên field cần lấy (name | brief | description)
 * @param lang    - Ngôn ngữ hiện tại từ useIntl().lang
 *
 * @example
 * const { lang } = useIntl();
 * getProductField(product, "name", lang)       // "Tên sản phẩm" | "Product Name"
 * getProductField(product, "description", lang) // mô tả theo ngôn ngữ
 */
export function getProductField<K extends keyof ProductTranslation>(
  product: ProductItem | ProductDetail,
  field: K,
  lang: string,
): string {
  // 1. Thử lấy từ translations theo lang hiện tại
  const translation = product.translations?.[lang] as
    | ProductTranslation
    | undefined;
  const translated = translation?.[field];
  if (translated) return translated;

  // 2. Fallback về "vi" nếu lang khác không có
  if (lang !== "vi") {
    const viTranslation = product.translations?.["vi"] as
      | ProductTranslation
      | undefined;
    const viValue = viTranslation?.[field];
    if (viValue) return viValue;
  }

  // 3. Fallback về field gốc trên product object (luôn là tiếng Việt)
  const raw = (product as unknown as Record<string, unknown>)[field as string];
  return typeof raw === "string" ? raw : "";
}
