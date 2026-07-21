import { timingSafeEqual } from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { listOrders, updateOrder } from "@/lib/orders/repository";
import type { Order } from "@/lib/orders/types";
import { isProductionRuntime } from "@/lib/runtime/production";
import {
  checkRateLimit,
  isSameOriginRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";
import { sanitizeText } from "@/lib/utils/sanitize";

export const runtime = "nodejs";

const statusSchema = z.enum([
  "order_request_pending_email",
  "order_request_sent",
  "manual_unpaid",
  "manual_paid",
  "cancelled",
]);

const updateSchema = z.object({
  id: z.string().min(1).max(120),
  notes: z.string().max(1200).optional(),
  status: statusSchema,
});

function isAuthorized(request: NextRequest) {
  const expected = process.env.ADMIN_PASSWORD?.trim() || "";
  const provided = request.headers.get("x-admin-password")?.trim() || "";

  if (!expected || !provided) return false;

  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(provided);

  if (expectedBuffer.length !== providedBuffer.length) return false;

  return timingSafeEqual(expectedBuffer, providedBuffer);
}

function isAdminEnabled() {
  return !isProductionRuntime() || process.env.ENABLE_ADMIN === "true";
}

function guardAdminRequest(request: NextRequest) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (!isAdminEnabled()) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const rateLimit = checkRateLimit(request, {
    keyPrefix: "admin-orders",
    limit: 60,
    windowMs: 5 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many admin requests. Please wait and try again." },
      { headers: rateLimitHeaders(rateLimit), status: 429 },
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { headers: { "Cache-Control": "no-store" }, status: 401 },
    );
  }

  return null;
}

export async function GET(request: NextRequest) {
  const blocked = guardAdminRequest(request);

  if (blocked) return blocked;

  return NextResponse.json(await listOrders(), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function PATCH(request: NextRequest) {
  const blocked = guardAdminRequest(request);

  if (blocked) return blocked;

  const body = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order update payload." },
      { status: 400 },
    );
  }

  const notes =
    parsed.data.notes === undefined
      ? undefined
      : sanitizeText(parsed.data.notes, 1200);
  const updated = await updateOrder(parsed.data.id, {
    notes,
    status: parsed.data.status as Order["status"],
  });

  if (!updated) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json(updated, {
    headers: { "Cache-Control": "no-store" },
  });
}
