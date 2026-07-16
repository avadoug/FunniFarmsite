import type {
  OrderCompliance,
  OrderCustomer,
  OrderItem,
} from "@/lib/orders/types";
import { createOrder } from "@/lib/orders/repository";

export type CheckoutProviderId =
  | "mock"
  | "square-cbd"
  | "bankful"
  | "paymentcloud"
  | "custom";

export type CreateCheckoutInput = {
  customer: OrderCustomer;
  items: OrderItem[];
  compliance: OrderCompliance;
  subtotal: number;
  origin: string;
};

export type CheckoutSession = {
  provider: CheckoutProviderId;
  sessionId: string;
  checkoutUrl: string;
  orderNumber: string;
};

export type CheckoutProvider = {
  id: CheckoutProviderId;
  createCheckoutSession(input: CreateCheckoutInput): Promise<CheckoutSession>;
};

export const mockCheckoutProvider: CheckoutProvider = {
  id: "mock",
  async createCheckoutSession(input) {
    const sessionId = `mock_${crypto.randomUUID()}`;
    const checkoutUrl = `${input.origin}/order-confirmation`;
    const order = await createOrder({
      status: "mock_paid",
      customer: input.customer,
      items: input.items,
      subtotal: input.subtotal,
      estimatedShipping: 0,
      estimatedTax: 0,
      total: input.subtotal,
      compliance: input.compliance,
      paymentProvider: "mock",
      paymentSessionId: sessionId,
      paymentSessionUrl: checkoutUrl,
      notes:
        "Legacy mock checkout only. The current live path sends manual order request emails instead of collecting card payments.",
    });

    return {
      provider: "mock",
      sessionId,
      checkoutUrl: `${checkoutUrl}?order=${encodeURIComponent(order.orderNumber)}`,
      orderNumber: order.orderNumber,
    };
  },
};

export function getCheckoutProvider(): CheckoutProvider {
  const provider = process.env.PAYMENT_PROVIDER as CheckoutProviderId | undefined;

  switch (provider) {
    case "square-cbd":
    case "bankful":
    case "paymentcloud":
    case "custom":
      throw new Error(
        `${provider} checkout is not implemented yet. Configure the provider in lib/payments/provider.ts after merchant approval.`,
      );
    case "mock":
    default:
      return mockCheckoutProvider;
  }
}
