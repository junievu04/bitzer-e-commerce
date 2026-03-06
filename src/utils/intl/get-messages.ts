import { en } from "@/constants/i18n/en";
import { vi } from "@/constants/i18n/vi";
import flattenMessages from "./flatten-messages";

const DICT: Record<string, Record<string, unknown>> = {
  vi: vi as Record<string, unknown>,
  en: en as Record<string, unknown>,
};

/**
 * Get flat messages for a locale (Lokalise-style keys).
 * For now uses local dict; can be replaced with Lokalise API or static JSON.
 */
const getMessages = (locale: string): Record<string, string> => {
  const dict = DICT[locale] ?? DICT.en;
  return flattenMessages(dict);
};

export default getMessages;
