import { useState } from "react";
import type { ToastType } from "./toast";
import { Toast } from "./toast";

interface ToastState {
  type: ToastType;
  message: string;
  id: number;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  function showToast(type: ToastType, message: string) {
    setToast({ type, message, id: Date.now() });
  }

  function hideToast() {
    setToast(null);
  }

  const toastElement = toast ? (
    <Toast
      key={toast.id}
      type={toast.type}
      message={toast.message}
      onClose={hideToast}
    />
  ) : null;

  return {
    showToast,
    showSuccess: (msg: string) => showToast("success", msg),
    showError: (msg: string) => showToast("error", msg),
    toastElement,
  };
}
