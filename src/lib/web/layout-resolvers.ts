import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Service } from "@/models/Service";
import { LayoutComponent, LayoutComponentDetail } from "@/modules/layout";

// ─── Types ────────────────────────────────────────────────────────────────────

type SlugMap = Record<string, string>;

interface ResolvableItem {
  serviceId?: string;
  productId?: string;
  link?: string;
  components?: ResolvableItem[];
  [key: string]: unknown;
}

// ─── Collect IDs ──────────────────────────────────────────────────────────────

function collectIds(
  items: ResolvableItem[],
  serviceIds: Set<string>,
  productIds: Set<string>,
): void {
  for (const item of items) {
    if (item.serviceId) serviceIds.add(item.serviceId);
    if (item.productId) productIds.add(item.productId);
    if (Array.isArray(item.components)) {
      collectIds(item.components, serviceIds, productIds);
    }
  }
}

// ─── Inject links ─────────────────────────────────────────────────────────────

function injectLinks(
  items: ResolvableItem[],
  serviceSlugMap: SlugMap,
  productSlugMap: SlugMap,
): ResolvableItem[] {
  return items.map((item) => {
    const updated: ResolvableItem = { ...item };

    if (item.serviceId && serviceSlugMap[item.serviceId]) {
      updated.link = `/services/${serviceSlugMap[item.serviceId]}`;
    }

    if (item.productId && productSlugMap[item.productId]) {
      updated.link = `/products/${productSlugMap[item.productId]}`;
    }

    if (Array.isArray(item.components)) {
      updated.components = injectLinks(
        item.components,
        serviceSlugMap,
        productSlugMap,
      );
    }

    return updated;
  });
}

// ─── isResolvableItem guard ───────────────────────────────────────────────────

function toResolvableItems(components: unknown[]): ResolvableItem[] {
  return components.filter(
    (c): c is ResolvableItem => typeof c === "object" && c !== null,
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export async function resolveLayoutLinks(
  components: LayoutComponent[],
): Promise<LayoutComponent[]> {
  await connectDB();

  const serviceIds = new Set<string>();
  const productIds = new Set<string>();

  // Walk tất cả nested components để collect IDs
  for (const c of components) {
    const nested = toResolvableItems(
      Array.isArray(c.detail?.components)
        ? (c.detail.components as unknown[])
        : [],
    );
    collectIds(nested, serviceIds, productIds);
  }

  // Không có gì cần resolve — trả về nguyên bản
  if (!serviceIds.size && !productIds.size) return components;

  // Fetch slugs 1 lần duy nhất
  const [services, products] = await Promise.all([
    serviceIds.size
      ? Service.find(
          { _id: { $in: [...serviceIds] } },
          { _id: 1, slug: 1 },
        ).lean()
      : [],
    productIds.size
      ? Product.find(
          { _id: { $in: [...productIds] } },
          { _id: 1, slug: 1 },
        ).lean()
      : [],
  ]);

  const serviceSlugMap: SlugMap = Object.fromEntries(
    services.map((s) => [String(s._id), s.slug]),
  );
  const productSlugMap: SlugMap = Object.fromEntries(
    products.map((p) => [String(p._id), p.slug]),
  );

  // Inject links vào components
  return components.map((c) => {
    const nested = toResolvableItems(
      Array.isArray(c.detail?.components)
        ? (c.detail.components as unknown[])
        : [],
    );

    if (!nested.length) return c;

    const detail: LayoutComponentDetail = {
      ...c.detail,
      components: injectLinks(nested, serviceSlugMap, productSlugMap),
    };

    return { ...c, detail };
  });
}
