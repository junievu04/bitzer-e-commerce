"use client";

import { useState } from "react";

interface MutationState<T> {
  data: T | null;
  error: string | null;
  isPending: boolean;
}

interface UseMutationReturn<TArgs, TData> {
  mutate: (args: TArgs) => Promise<TData | null>;
  isPending: boolean;
  error: string | null;
  data: TData | null;
  reset: () => void;
}

/**
 * Lightweight useMutation — no external deps.
 *
 * Usage:
 *   const { mutate, isPending, error } = useMutation(deleteProduct);
 *   await mutate(slug);
 */
export function useMutation<
  TArgs,
  TData extends { success: boolean; error?: string },
>(fn: (args: TArgs) => Promise<TData>): UseMutationReturn<TArgs, TData> {
  const [state, setState] = useState<MutationState<TData>>({
    data: null,
    error: null,
    isPending: false,
  });

  async function mutate(args: TArgs): Promise<TData | null> {
    setState({ data: null, error: null, isPending: true });
    try {
      const result = await fn(args);
      if (!result.success && result.error) {
        setState({ data: result, error: result.error, isPending: false });
        return result;
      }
      setState({ data: result, error: null, isPending: false });
      return result;
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Lỗi không xác định";
      setState({ data: null, error: msg, isPending: false });
      return null;
    }
  }

  function reset() {
    setState({ data: null, error: null, isPending: false });
  }

  return {
    mutate,
    isPending: state.isPending,
    error: state.error,
    data: state.data,
    reset,
  };
}
