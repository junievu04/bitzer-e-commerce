import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 — Trang không tồn tại",
  description: "Trang bạn tìm kiếm không tồn tại hoặc đã bị xoá.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #dbeafe 0%, #f9fafb 50%, #bfdbfe 100%)",
        padding: "2rem",
        fontFamily: "var(--font-heading, 'Be Vietnam Pro', sans-serif)",
        textAlign: "center",
      }}
    >
      {/* Decorative ring */}
      <div
        style={{
          position: "relative",
          marginBottom: "2.5rem",
        }}
      >
        <div
          style={{
            width: "180px",
            height: "180px",
            borderRadius: "50%",
            border: "2px solid #93c5fd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            boxShadow: "0 20px 60px rgba(37,130,235,0.15)",
            position: "relative",
          }}
        >
          {/* Outer orbit ring */}
          <div
            style={{
              position: "absolute",
              inset: "-16px",
              borderRadius: "50%",
              border: "1px dashed #60a5fa",
              animation: "spin 12s linear infinite",
            }}
          />

          <span
            style={{
              fontSize: "72px",
              lineHeight: "1",
              userSelect: "none",
            }}
          >
            🔩
          </span>
        </div>
      </div>

      {/* Error code */}
      <div
        style={{
          fontSize: "clamp(5rem, 15vw, 9rem)",
          fontWeight: "900",
          lineHeight: "1",
          letterSpacing: "-0.04em",
          background:
            "linear-gradient(135deg, #1e40af 0%, #2563eb 50%, #3b82f6 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          marginBottom: "0.5rem",
          animation: "fade-in 0.5s ease forwards",
        }}
      >
        404
      </div>

      {/* Heading */}
      <h1
        style={{
          fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
          fontWeight: "800",
          color: "#111827",
          marginBottom: "0.75rem",
          animation: "fade-in 0.5s 0.1s ease both",
        }}
      >
        Trang không tồn tại
      </h1>

      {/* Sub-text */}
      <p
        style={{
          fontSize: "1rem",
          color: "#6b7280",
          maxWidth: "380px",
          lineHeight: "1.7",
          marginBottom: "2.5rem",
          animation: "fade-in 0.5s 0.2s ease both",
        }}
      >
        Trang bạn đang tìm có thể đã bị xoá, đổi địa chỉ, hoặc chưa từng tồn
        tại.
      </p>

      {/* Actions */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fade-in 0.5s 0.3s ease both",
        }}
      >
        <Link
          href="/"
          className="nf-btn nf-btn--primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "#1d4ed8",
            color: "white",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.625rem",
            fontWeight: "700",
            fontSize: "0.9375rem",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 14px rgba(37,130,235,0.35)",
            textDecoration: "none",
          }}
        >
          🏠 Về trang chủ
        </Link>

        <Link
          href="/products"
          className="nf-btn nf-btn--secondary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "white",
            color: "#1d4ed8",
            border: "1.5px solid #2563eb",
            padding: "0.75rem 1.5rem",
            borderRadius: "0.625rem",
            fontWeight: "700",
            fontSize: "0.9375rem",
            transition: "all 0.2s ease",
            textDecoration: "none",
          }}
        >
          🔧 Xem sản phẩm
        </Link>
      </div>

      {/* Breadcrumb hint */}
      <p
        style={{
          marginTop: "3rem",
          fontSize: "0.8125rem",
          color: "#9ca3af",
          animation: "fade-in 0.5s 0.4s ease both",
        }}
      >
        Nếu bạn cho rằng đây là lỗi, hãy liên hệ{" "}
        <Link
          href="/contact"
          style={{
            color: "#1d4ed8",
            fontWeight: "600",
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          bộ phận hỗ trợ
        </Link>
      </p>

      {/* Inline keyframes for the spin + fade (globals.css handles these
          normally, but we inline them here so the page works standalone) */}
      <style>{`
        .nf-btn { will-change: transform; }
        .nf-btn--primary:hover {
          background: #1e40af !important;
          transform: translateY(-1px);
        }
        .nf-btn--secondary:hover {
          background: #dbeafe !important;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </main>
  );
}
