import type { Translatable, Translation } from "@/types/translatable";
import { useIntl } from "@/utils/intl";

export function useTranslation<T>(entity: Translatable<T> | undefined | null) {
  const { lang } = useIntl();

  function translate(key: keyof Translation<T>): string | null;
  function translate<Item extends object>(
    key: keyof Translation<T>,
  ): Item[] | null;
  function translate<Item extends object>(
    key: keyof Translation<T>,
  ): string | Item[] | null {
    if (!entity) return null;
    const translation = entity.translations?.[lang];
    const value = translation?.[key] ?? entity[key as unknown as keyof T];
    if (Array.isArray(value))
      return value.length > 0 ? (value as Item[]) : null;
    return (value as string) || null;
  }

  return { translate, lang };
}
