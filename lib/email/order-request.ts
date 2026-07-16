import type {
  OrderCompliance,
  OrderCustomer,
  OrderItem,
} from "@/lib/orders/types";
import { formatMoney } from "@/lib/utils/format";

export const ORDER_EMAIL_NOT_CONFIGURED_MESSAGE =
  "Order email is not configured yet. Add RESEND_API_KEY and FUNNI_FARM_ORDER_EMAIL before using this feature live.";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

type OrderRequestEmailInput = {
  orderNumber: string;
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  compliance: OrderCompliance;
  origin: string;
};

type ResendResponse = {
  id?: string;
  message?: string;
  error?: string;
  name?: string;
};

export function isOrderEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() &&
      process.env.FUNNI_FARM_ORDER_EMAIL?.trim(),
  );
}

export async function sendOrderRequestEmail(input: OrderRequestEmailInput) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const orderInbox = process.env.FUNNI_FARM_ORDER_EMAIL?.trim();

  if (!apiKey || !orderInbox) {
    throw new Error(ORDER_EMAIL_NOT_CONFIGURED_MESSAGE);
  }

  const from =
    process.env.ORDER_EMAIL_FROM?.trim() ||
    "The Funni Farm Orders <onboarding@resend.dev>";

  const response = await fetch(RESEND_ENDPOINT, {
    body: JSON.stringify({
      from,
      to: orderInbox,
      reply_to: input.customer.email,
      subject: `New Funni Farm order request ${input.orderNumber}`,
      text: buildOrderRequestText(input),
      html: buildOrderRequestHtml(input),
    }),
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | ResendResponse
      | null;
    const detail = payload?.message ?? payload?.error ?? response.statusText;

    throw new Error(
      `Order email could not be sent (${response.status}). ${detail}`,
    );
  }

  const payload = (await response.json().catch(() => null)) as
    | ResendResponse
    | null;

  return {
    id: payload?.id ?? `email_${input.orderNumber}`,
  };
}

function buildOrderRequestText(input: OrderRequestEmailInput) {
  const itemLines = input.items
    .map(
      (item) =>
        `- ${item.name} (${item.category}) x${item.quantity}: ${formatMoney(
          item.lineTotal,
        )}`,
    )
    .join("\n");

  return [
    `New order request: ${input.orderNumber}`,
    "",
    "Customer",
    `${input.customer.firstName} ${input.customer.lastName}`,
    input.customer.email,
    input.customer.phone || "No phone provided",
    formatAddress(input.customer),
    "",
    "Items",
    itemLines,
    "",
    `Subtotal: ${formatMoney(input.subtotal)}`,
    "Shipping and taxes: review before replying",
    "",
    "Compliance confirmations",
    `Age confirmed: ${yesNo(input.compliance.ageConfirmed)}`,
    `Non-intoxicating hemp acknowledged: ${yesNo(input.compliance.nonIntoxicatingAcknowledged)}`,
    `Disease disclaimer accepted: ${yesNo(input.compliance.diseaseDisclaimerAccepted)}`,
    `Applicable laws accepted: ${yesNo(input.compliance.lawsAccepted)}`,
    "",
    "Next step",
    "Review availability, shipping restrictions, age/compliance requirements, and product details. Then reply to the customer with Cash App, PayPal, or other approved non-card payment options. Do not request, collect, store, or log raw credit-card numbers by email.",
    "",
    `Storefront origin: ${input.origin}`,
  ].join("\n");
}

function buildOrderRequestHtml(input: OrderRequestEmailInput) {
  const itemRows = input.items
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.name)}<br><small>${escapeHtml(item.category)}</small></td>
          <td style="text-align:center;">${item.quantity}</td>
          <td style="text-align:right;">${formatMoney(item.unitPrice)}</td>
          <td style="text-align:right;">${formatMoney(item.lineTotal)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #1f2a17; line-height: 1.5;">
      <h1 style="margin-bottom: 0;">New Funni Farm order request</h1>
      <p style="margin-top: 4px;"><strong>${escapeHtml(input.orderNumber)}</strong></p>

      <h2>Customer</h2>
      <p>
        ${escapeHtml(input.customer.firstName)} ${escapeHtml(input.customer.lastName)}<br>
        <a href="mailto:${escapeHtml(input.customer.email)}">${escapeHtml(input.customer.email)}</a><br>
        ${escapeHtml(input.customer.phone || "No phone provided")}<br>
        ${escapeHtml(formatAddress(input.customer)).replace(/\n/g, "<br>")}
      </p>

      <h2>Items</h2>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr style="background: #f6efd9;">
            <th align="left">Product</th>
            <th>Qty</th>
            <th align="right">Each</th>
            <th align="right">Line</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <p><strong>Subtotal:</strong> ${formatMoney(input.subtotal)}</p>
      <p><strong>Shipping and taxes:</strong> review before replying.</p>

      <h2>Compliance confirmations</h2>
      <ul>
        <li>Age confirmed: ${yesNo(input.compliance.ageConfirmed)}</li>
        <li>Non-intoxicating hemp acknowledged: ${yesNo(input.compliance.nonIntoxicatingAcknowledged)}</li>
        <li>Disease disclaimer accepted: ${yesNo(input.compliance.diseaseDisclaimerAccepted)}</li>
        <li>Applicable laws accepted: ${yesNo(input.compliance.lawsAccepted)}</li>
      </ul>

      <h2>Next step</h2>
      <p>
        Review availability, shipping restrictions, age/compliance requirements, and product details.
        Then reply to the customer with Cash App, PayPal, or other approved non-card payment options.
        Do not request, collect, store, or log raw credit-card numbers by email.
      </p>

      <p style="color: #66705a;">Storefront origin: ${escapeHtml(input.origin)}</p>
    </div>
  `;
}

function formatAddress(customer: OrderCustomer) {
  return [
    customer.address1,
    customer.address2,
    `${customer.city}, ${customer.state} ${customer.postalCode}`,
    customer.country,
  ]
    .filter(Boolean)
    .join("\n");
}

function yesNo(value: boolean) {
  return value ? "yes" : "no";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    switch (character) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#039;";
      default:
        return character;
    }
  });
}
