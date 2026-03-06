/**
 * Flatten nested translation object to dot-notation keys (Lokalise-style).
 * e.g. { nav: { home: "Home" } } → { "nav.home": "Home" }
 */
function flattenMessages(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  return Object.keys(obj).reduce((acc, k) => {
    const v = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "object" && v !== null && !Array.isArray(v)) {
      Object.assign(
        acc,
        flattenMessages(v as Record<string, unknown>, key),
      );
    } else if (typeof v === "string") {
      acc[key] = v;
    }
    return acc;
  }, {} as Record<string, string>);
}

export default flattenMessages;
