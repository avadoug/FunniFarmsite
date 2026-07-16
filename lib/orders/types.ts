export type OrderCustomer = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  category: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderCompliance = {
  ageConfirmed: boolean;
  nonIntoxicatingAcknowledged: boolean;
  diseaseDisclaimerAccepted: boolean;
  lawsAccepted: boolean;
};

export type Order = {
  id: string;
  orderNumber: string;
  status:
    | "order_request_pending_email"
    | "order_request_sent"
    | "mock_pending_payment"
    | "mock_paid"
    | "cancelled";
  customer: OrderCustomer;
  items: OrderItem[];
  subtotal: number;
  estimatedShipping: number;
  estimatedTax: number;
  total: number;
  compliance: OrderCompliance;
  paymentProvider:
    | "manual-email"
    | "cashapp"
    | "paypal"
    | "mock"
    | "square-cbd"
    | "bankful"
    | "paymentcloud"
    | "custom";
  paymentSessionId: string;
  paymentSessionUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};
