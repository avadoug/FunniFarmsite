import path from "path";
import type { Order } from "./types";
import {
  createSupabaseOrder,
  getSupabaseOrderByNumber,
  isSupabaseOrderStorageConfigured,
  type OrderUpdate,
  updateSupabaseOrder,
} from "./supabase";
import { assertDevelopmentWrite } from "@/lib/runtime/production";
import { readJsonArrayFile, writeJsonFile } from "@/lib/utils/json-file";

const DATA_PATH = path.join(process.cwd(), "data", "orders.local.json");

async function readOrderFile() {
  return readJsonArrayFile<Order>(DATA_PATH);
}

async function writeOrderFile(orders: Order[]) {
  await writeJsonFile(DATA_PATH, orders);
}

export async function createOrder(
  order: Omit<Order, "id" | "orderNumber" | "createdAt" | "updatedAt">,
) {
  if (isSupabaseOrderStorageConfigured()) {
    const now = new Date().toISOString();
    const nextOrder: Order = {
      ...order,
      id: `ord_${crypto.randomUUID()}`,
      orderNumber: createRandomOrderNumber(),
      createdAt: now,
      updatedAt: now,
    };

    return createSupabaseOrder(nextOrder);
  }

  assertDevelopmentWrite();

  const orders = await readOrderFile();
  const now = new Date().toISOString();
  const orderNumber = `FF-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")}-${String(orders.length + 1).padStart(4, "0")}`;

  const nextOrder: Order = {
    ...order,
    id: `ord_${crypto.randomUUID()}`,
    orderNumber,
    createdAt: now,
    updatedAt: now,
  };

  orders.push(nextOrder);
  await writeOrderFile(orders);
  return nextOrder;
}

export async function getOrderByNumber(orderNumber: string) {
  if (isSupabaseOrderStorageConfigured()) {
    return getSupabaseOrderByNumber(orderNumber);
  }

  const orders = await readOrderFile();
  return orders.find((order) => order.orderNumber === orderNumber) ?? null;
}

export async function updateOrder(id: string, patch: OrderUpdate) {
  const updatedAt = new Date().toISOString();

  if (isSupabaseOrderStorageConfigured()) {
    return updateSupabaseOrder(id, { ...patch, updatedAt });
  }

  assertDevelopmentWrite();

  const orders = await readOrderFile();
  const index = orders.findIndex((order) => order.id === id);

  if (index === -1) return null;

  const nextOrder = {
    ...orders[index],
    ...patch,
    updatedAt,
  };

  orders[index] = nextOrder;
  await writeOrderFile(orders);
  return nextOrder;
}

export function isOrderStorageConfigured() {
  return isSupabaseOrderStorageConfigured();
}

function createRandomOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();

  return `FF-${date}-${suffix}`;
}
