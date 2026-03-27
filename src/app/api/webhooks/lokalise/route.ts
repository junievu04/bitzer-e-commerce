/**
 * Nhận webhook từ Lokalise khi translation được cập nhật,
 * gọi GitHub API để trigger workflow Pull from Lokalise.
 *
 * Cần env: GITHUB_REPOSITORY, GITHUB_WEBHOOK_PAT, LOKALISE_WEBHOOK_SECRET
 */
import { NextRequest, NextResponse } from "next/server";

const GITHUB_DISPATCH_URL = (repo: string) =>
  `https://api.github.com/repos/${repo}/dispatches`;

function isLokalisePing(body: unknown): boolean {
  return Array.isArray(body) && body[0] === "ping";
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      body = undefined;
    }

    // Lokalise gửi POST body ["ping"] khi validate URL lúc tạo webhook —
    // không yêu cầu so khớp X-Secret; bắt buộc trả 2xx.
    if (isLokalisePing(body)) {
      return NextResponse.json({ ok: true, ping: true });
    }

    const secret = request.headers.get("x-secret");
    const event = request.headers.get("x-event");
    const expectedSecret = process.env.LOKALISE_WEBHOOK_SECRET;
    const repo = process.env.GITHUB_REPOSITORY;
    const pat = process.env.GITHUB_WEBHOOK_PAT;

    if (!expectedSecret || !repo || !pat) {
      console.error("Missing env: LOKALISE_WEBHOOK_SECRET, GITHUB_REPOSITORY, GITHUB_WEBHOOK_PAT");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 },
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
    }

    // Ping khi setup webhook hoặc event khác → trả 200 ngay
    const triggersPull =
      event === "project.translation.updated" ||
      event === "project.translations.updated";

    if (!triggersPull) {
      return NextResponse.json({ ok: true, skipped: event ?? "unknown" });
    }

    const res = await fetch(GITHUB_DISPATCH_URL(repo), {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_type: "lokalise-translation-updated",
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GitHub dispatch failed:", res.status, text);
      return NextResponse.json(
        { error: "GitHub dispatch failed", details: text },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, triggered: true });
  } catch (err) {
    console.error("Lokalise webhook error:", err);
    return NextResponse.json(
      { error: "Internal error" },
      { status: 500 },
    );
  }
}
