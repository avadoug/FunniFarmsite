import type { Order } from "./types";

type SupabaseOrderRow = {
  id: string;
  order_number: string;
  status: Order["status"];
  customer: Order["customer"];
  items: Order["items"];
  subtotal: number;
  estimated_shipping: number;
  estimated_tax: number;
  total: number;
  compliance: Order["compliance"];
  payment_provider: Order["paymentProvider"];
  payment_session_id: string;
  payment_session_url: string;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type OrderUpdate = Partial<
  Pick<
    Order,
    | "status"
    | "paymentSessionId"
    | "paymentSessionUrl"
    | "notes"
    | "updatedAt"
  >
>;

type SupabaseConfig = {
  key: string;
  table: string;
  url: string;
};

export function isSupabaseOrderStorageConfigured() {
  return getSupabaseConfig() !== null;
}

export async function createSupabaseOrder(order: Order) {
  const rows = await requestSupabaseRows("POST", "", toSupabaseRow(order));
  return fromSupabaseRow(rows[0] ?? toSupabaseRow(order));
}

export async function getSupabaseOrderByNumber(orderNumber: string) {
  const rows = await requestSupabaseRows(
    "GET",
    `?order_number=eq.${encodeURIComponent(orderNumber)}&select=*&limit=1`,
  );

  return rows[0] ? fromSupabaseRow(rows[0]) : null;
}

export async function listSupabaseOrders(limit = 100) {
  const safeLimit = Math.min(Math.max(limit, 1), 200);
  const rows = await requestSupabaseRows(
    "GET",
    `?select=*&order=created_at.desc&limit=${safeLimit}`,
  );

  return rows.map(fromSupabaseRow);
}

export async function updateSupabaseOrder(id: string, patch: OrderUpdate) {
  const rows = await requestSupabaseRows(
    "PATCH",
    `?id=eq.${encodeURIComponent(id)}`,
    toSupabasePatch(patch),
  );

  return rows[0] ? fromSupabaseRow(rows[0]) : null;
}

function getSupabaseConfig(): SupabaseConfig | null {
  const url =
    process.env.SUPABASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key =
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !key) return null;

  return {
    key,
    table: process.env.SUPABASE_ORDERS_TABLE?.trim() || "orders",
    url: url.replace(/\/+$/, ""),
  };
}

function requireSupabaseConfig() {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error(
      "Supabase order storage is not configured. Add SUPABASE_URL and SUPABASE_SECRET_KEY.",
    );
  }

  return config;
}

async function requestSupabaseRows(
  method: "GET" | "PATCH" | "POST",
  query: string,
  body?: Partial<SupabaseOrderRow> | SupabaseOrderRow,
) {
  const config = requireSupabaseConfig();
  const response = await fetch(
    `${config.url}/rest/v1/${encodeURIComponent(config.table)}${query}`,
    {
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        Authorization: `Bearer ${config.key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
        apikey: config.key,
      },
      method,
    },
  );

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const detail =
      typeof payload === "object" && payload && "message" in payload
        ? String(payload.message)
        : response.statusText;

    throw new Error(
      `Supabase order storage request failed (${response.status}). ${detail}`,
    );
  }

  if (Array.isArray(payload)) return payload as SupabaseOrderRow[];
  if (payload) return [payload as SupabaseOrderRow];
  return [];
}

function toSupabaseRow(order: Order): SupabaseOrderRow {
  return {
    id: order.id,
    order_number: order.orderNumber,
    status: order.status,
    customer: order.customer,
    items: order.items,
    subtotal: order.subtotal,
    estimated_shipping: order.estimatedShipping,
    estimated_tax: order.estimatedTax,
    total: order.total,
    compliance: order.compliance,
    payment_provider: order.paymentProvider,
    payment_session_id: order.paymentSessionId,
    payment_session_url: order.paymentSessionUrl,
    notes: order.notes,
    created_at: order.createdAt,
    updated_at: order.updatedAt,
  };
}

function toSupabasePatch(patch: OrderUpdate): Partial<SupabaseOrderRow> {
  return {
    ...(patch.status ? { status: patch.status } : {}),
    ...(patch.paymentSessionId
      ? { payment_session_id: patch.paymentSessionId }
      : {}),
    ...(patch.paymentSessionUrl
      ? { payment_session_url: patch.paymentSessionUrl }
      : {}),
    ...(patch.notes !== undefined ? { notes: patch.notes } : {}),
    ...(patch.updatedAt ? { updated_at: patch.updatedAt } : {}),
  };
}

function fromSupabaseRow(row: SupabaseOrderRow): Order {
  return {
    id: row.id,
    orderNumber: row.order_number,
    status: row.status,
    customer: row.customer,
    items: row.items,
    subtotal: Number(row.subtotal),
    estimatedShipping: Number(row.estimated_shipping),
    estimatedTax: Number(row.estimated_tax),
    total: Number(row.total),
    compliance: row.compliance,
    paymentProvider: row.payment_provider,
    paymentSessionId: row.payment_session_id,
    paymentSessionUrl: row.payment_session_url,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
