const LOCALHOST_RE = /^localhost|^127\./i;
const ABSOLUTE_URL_RE = /^https?:\/\//i;

export function normalizePublicAppUrl(raw: string): string {
  const value = raw.trim();
  if (!value) return "http://localhost:3000";
  if (ABSOLUTE_URL_RE.test(value)) return value.replace(/\/$/, "");
  if (LOCALHOST_RE.test(value)) return `http://${value}`;
  return `https://${value}`;
}

export function getMetadataBaseUrl(raw?: string): URL {
  return new URL(normalizePublicAppUrl(raw ?? "http://localhost:3000"));
}
