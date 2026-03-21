/**
 * Admin API client — attaches Bearer token from NextAuth session to every request.
 * Usage: import { adminApi } from "@/lib/admin-api"
 */

import { CategoryDTO, ServiceDetail } from "@/types/api";
import { getSession } from "next-auth/react";

async function getAuthHeaders(): Promise<HeadersInit> {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated");
  // NextAuth JWT is stored in the cookie — we pass a sentinel value.
  // The server validates via getToken() in requireAdminToken().
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer session",
  };
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const headers = await getAuthHeaders();
  const res = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error ?? `Request failed: ${res.status}`);
  }

  return res.json();
}

// ─── Products ─────────────────────────────────────────────────────────────────

export const adminApi = {
  // Products
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getProducts: () => request<{ products: any[] }>("GET", "/api/products"),

  createProduct: (data: Record<string, unknown>) =>
    request("POST", "/api/products", data),

  updateProduct: (id: string, data: Record<string, unknown>) =>
    request("PATCH", `/api/products/${id}`, data),

  deleteProduct: (id: string) => request("DELETE", `/api/products/${id}`),

  // Categories
  getCategories: () => request<CategoryDTO[]>("GET", "/api/categories"),

  createCategory: (data: Record<string, unknown>) =>
    request("POST", "/api/categories", data),

  deleteCategory: (id: string) => request("DELETE", `/api/categories/${id}`),

  // Services

  getServices: () => request<ServiceDetail[]>("GET", "/api/services"),

  createService: (data: Record<string, unknown>) =>
    request("POST", "/api/services", data),

  updateService: (id: string, data: Record<string, unknown>) =>
    request("PATCH", `/api/services/${id}`, data),

  deleteService: (id: string) => request("DELETE", `/api/services/${id}`),
};
