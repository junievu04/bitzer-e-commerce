"use client";

import { useContext, useMemo } from "react";
import getTranslations from "./get-translations";
import { IntlContext } from "./intl.context";

export function useIntl() {
  const ctx = useContext(IntlContext);
  if (!ctx) {
    throw new Error("useIntl must be used within IntlProvider");
  }
  const t = useMemo(
    () => getTranslations(ctx.messages),
    [ctx.messages],
  );
  return {
    t,
    lang: ctx.lang,
    toggle: ctx.toggle,
  };
}

export default useIntl;
