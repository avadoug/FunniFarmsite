"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  DollarSign,
  RefreshCw,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Order } from "@/lib/orders/types";
import { formatMoney } from "@/lib/utils/format";

type AdminOrdersPanelProps = {
  password: string;
};

const statusLabels: Record<Order["status"], string> = {
  cancelled: "Cancelled",
  manual_paid: "Paid",
  manual_unpaid: "Unpaid",
  mock_paid: "Mock paid",
  mock_pending_payment: "Mock pending",
  order_request_pending_email: "Pending review",
  order_request_sent: "Sent / unpaid",
};

export function AdminOrdersPanel({ password }: AdminOrdersPanelProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const counts = useMemo(
    () => ({
      paid: orders.filter((order) => order.status === "manual_paid").length,
      unpaid: orders.filter((order) => order.status !== "manual_paid").length,
    }),
    [orders],
  );

  async function loadOrders() {
    setLoading(true);
    setError("");
    setMessage("");

    const response = await fetch("/api/admin/orders", {
      headers: { "x-admin-password": password },
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(payload?.error ?? "Could not load orders.");
      return;
    }

    setOrders((await response.json()) as Order[]);
    setMessage("Orders loaded.");
  }

  async function updateStatus(order: Order, status: Order["status"]) {
    setSavingId(order.id);
    setError("");
    setMessage("");

    const statusNote =
      status === "manual_paid"
        ? `Marked paid manually on ${new Date().toLocaleString()}.`
        : status === "manual_unpaid"
          ? `Marked unpaid manually on ${new Date().toLocaleString()}.`
          : order.notes;

    const response = await fetch("/api/admin/orders", {
      body: JSON.stringify({
        id: order.id,
        notes: statusNote,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      method: "PATCH",
    });

    setSavingId("");

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(payload?.error ?? "Could not update order.");
      return;
    }

    const updated = (await response.json()) as Order;
    setOrders((current) =>
      current.map((orderItem) =>
        orderItem.id === updated.id ? updated : orderItem,
      ),
    );
    setMessage(`${updated.orderNumber} updated to ${statusLabels[updated.status]}.`);
  }

  useEffect(() => {
    void loadOrders();
    // Password only changes when the admin session changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  return (
    <section className="rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-farm md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Supabase order desk
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-forest-900 md:text-4xl">
            Orders
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-forest-900/70">
            Review incoming order requests saved by checkout. Use the manual
            paid/unpaid buttons after you confirm payment outside the site.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-forest-900/10 bg-white/70 px-3 py-2 text-xs font-black text-forest-900">
            Paid {counts.paid}
          </span>
          <span className="rounded-full border border-forest-900/10 bg-white/70 px-3 py-2 text-xs font-black text-forest-900">
            Unpaid {counts.unpaid}
          </span>
          <Button disabled={loading} onClick={() => void loadOrders()} variant="ghost">
            <RefreshCw aria-hidden className="size-4" />
            {loading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </div>

      {(message || error) && (
        <div className="mt-5 rounded-2xl border border-forest-900/10 bg-white/70 p-4 text-sm font-bold text-forest-900">
          {message || error}
        </div>
      )}

      <div className="mt-6 space-y-4">
        {orders.length === 0 && !loading ? (
          <div className="rounded-2xl border border-dashed border-forest-900/20 bg-white/60 p-6 text-sm font-bold text-forest-900/72">
            No orders found yet. Submit a checkout test, then refresh this panel.
          </div>
        ) : (
          orders.map((order) => (
            <article
              className="rounded-seed border border-forest-900/10 bg-white/75 p-4 shadow-soft"
              key={order.id}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge status={order.status} />
                    <p className="font-display text-2xl font-black text-forest-900">
                      {order.orderNumber}
                    </p>
                  </div>
                  <p className="mt-1 text-sm font-bold text-forest-900/70">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className="mt-3 font-black text-forest-900">
                    {order.customer.firstName} {order.customer.lastName}
                  </p>
                  <div className="mt-1 grid gap-1 text-sm font-semibold leading-6 text-forest-900/72">
                    <a className="hover:text-clay" href={`mailto:${order.customer.email}`}>
                      {order.customer.email}
                    </a>
                    {order.customer.phone && (
                      <a className="hover:text-clay" href={`tel:${order.customer.phone}`}>
                        {order.customer.phone}
                      </a>
                    )}
                    <p>
                      {order.customer.address1}
                      {order.customer.address2
                        ? `, ${order.customer.address2}`
                        : ""}
                      <br />
                      {order.customer.city}, {order.customer.state}{" "}
                      {order.customer.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    disabled={savingId === order.id}
                    onClick={() => void updateStatus(order, "manual_paid")}
                    size="sm"
                    variant="primary"
                  >
                    <CheckCircle2 aria-hidden className="size-4" />
                    Mark paid
                  </Button>
                  <Button
                    disabled={savingId === order.id}
                    onClick={() => void updateStatus(order, "manual_unpaid")}
                    size="sm"
                    variant="ghost"
                  >
                    <Clock3 aria-hidden className="size-4" />
                    Mark unpaid
                  </Button>
                  <Button
                    disabled={savingId === order.id}
                    onClick={() => void updateStatus(order, "cancelled")}
                    size="sm"
                    variant="danger"
                  >
                    <XCircle aria-hidden className="size-4" />
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]">
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      className="flex items-start justify-between gap-4 rounded-2xl border border-forest-900/10 bg-cream-50/80 p-3"
                      key={`${order.id}-${item.productId}`}
                    >
                      <div>
                        <p className="font-black text-forest-900">{item.name}</p>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] text-clay">
                          {item.category}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-forest-900/68">
                          Qty {item.quantity} x {formatMoney(item.unitPrice)}
                        </p>
                      </div>
                      <p className="font-black text-forest-900">
                        {formatMoney(item.lineTotal)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="min-w-[13rem] rounded-2xl border border-forest-900/10 bg-forest-900 p-4 text-cream-50">
                  <DollarSign aria-hidden className="size-5 text-harvest-300" />
                  <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-harvest-300">
                    Request subtotal
                  </p>
                  <p className="font-display text-3xl font-black">
                    {formatMoney(order.subtotal)}
                  </p>
                  <p className="mt-2 text-xs font-bold leading-5 text-cream-100/78">
                    Shipping and tax are reviewed before payment is confirmed.
                  </p>
                </div>
              </div>

              {order.notes && (
                <p className="mt-4 rounded-2xl border border-forest-900/10 bg-cream-50/80 p-3 text-sm font-semibold leading-6 text-forest-900/72">
                  {order.notes}
                </p>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: Order["status"] }) {
  const paid = status === "manual_paid" || status === "mock_paid";
  const cancelled = status === "cancelled";

  return (
    <span
      className={[
        "inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.12em]",
        paid
          ? "border-forest-700/20 bg-forest-700 text-cream-50"
          : cancelled
            ? "border-clay/20 bg-clay text-cream-50"
            : "border-harvest-700/20 bg-harvest-300 text-forest-900",
      ].join(" ")}
    >
      {statusLabels[status]}
    </span>
  );
}
