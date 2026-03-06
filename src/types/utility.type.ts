/**
 * Modify<T, R> is a utility type that creates a new type by combining properties from two input types:
 * - T: The original type from which properties will be extracted.
 * - R: The type containing properties to override or add to the original type.
 * The resulting type contains all properties from T except those overlapping with properties from R.
 * Allowed to override or extend from an existing interface
 */
export type Modify<T, R> = Omit<T, keyof R> & R
