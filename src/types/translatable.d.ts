/**
 * Non-translatable keys — bị loại khỏi Translation
 */
type NonTranslatableKeys =
  | "id"
  | "slug"
  | "createdAt"
  | "updatedAt"
  | "image"
  | "images"
  | "ctaLink"
  | "link";

/**
 * String keys
 */
type StringKeys<T> = {
  [K in keyof T]: NonNullable<T[K]> extends string ? K : never;
}[keyof T];

/**
 * Array of object keys — string[] bị loại vì string không extends object
 */
type ArrayOfObjectKeys<T> = {
  [K in keyof T]: NonNullable<T[K]> extends object[] ? K : never;
}[keyof T];

/**
 * Translatable keys — sau khi loại NonTranslatableKeys
 */
export type TranslatableKeys<T> = Exclude<
  StringKeys<T> | ArrayOfObjectKeys<T>,
  NonTranslatableKeys
>;

/**
 * Translation
 */
export type Translation<T> = Partial<Pick<T, TranslatableKeys<T>>>;

/**
 * Translatable
 */
export type Translatable<T> = T & {
  translations?: Record<string, Translation<T>>;
};
