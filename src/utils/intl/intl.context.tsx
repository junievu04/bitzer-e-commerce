"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import getMessages from "./get-messages";

export type IntlLocale = "vi" | "en";

export type IntlContextValue = {
  messages: Record<string, string>;
  lang: IntlLocale;
  toggle: () => void;
};

export const IntlContext = createContext<IntlContextValue | null>(null);

export function IntlProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<IntlLocale>("vi");
  const toggle = useCallback(
    () => setLang((l) => (l === "vi" ? "en" : "vi")),
    [],
  );
  const messages = useMemo(() => getMessages(lang), [lang]);
  const value = useMemo<IntlContextValue>(
    () => ({ messages, lang, toggle }),
    [messages, lang, toggle],
  );
  return <IntlContext.Provider value={value}>{children}</IntlContext.Provider>;
}
