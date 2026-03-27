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

function replacePrintfPlaceholders(
  translatedMessage: string,
  key: string,
  values?: Record<string, string | number | ReactNode>,
): string {
  if (!/%\d*\$?s/.test(translatedMessage)) {
    return translatedMessage;
  }

  const keyPlaceholderRegex = /{([^{}]+)}/g;
  const keyPlaceholders: string[] = [];
  for (const match of key.matchAll(keyPlaceholderRegex)) {
    keyPlaceholders.push(match[1]);
  }

  let sequence = 0;
  return translatedMessage.replace(/%(\d+)\$s|%s/g, (_, indexed) => {
    const placeholderIndex = indexed ? Number(indexed) - 1 : sequence++;
    const placeholderName = keyPlaceholders[placeholderIndex];

    if (!placeholderName) {
      return _;
    }

    const value = get(values, placeholderName);
    if (isNil(value) || isValidElement(value)) {
      return _;
    }

    return String(value);
  });
}

const getTranslations = (message: Record<string, string>) => {
  const callback: FormatMessage = (key, values) => {
    let translatedMessage = message[key];

    if (!translatedMessage) {
      const defaultMessage = values?.defaultMessage?.toString();
      translatedMessage = defaultMessage ?? key;
    }
    translatedMessage = replacePrintfPlaceholders(
      translatedMessage,
      key,
      values,
    );

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
