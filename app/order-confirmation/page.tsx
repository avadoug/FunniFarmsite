import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ManualOrderFlowBox } from "@/components/checkout/ManualOrderFlowBox";
import { TrustBar } from "@/components/brand/TrustBar";
import { ButtonLink } from "@/components/ui/Button";
import { getOrderByNumber } from "@/lib/orders/repository";
import { formatMoney } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Order Confirmation",
  description:
    "Order request confirmation for The Funni Farm manual payment flow.",
};

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; order?: string }>;
}) {
  const params = await searchParams;
  const order = params.order ? await getOrderByNumber(params.order) : null;
  const orderNumber = order?.orderNumber ?? params.order;
  const customerEmail = order?.customer.email;
  const isEmailRequest = params.mode?.startsWith("email") ?? false;

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="seed-card rounded-[2rem] p-6 text-center md:p-10">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-forest-700 text-cream-50">
          <CheckCircle2 aria-hidden className="size-8" />
        </div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.22em] text-clay">
          {isEmailRequest ? "Order request sent" : "Order confirmation"}
        </p>
        <h1 className="mt-3 font-display text-4xl font-black text-forest-900 md:text-5xl">
          Thank you for supporting The Funni Farm.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-forest-900/70">
          Your order request is ready for review. The Funni Farm will confirm
          availability, shipping, and compliance details, then email back with
          Cash App, PayPal, or other approved non-card payment options. You pay
          only after review, and orders ship after confirmation.
        </p>

        <div className="mt-8 text-left">
          <TrustBar compact />
        </div>

        {order ? (
          <div className="mt-8 rounded-seed border border-forest-900/10 bg-white/45 p-5 text-left">
            <div className="flex flex-col gap-2 border-b border-forest-900/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-clay">
                  Order number
                </p>
                <p className="font-display text-2xl font-black text-forest-900">
                  {order.orderNumber}
                </p>
              </div>
              <div className="text-sm text-forest-900/70 sm:text-right">
                <p>Customer email</p>
                <p className="font-black text-forest-900">
                  {order.customer.email}
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-4">
              {order.items.map((item) => (
                <div
                  className="flex items-start justify-between gap-4"
                  key={item.productId}
                >
                  <div>
                    <p className="font-black text-forest-900">{item.name}</p>
                    <p className="text-sm text-forest-900/60">
                      Qty {item.quantity} × {formatMoney(item.unitPrice)}
                    </p>
                  </div>
                  <p className="font-black text-forest-900">
                    {formatMoney(item.lineTotal)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-forest-900/10 pt-5">
              <Summary label="Subtotal" value={formatMoney(order.subtotal)} />
              <Summary label="Shipping" value="Reviewed by farm" />
              <Summary label="Tax" value="Reviewed by farm" />
              <div className="mt-4 flex items-center justify-between text-xl font-black text-forest-900">
                <span>Total</span>
                <span>{formatMoney(order.total)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-seed border border-dashed border-forest-900/25 bg-white/45 p-6">
            {orderNumber ? (
              <div className="text-left">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-clay">
                  Order number
                </p>
                <p className="font-display text-2xl font-black text-forest-900">
                  {orderNumber}
                </p>
                {customerEmail && (
                  <p className="mt-3 text-sm leading-6 text-forest-900/70">
                    A reply should be sent to{" "}
                    <span className="font-black text-forest-900">
                      {customerEmail}
                    </span>
                    .
                  </p>
                )}
                <p className="mt-3 text-sm leading-6 text-forest-900/70">
                  The order summary was sent to The Funni Farm by email. Connect
                  a production database later if you want stored order history on
                  this page.
                </p>
              </div>
            ) : (
              <p className="font-bold text-forest-900">
                No order request number was found in the URL. Complete checkout
                from the cart to generate an order request.
              </p>
            )}
          </div>
        )}

        <ManualOrderFlowBox className="mt-8 text-left" />

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/shop" size="lg">
            Back to Shop
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="ghost">
            Contact Support
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-2 flex items-center justify-between text-sm text-forest-900/68">
      <span>{label}</span>
      <span className="font-black text-forest-900">{value}</span>
    </div>
  );
}
