export function parseLines(raw: string): string[] {
  return raw
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function buildSlug(name: string): string {
  const date = new Date().toISOString().slice(0, 10);
  const base = name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `${base}-${date}`;
}

export const formatPrice = (price?: number | null, t?: FormatMessage) => {
  if (!price) return t ? t("Liên hệ") : "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
