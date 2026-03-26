"use server";

import { FetchOptions } from "@/utils/fetchers/fetchers.utils";

const getBaseUrl = () => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? process.env.APP_URL;
  if (appUrl) return appUrl;

  // Vercel provides host without protocol.
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return "http://localhost:3000";
};

export interface ServerFetchOptions<TRequestBody = unknown>
  extends FetchOptions<TRequestBody> {
  cache?: "force-cache" | "no-store";
  token?: string;
}

/**
 * Server-only fetcher to call this app's API routes.
 * Use in Server Components or server actions.
 * For admin APIs (POST/PUT/DELETE products, categories, services), pass token (JWT).
 */
export async function fetchResources<
  TResponseData,
  TRequestBody = unknown,
  TErrorBody = unknown,
>(
  path: string,
  options?: ServerFetchOptions<TRequestBody>,
): Promise<TResponseData> {
  const baseUrl = getBaseUrl();
  const pathNormalized = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${pathNormalized}`;

  const {
    cache = "no-store",
    body,
    token,
    headers: optHeaders,
    ...rest
  } = options ?? {};

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(typeof optHeaders === "object" && optHeaders !== null
      ? Object.fromEntries(
          optHeaders instanceof Headers
            ? optHeaders.entries()
            : Object.entries(optHeaders),
        )
      : {}),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    ...rest,
    cache,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    let errorBody: TErrorBody;
    try {
      errorBody = JSON.parse(text) as TErrorBody;
    } catch {
      errorBody = text as TErrorBody;
    }
    const err = new Error(
      typeof errorBody === "object" &&
      errorBody !== null &&
      "message" in (errorBody as object)
        ? String((errorBody as { message?: string }).message)
        : text,
    ) as Error & { status: number; body: TErrorBody };
    err.status = res.status;
    err.body = errorBody;
    throw err;
  }

  return res.json() as Promise<TResponseData>;
}
