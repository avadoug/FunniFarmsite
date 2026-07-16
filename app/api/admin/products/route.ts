import { timingSafeEqual } from "crypto";
import { NextResponse, type NextRequest } from "next/server";
import type { ProductInput } from "@/lib/products/types";
import {
  deleteProduct,
  getProducts,
  upsertProduct,
} from "@/lib/products/repository";
import {
  isProductionRuntime,
  PRODUCTION_DATABASE_MESSAGE,
} from "@/lib/runtime/production";
import {
  sanitizeLocalPath,
  sanitizeStringArray,
  sanitizeText,
} from "@/lib/utils/sanitize";
import {
  checkRateLimit,
  isSameOriginRequest,
  rateLimitHeaders,
} from "@/lib/security/rate-limit";

export const runtime = "nodejs";

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
    keyPrefix: "admin-products",
    limit: 30,
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

  return NextResponse.json(await getProducts({ includeInactive: true }), {
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  const blocked = guardAdminRequest(request);

  if (blocked) return blocked;

  if (isProductionRuntime()) {
    return NextResponse.json(
      { error: PRODUCTION_DATABASE_MESSAGE },
      { status: 501 },
    );
  }

  const body = (await request.json().catch(() => null)) as ProductInput | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid product payload." }, { status: 400 });
  }

  const product = await upsertProduct({
    ...body,
    slug: sanitizeText(body.slug, 120),
    name: sanitizeText(body.name, 160),
    shortDescription: sanitizeText(body.shortDescription, 280),
    fullDescription: sanitizeText(body.fullDescription, 4000),
    image: sanitizeLocalPath(body.image, 400),
    gallery: sanitizeStringArray(body.gallery, 12).map((item) =>
      sanitizeLocalPath(item, 400),
    ),
    tags: sanitizeStringArray(body.tags, 16),
    weight: sanitizeText(body.weight, 120),
    ingredients: sanitizeText(body.ingredients, 3000),
    cannabinoidInfo: sanitizeText(body.cannabinoidInfo, 3000),
    strainLineage: sanitizeText(body.strainLineage, 600),
    seedType: sanitizeText(body.seedType, 160),
    packSize: sanitizeText(body.packSize, 160),
    batchNumber: sanitizeText(body.batchNumber, 160),
    coaUrl: sanitizeText(body.coaUrl, 400),
    hempComplianceNote: sanitizeText(body.hempComplianceNote, 1000),
    shippingRestrictions: sanitizeText(body.shippingRestrictions, 1200),
  });

  return NextResponse.json(product);
}

export async function DELETE(request: NextRequest) {
  const blocked = guardAdminRequest(request);

  if (blocked) return blocked;

  if (isProductionRuntime()) {
    return NextResponse.json(
      { error: PRODUCTION_DATABASE_MESSAGE },
      { status: 501 },
    );
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing product id" }, { status: 400 });
  }

  const deleted = await deleteProduct(id);
  return NextResponse.json({ deleted });
}
