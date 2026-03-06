import { isValidElement, ReactNode } from "react";

function get(
  values: Record<string, unknown> | undefined,
  path: string,
): unknown {
  if (!values) return undefined;
  const parts = path.split(".");
  let current: unknown = values;

  for (const p of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[p];
  }

  return current;
}

function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

type FormatMessage = (
  key: string,
  values?: Record<string, string | number | ReactNode> & {
    defaultMessage?: string;
  },
) => string;

const getTranslations = (message: Record<string, string>) => {
  const callback: FormatMessage = (key, values) => {
    let translatedMessage = message[key];

    if (!translatedMessage) {
      const defaultMessage = values?.defaultMessage?.toString();
      translatedMessage = defaultMessage ?? key;
    }

    const regex = /({[^{}]*})|[^{}]+/g;
    const messages = translatedMessage.match(regex);

    if (!messages || messages.length < 2) {
      return translatedMessage;
    }

    const arr = messages.map((innerKey) => {
      if (innerKey[0] !== "{") {
        return innerKey;
      }

      const value = get(values, innerKey.slice(1, -1));

      if (isNil(value)) {
        return innerKey;
      }

      if (isValidElement(value)) {
        return "";
      }

      return String(value);
    });

    return arr.join("");
  };

  return callback;
};

export default getTranslations;
