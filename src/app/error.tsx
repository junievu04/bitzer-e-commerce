"use client";

import Link from "next/link";
import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  // Log to your error-tracking service (e.g. Sentry) here
  useEffect(() => {
    console.error("[GlobalError]", error);
    // Sentry.captureException(error);
  }, [error]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #fef2f2 0%, #f9fafb 50%, #fee2e2 100%)",
        padding: "2rem",
        fontFamily: "var(--font-heading, 'Be Vietnam Pro', sans-serif)",
        textAlign: "center",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 20px 60px rgba(239,68,68,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "2rem",
          border: "1.5px solid #fecaca",
          position: "relative",
          animation: "fade-in 0.4s ease forwards",
        }}
      >
        {/* Pulse ring */}
        <div
          style={{
            position: "absolute",
            inset: "-12px",
            borderRadius: "50%",
            border: "1px dashed #fca5a5",
            animation: "pulse-ring 2.5s ease-in-out infinite",
          }}
        />
        <span style={{ fontSize: "64px", lineHeight: "1" }}>⚠️</span>
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          fontWeight: "900",
          color: "#111827",
          marginBottom: "0.5rem",
          animation: "fade-in 0.4s 0.1s ease both",
        }}
      >
        Đã có lỗi xảy ra
      </h1>

      {/* Sub-message */}
      <p
        style={{
          fontSize: "1rem",
          color: "#6b7280",
          maxWidth: "400px",
          lineHeight: "1.7",
          marginBottom: "0.75rem",
          animation: "fade-in 0.4s 0.15s ease both",
        }}
      >
        Có sự cố không mong muốn. Bạn có thể thử tải lại trang hoặc quay về
        trang chủ.
      </p>

      {/* Error digest (for support reference) */}
      {error.digest && (
        <p
          style={{
            fontSize: "0.75rem",
            color: "#9ca3af",
            fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
            background: "#f3f4f6",
            padding: "4px 10px",
            borderRadius: "6px",
            marginBottom: "2rem",
            animation: "fade-in 0.4s 0.2s ease both",
          }}
        >
          Error ID: {error.digest}
        </p>
      )}

      {/* Action buttons */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fade-in 0.4s 0.25s ease both",
          marginTop: error.digest ? "0" : "1.5rem",
        }}
      >
        {/* Retry */}
        <button
          onClick={reset}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "#ef4444",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.625rem",
            fontWeight: "700",
            fontSize: "0.9375rem",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 14px rgba(239,68,68,0.3)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#dc2626";
            (e.currentTarget as HTMLElement).style.transform =
              "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#ef4444";
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          }}
        >
          🔄 Thử lại
        </button>

        {/* Home */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            background: "white",
            color: "#374151",
            border: "1.5px solid #e5e7eb",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.625rem",
            fontWeight: "700",
            fontSize: "0.9375rem",
            transition: "all 0.2s ease",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#f9fafb";
            (e.currentTarget as HTMLElement).style.borderColor = "#d1d5db";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "white";
            (e.currentTarget as HTMLElement).style.borderColor = "#e5e7eb";
          }}
        >
          🏠 Trang chủ
        </Link>
      </div>

      {/* Support note */}
      <p
        style={{
          marginTop: "2.5rem",
          fontSize: "0.8125rem",
          color: "#9ca3af",
          animation: "fade-in 0.4s 0.35s ease both",
        }}
      >
        Lỗi vẫn tiếp diễn? Liên hệ{" "}
        <a
          href="tel:0909123456"
          style={{
            color: "#16a34a",
            fontWeight: "600",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          0909 123 456
        </a>{" "}
        để được hỗ trợ.
      </p>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulse-ring {
          0%, 100% { transform: scale(1);    opacity: 0.6; }
          50%       { transform: scale(1.06); opacity: 0.2; }
        }
      `}</style>
    </main>
  );
}
