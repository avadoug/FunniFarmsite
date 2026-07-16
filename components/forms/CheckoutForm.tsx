"use client";

import Link from "next/link";
import { useState } from "react";
import { AlertTriangle, MailCheck, ShieldCheck } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { ManualOrderFlowBox } from "@/components/checkout/ManualOrderFlowBox";
import { TrustBar } from "@/components/brand/TrustBar";
import { checkoutFieldLimits } from "@/lib/forms/limits";
import { formatMoney } from "@/lib/utils/format";

const initialCustomer = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "US",
};

export function CheckoutForm() {
  const { clearCart, items, subtotal } = useCart();
  const [customer, setCustomer] = useState(initialCustomer);
  const [checks, setChecks] = useState({
    ageConfirmed: false,
    nonIntoxicatingAcknowledged: false,
    diseaseDisclaimerAccepted: false,
    lawsAccepted: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-black text-forest-900">
          Your cart is empty
        </h1>
        <p className="mt-3 leading-7 text-forest-900/70">
          Add a product before starting checkout.
        </p>
        <ButtonLink className="mt-6" href="/shop" size="lg">
          Shop Products
        </ButtonLink>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/checkout", {
      body: JSON.stringify({
        customer,
        compliance: checks,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const payload = (await response.json()) as {
      checkoutUrl?: string;
      error?: string;
    };

    if (!response.ok || !payload.checkoutUrl) {
      setError(payload.error ?? "Checkout could not be started.");
      setLoading(false);
      return;
    }

    clearCart();
    window.location.href = payload.checkoutUrl;
  }

  return (
    <form
      className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8"
      onSubmit={handleSubmit}
    >
      <div className="space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-clay">
            Manual payment request
          </p>
          <h1 className="mt-2 font-display text-4xl font-black text-forest-900 md:text-5xl">
            Checkout
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-forest-900/70">
            Enter customer and shipping details, confirm the hemp compliance
            notices, then send an order request to The Funni Farm. They will
            review the order and email back with Cash App, PayPal, or other
            approved non-card payment options. This checkout is for
            non-intoxicating CBG/hemp wellness products only. You pay only
            after the farm reviews the request.
          </p>
        </div>

        <TrustBar compact />

        <ManualOrderFlowBox />

        <section className="seed-card rounded-seed p-5 md:p-6">
          <h2 className="font-display text-3xl font-black text-forest-900">
            Customer Information
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              label="First name"
              maxLength={checkoutFieldLimits.firstName}
              name="firstName"
              onChange={setCustomer}
              required
              value={customer.firstName}
            />
            <Field
              label="Last name"
              maxLength={checkoutFieldLimits.lastName}
              name="lastName"
              onChange={setCustomer}
              required
              value={customer.lastName}
            />
            <Field
              label="Email"
              maxLength={checkoutFieldLimits.email}
              name="email"
              onChange={setCustomer}
              required
              type="email"
              value={customer.email}
            />
            <Field
              label="Phone"
              maxLength={checkoutFieldLimits.phone}
              name="phone"
              onChange={setCustomer}
              value={customer.phone}
            />
          </div>
        </section>

        <section className="seed-card rounded-seed p-5 md:p-6">
          <h2 className="font-display text-3xl font-black text-forest-900">
            Shipping Address
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field
              className="sm:col-span-2"
              label="Address"
              maxLength={checkoutFieldLimits.address1}
              name="address1"
              onChange={setCustomer}
              required
              value={customer.address1}
            />
            <Field
              className="sm:col-span-2"
              label="Apartment, suite, etc."
              maxLength={checkoutFieldLimits.address2}
              name="address2"
              onChange={setCustomer}
              value={customer.address2}
            />
            <Field
              label="City"
              maxLength={checkoutFieldLimits.city}
              name="city"
              onChange={setCustomer}
              required
              value={customer.city}
            />
            <Field
              label="State"
              maxLength={checkoutFieldLimits.state}
              name="state"
              onChange={setCustomer}
              required
              value={customer.state}
            />
            <Field
              label="Postal code"
              maxLength={checkoutFieldLimits.postalCode}
              name="postalCode"
              onChange={setCustomer}
              required
              value={customer.postalCode}
            />
            <Field
              label="Country"
              maxLength={checkoutFieldLimits.country}
              name="country"
              onChange={setCustomer}
              required
              value={customer.country}
            />
          </div>
        </section>

        <section className="rounded-seed border border-forest-900/12 bg-forest-900 p-5 text-cream-50 shadow-soft md:p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle
              aria-hidden
              className="mt-1 size-6 shrink-0 text-harvest-300"
            />
            <div>
              <h2 className="font-display text-3xl font-black">
                Compliance Confirmations
              </h2>
              <p className="mt-2 text-sm leading-6 text-cream-100/72">
                Confirm these before sending an order request. The farm reviews
                age, product details, and shipping eligibility before payment.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <Check
              checked={checks.ageConfirmed}
              label="I confirm I am of legal age to purchase hemp products."
              onChange={(value) =>
                setChecks((current) => ({ ...current, ageConfirmed: value }))
              }
            />
            <Check
              checked={checks.nonIntoxicatingAcknowledged}
              label="I understand these products are non-intoxicating hemp/CBG products."
              onChange={(value) =>
                setChecks((current) => ({
                  ...current,
                  nonIntoxicatingAcknowledged: value,
                }))
              }
            />
            <Check
              checked={checks.diseaseDisclaimerAccepted}
              label="I understand these products are not intended to diagnose, treat, cure, or prevent any disease."
              onChange={(value) =>
                setChecks((current) => ({
                  ...current,
                  diseaseDisclaimerAccepted: value,
                }))
              }
            />
            <Check
              checked={checks.lawsAccepted}
              label="I agree to follow all applicable laws in my location."
              onChange={(value) =>
                setChecks((current) => ({ ...current, lawsAccepted: value }))
              }
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <Link className="font-bold underline underline-offset-4" href="/policies/terms">
              Terms
            </Link>
            <Link className="font-bold underline underline-offset-4" href="/policies/hemp-compliance">
              Hemp Compliance
            </Link>
            <Link className="font-bold underline underline-offset-4" href="/policies/age-policy">
              Age Verification
            </Link>
            <Link className="font-bold underline underline-offset-4" href="/policies/warnings-safe-use">
              Safe Use
            </Link>
            <Link className="font-bold underline underline-offset-4" href="/policies/shipping">
              Shipping
            </Link>
            <Link className="font-bold underline underline-offset-4" href="/policies/product-availability-backorder">
              Availability
            </Link>
            <Link className="font-bold underline underline-offset-4" href="/policies/contact-support">
              Support
            </Link>
          </div>
        </section>

        {error && (
          <div
            className="rounded-2xl border border-clay/30 bg-clay/10 p-4 text-sm font-bold text-clay"
            role="alert"
          >
            {error}
          </div>
        )}
      </div>

      <aside className="h-fit rounded-seed border border-forest-900/12 bg-cream-50 p-5 shadow-farm lg:sticky lg:top-24">
        <div className="flex items-start gap-3">
          <div className="flex size-11 items-center justify-center rounded-full bg-forest-700 text-cream-50">
            <MailCheck aria-hidden className="size-5" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-black text-forest-900">
              Order Summary
            </h2>
            <p className="mt-1 text-sm leading-6 text-forest-900/62">
              Funni Farm reviews adult hemp wellness orders before payment.
            </p>
          </div>
        </div>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div
              className="flex items-start justify-between gap-4 border-b border-forest-900/10 pb-4"
              key={item.product.id}
            >
              <div>
                <p className="font-black text-forest-900">{item.product.name}</p>
                <p className="text-sm text-forest-900/60">
                  Qty {item.quantity} × {formatMoney(item.product.price)}
                </p>
              </div>
              <p className="font-black text-forest-900">
                {formatMoney(item.product.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5 space-y-3 text-sm">
          <Summary label="Subtotal" value={formatMoney(subtotal)} />
          <Summary label="Shipping" value="Reviewed by farm" />
          <Summary label="Taxes" value="Reviewed by farm" />
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-forest-900/10 pt-5 text-xl font-black text-forest-900">
          <span>Request subtotal</span>
          <span>{formatMoney(subtotal)}</span>
        </div>
        <div className="mt-5 rounded-2xl border border-forest-900/10 bg-forest-700/8 p-4 text-sm leading-6 text-forest-900/68">
          <ShieldCheck aria-hidden className="mb-2 size-5 text-forest-700" />
          We never ask for raw card numbers by email, and this site does not
          store card details. Payment options are emailed only after order
          review.
        </div>
        <Button className="mt-5 w-full" disabled={loading} size="lg" type="submit">
          {loading ? "Sending Order Request..." : "Send Order Request"}
        </Button>
      </aside>
    </form>
  );
}

function Field({
  className,
  label,
  maxLength,
  name,
  onChange,
  required,
  type = "text",
  value,
}: {
  className?: string;
  label: string;
  maxLength?: number;
  name: keyof typeof initialCustomer;
  onChange: React.Dispatch<React.SetStateAction<typeof initialCustomer>>;
  required?: boolean;
  type?: string;
  value: string;
}) {
  return (
    <label className={className}>
      <span className="text-sm font-black text-forest-900">{label}</span>
      <input
        className="focus-ring mt-2 min-h-12 w-full rounded-2xl border border-forest-900/15 bg-white/70 px-4 text-sm font-semibold text-forest-900 placeholder:text-forest-900/40"
        name={name}
        maxLength={maxLength}
        onChange={(event) =>
          onChange((current) => ({
            ...current,
            [name]: event.target.value,
          }))
        }
        required={required}
        type={type}
        value={value}
      />
    </label>
  );
}

function Check({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="dark-readable-card flex cursor-pointer gap-3 rounded-2xl p-4 text-sm font-bold leading-6 text-cream-100/90">
      <input
        checked={checked}
        className="mt-1 size-4 accent-harvest-300"
        onChange={(event) => onChange(event.target.checked)}
        required
        type="checkbox"
      />
      <span>{label}</span>
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-forest-900/70">
      <span>{label}</span>
      <span className="font-black text-forest-900">{value}</span>
    </div>
  );
}
